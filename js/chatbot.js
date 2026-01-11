// Chatbot Functions
let chatHistory = [];

function toggleChatbot() {
    const modal = document.getElementById('chatbotModal');
    modal.classList.toggle('active');
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    const charCount = document.getElementById('charCount');
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';
    if (charCount) charCount.textContent = '0';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response with slight delay to simulate thinking
    setTimeout(async () => {
        try {
            const response = await getAIResponse(message);
            removeTypingIndicator();
            addMessage(response, 'bot');
        } catch (error) {
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            console.error('AI Error:', error);
        }
    }, 800);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    
    if (sender === 'user') {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'user-message-wrapper';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble user-bubble';
        bubble.textContent = text;
        
        messageWrapper.appendChild(bubble);
        messagesContainer.appendChild(messageWrapper);
    } else {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'bot-message-wrapper';
        
        const avatar = document.createElement('div');
        avatar.className = 'bot-avatar';
        avatar.textContent = 'D';
        
        const content = document.createElement('div');
        content.className = 'bot-message-content';
        
        const name = document.createElement('div');
        name.className = 'bot-name';
        name.textContent = 'Dahn Reymart';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble bot-bubble';
        bubble.textContent = text;
        
        content.appendChild(name);
        content.appendChild(bubble);
        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(content);
        messagesContainer.appendChild(messageWrapper);
    }
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'bot-message-wrapper';
    messageWrapper.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = 'D';
    
    const content = document.createElement('div');
    content.className = 'bot-message-content';
    
    const name = document.createElement('div');
    name.className = 'bot-name';
    name.textContent = 'Dahn Reymart';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble bot-bubble typing-indicator';
    bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    
    content.appendChild(name);
    content.appendChild(bubble);
    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(content);
    messagesContainer.appendChild(messageWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

async function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! 👋 I'm here to answer questions about Dahn Reymart's skills, experience, and projects. What would you like to know?";
    }
    
    // Skills and technologies
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('what can') || message.includes('programming')) {
        return "Dahn is proficient in:\n• Frontend: JavaScript, HTML, CSS, Tailwind CSS, Bootstrap\n• Backend: PHP, Laravel, Python\n• Databases: MySQL, PostgreSQL, MariaDB\n• CMS: WordPress, Shopify, WooCommerce\n• Tools: Git, Canva, Figma, CapCut\n\nHe builds complete web solutions from design to deployment!";
    }
    
    // Projects
    if (message.includes('project') || message.includes('work') || message.includes('portfolio') || message.includes('built') || message.includes('created')) {
        return "Dahn has built various projects including:\n• First Aid Knowledge System\n• JETJAIRO Booking System\n• Pharmacy & Furniture Inventory systems\n• E-commerce sites (TasteLike It, FMANILA Fashion)\n• Tourist information websites\n\nCheck out the 'Recent Projects' and 'Projects' sections to see live demos!";
    }
    
    // Experience
    if (message.includes('experience') || message.includes('background') || message.includes('worked') || message.includes('job')) {
        return "Dahn has professional experience as:\n• Intern at Municipality of Ayungon's Treasurer's Office (4 months)\n• Intern at Manulife Dumaguete (2 months)\n\nHe continuously expands his skills through seminars, webinars, and hands-on projects.";
    }
    
    // Education
    if (message.includes('education') || message.includes('study') || message.includes('school') || message.includes('college') || message.includes('degree')) {
        return "Dahn is pursuing a Bachelor of Science in Information Technology at Negros Oriental State University. He completed Senior High School at Negros College with an ICT strand, specializing in Information and Communication Technology.";
    }
    
    // Contact and hiring
    if (message.includes('contact') || message.includes('hire') || message.includes('available') || message.includes('reach') || message.includes('schedule')) {
        return "Dahn is available for freelance work! 🎯\n\nYou can:\n• Click 'Schedule a Call' button above to book a meeting\n• Email: capiongdahnreymart@gmail.com\n• Check his social links in the sidebar\n\nLet's discuss your project!";
    }
    
    // WordPress specific
    if (message.includes('wordpress') || message.includes('cms') || message.includes('website builder')) {
        return "Yes! Dahn is a WordPress specialist with experience in:\n• Custom themes and plugins\n• WooCommerce setup and customization\n• Shopify integration\n• Complete CMS solutions\n\nHe can build and manage your entire WordPress website!";
    }
    
    // Pricing
    if (message.includes('price') || message.includes('cost') || message.includes('rate') || message.includes('how much') || message.includes('budget')) {
        return "Project rates vary based on complexity, features, and timeline. For an accurate quote:\n• Click 'Schedule a Call' to discuss your specific needs\n• Or email at capiongdahnreymart@gmail.com\n\nDahn will provide a detailed proposal tailored to your project!";
    }
    
    // Social media
    if (message.includes('social media') || message.includes('content') || message.includes('manage') || message.includes('marketing')) {
        return "Dahn offers social media management services including:\n• Content creation and scheduling\n• Graphic design with Canva\n• Video editing with CapCut\n• Platform engagement and strategy\n\nHe can handle your complete digital presence!";
    }
    
    // Frontend/Design
    if (message.includes('frontend') || message.includes('design') || message.includes('ui') || message.includes('ux') || message.includes('responsive')) {
        return "Dahn specializes in modern frontend development:\n• Responsive design with Tailwind CSS and Bootstrap\n• Interactive UIs with JavaScript\n• Design tools: Figma, Canva\n• Mobile-first approach\n\nYour website will look great on all devices!";
    }
    
    // Backend/Database
    if (message.includes('backend') || message.includes('database') || message.includes('api') || message.includes('server')) {
        return "Dahn has strong backend capabilities:\n• PHP and Laravel for robust server-side logic\n• Database design with MySQL, PostgreSQL, MariaDB\n• API development and integration\n• Secure and scalable architecture\n\nHe handles the complete technical stack!";
    }
    
    // Location
    if (message.includes('location') || message.includes('where') || message.includes('based') || message.includes('from')) {
        return "Dahn is based in Ayungon, Central Visayas, Philippines 🇵🇭\n\nHe works with clients globally and is available for both remote and local projects!";
    }
    
    // Timeline/Speed
    if (message.includes('how long') || message.includes('timeline') || message.includes('how fast') || message.includes('when')) {
        return "Project timelines depend on complexity and requirements. Dahn focuses on:\n• Efficient delivery without compromising quality\n• Clear communication throughout development\n• Meeting agreed deadlines\n\nSchedule a call to discuss your specific timeline!";
    }
    
    // E-commerce
    if (message.includes('ecommerce') || message.includes('e-commerce') || message.includes('online store') || message.includes('shop')) {
        return "Yes! Dahn builds complete e-commerce solutions:\n• Custom online stores\n• WooCommerce and Shopify setup\n• Payment gateway integration\n• Product management systems\n\nCheck out his FMANILA Fashion and TasteLike It projects!";
    }
    
    // Learning/Growth
    if (message.includes('learn') || message.includes('grow') || message.includes('update') || message.includes('new')) {
        return "Dahn is committed to continuous learning! He regularly:\n• Attends seminars and webinars\n• Works on diverse projects\n• Stays updated with latest technologies\n• Expands his skill set\n\nHe brings fresh, modern solutions to every project!";
    }
    
    // Thank you
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're welcome! 😊 Feel free to ask anything else about Dahn's skills, projects, or availability. If you're ready to start a project, click 'Schedule a Call' above!";
    }
    
    // Goodbye
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
        return "Thanks for chatting! 👋 Feel free to come back if you have more questions. Don't forget to check out the projects and schedule a call if you'd like to work together!";
    }
    
    // Default response for unmatched queries
    return "I'm here to help you learn about Dahn Reymart! You can ask me about:\n• His technical skills and expertise\n• Previous projects and work\n• Professional experience\n• How to contact or hire him\n• Education and background\n\nWhat would you like to know?";
}

// Character counter and Enter key handler
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const charCount = document.getElementById('charCount');
    
    if (chatInput && charCount) {
        chatInput.addEventListener('input', () => {
            charCount.textContent = chatInput.value.length;
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});