const creativeWorksData = {
            canva: {
                title: "Canva Designs",
                type: "images",
                items: [
                    "./images/canva/1.png",
                    "./images/canva/2.png",
                    "./images/canva/3.png",
                    "./images/canva/4.png",
                    "./images/canva/5.png",
                    "./images/canva/6.png",
                    "./images/canva/7.png",
                    "./images/canva/9.png",
                    "./images/canva/10.png",
                    "./images/canva/11.png",
                    "./images/canva/12.png",
                    "./images/canva/13.png"
                ]
            },
            capcut: {
                title: "Video Editing - CapCut",
                type: "videos",
                items: [
                    "./images/Capcut/lust.mp4",
                    "./images/Capcut/FOODedit.mp4",
                    "./images/Capcut/edits.mp4",
                    "./images/Capcut/friends.mp4",
                    "./images/Capcut/you_dont_have_an_enemy.mp4",
                    "./images/Capcut/knowledgevslove.mp4",
                    "./images/Capcut/status(love).mp4",
                    "./images/Capcut/Messenger_creation_899DC7B2-DCAA-4DD9-9C22-039733B15EA0.mp4",
                    "./images/Capcut/Messenger_creation_869C8CDC-8537-407E-9C76-8FA53CADF753.mp4"
                ]
            }
        };

        function openCreativeModal(type) {
            const data = creativeWorksData[type];
            const modal = document.getElementById('creativeModal');
            const content = document.getElementById('creativeContent');
            
            let htmlContent = `<h2 class="text-3xl font-bold mb-6">${data.title}</h2>`;
            
            if (data.type === 'images') {
                htmlContent += '<div class="grid grid-cols-2 md:grid-cols-3 gap-4">';
                data.items.forEach((img, index) => {
                    htmlContent += `
                        <div class="cursor-pointer hover:opacity-80 transition-opacity" onclick="openMediaPreview('${img}', 'image')">
                            <img src="${img}" alt="Design ${index + 1}" class="w-full h-48 object-cover rounded-lg">
                        </div>
                    `;
                });
                htmlContent += '</div>';
            } else if (data.type === 'videos') {
                htmlContent += '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
                data.items.forEach((video, index) => {
                    htmlContent += `
                        <div class="cursor-pointer hover:opacity-80 transition-opacity" onclick="openMediaPreview('${video}', 'video')">
                            <video class="w-full h-48 object-cover rounded-lg">
                                <source src="${video}" type="video/mp4">
                            </video>
                            <p class="text-sm text-gray-600 mt-2 text-center">Video ${index + 1} - Click to play</p>
                        </div>
                    `;
                });
                htmlContent += '</div>';
            }
            
            content.innerHTML = htmlContent;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCreativeModal() {
            const modal = document.getElementById('creativeModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function openMediaPreview(src, type) {
            const modal = document.getElementById('mediaPreviewModal');
            const content = document.getElementById('mediaPreviewContent');
            
            if (type === 'image') {
                content.innerHTML = `<img src="${src}" class="max-w-full max-h-[80vh] object-contain rounded-lg">`;
            } else if (type === 'video') {
                content.innerHTML = `
                    <video controls autoplay class="max-w-full max-h-[80vh] rounded-lg">
                        <source src="${src}" type="video/mp4">
                    </video>
                `;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMediaPreview() {
            const modal = document.getElementById('mediaPreviewModal');
            const content = document.getElementById('mediaPreviewContent');
            content.innerHTML = ''; // Stop video playback
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('creativeModal').addEventListener('click', (e) => {
            if (e.target.id === 'creativeModal') closeCreativeModal();
        });

        document.getElementById('mediaPreviewModal').addEventListener('click', (e) => {
            if (e.target.id === 'mediaPreviewModal') closeMediaPreview();
        });