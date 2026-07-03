<?php
/**
 * chat.php — backend proxy for the portfolio chatbot.
 *
 * Purpose: keeps your Gemini API key on the server. The browser never sees it.
 * The frontend (index.html) posts { messages: [...] } here, and this script
 * calls Google's Gemini API and returns a response shaped like:
 *   { "content": [ { "type": "text", "text": "..." } ] }
 * so the existing JS in index.html doesn't need to change.
 *
 * SETUP:
 * 1. Get a free API key: https://aistudio.google.com/apikey (no credit card needed)
 * 2. Put that key in GEMINI_API_KEY below, OR (better) set it as an environment
 *    variable on your host and leave the fallback empty.
 * 3. Upload this file to the same folder as index.html on your web host.
 * 4. Update $ALLOWED_ORIGIN below to your actual domain once you know it.
 */

// ---- CONFIG ----------------------------------------------------------
// Prefer an environment variable if your host supports it (cPanel, etc.).
// Otherwise paste your key directly as the fallback string.
$GEMINI_API_KEY = getenv('GEMINI_API_KEY') ?: 'PASTE_YOUR_GEMINI_API_KEY_HERE';

// Restrict which sites are allowed to call this endpoint. Set to your real
// domain once deployed (e.g. 'https://ayungon.gov.ph' or your portfolio URL).
// Use '*' temporarily while testing locally, then lock it down.
$ALLOWED_ORIGIN = '*';

// Model: gemini-2.5-flash is fast, free-tier friendly, and good enough for a
// portfolio chatbot. See https://ai.google.dev/gemini-api/docs/models for options.
$GEMINI_MODEL = 'gemini-2.5-flash';

// Short system instruction so the bot answers *as* Dahn's assistant.
$SYSTEM_INSTRUCTION = "You are a friendly assistant embedded on Dahn Reymart D. Capiong's " .
    "personal portfolio website. Dahn is a Web Developer and WordPress Specialist based in " .
    "Ayungon, Negros Oriental, Philippines. Answer visitor questions about programming, web " .
    "development, and Dahn's experience helpfully and concisely. If asked something you don't " .
    "know about Dahn specifically, say so honestly and suggest they use the contact form or " .
    "email him directly. Keep replies short and conversational, suited for a chat widget.";
// -----------------------------------------------------------------------

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . $ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!$GEMINI_API_KEY || $GEMINI_API_KEY === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Server is not configured with a Gemini API key yet.']);
    exit;
}

// ---- Read and validate the incoming request ----
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body) || !isset($body['messages']) || !is_array($body['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Expected JSON body: { "messages": [ { "role": "...", "content": "..." } ] }']);
    exit;
}

// Basic guardrails: cap history length and message size so one visitor can't
// run up a huge request or spam the free-tier quota with one call.
$messages = array_slice($body['messages'], -20); // keep last 20 turns max
foreach ($messages as $m) {
    if (!isset($m['role'], $m['content']) || strlen((string)$m['content']) > 4000) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid message format or message too long.']);
        exit;
    }
}

// ---- Convert to Gemini's "contents" format ----
// Gemini uses role "user" / "model" (not "assistant"), and each turn is
// { role, parts: [ { text } ] }.
$contents = [];
foreach ($messages as $m) {
    $role = ($m['role'] === 'assistant') ? 'model' : 'user';
    $contents[] = [
        'role' => $role,
        'parts' => [['text' => (string)$m['content']]],
    ];
}

$payload = [
    'contents' => $contents,
    'systemInstruction' => [
        'parts' => [['text' => $SYSTEM_INSTRUCTION]],
    ],
    'generationConfig' => [
        'maxOutputTokens' => 512,
        'temperature' => 0.7,
    ],
];

$url = "https://generativelanguage.googleapis.com/v1beta/models/{$GEMINI_MODEL}:generateContent?key={$GEMINI_API_KEY}";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 30,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'Could not reach the Gemini API: ' . $curlError]);
    exit;
}

$geminiData = json_decode($response, true);

if ($httpCode !== 200 || !$geminiData) {
    http_response_code(502);
    $msg = $geminiData['error']['message'] ?? 'Unknown error from Gemini API';
    echo json_encode(['error' => $msg]);
    exit;
}

// ---- Extract the reply text ----
$replyText = $geminiData['candidates'][0]['content']['parts'][0]['text']
    ?? "Sorry, I couldn't generate a response just now.";

// ---- Return in the same shape the frontend already expects ----
echo json_encode([
    'content' => [
        ['type' => 'text', 'text' => $replyText],
    ],
]);
