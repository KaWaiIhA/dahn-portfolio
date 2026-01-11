const viewAllData = {
            techstack: {
                title: "Complete Tech Stack",
                sections: [
                    {
                        name: "Frontend",
                        items: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "React (Learning)", "Vue.js (Familiar)"]
                    },
                    {
                        name: "Backend",
                        items: ["PHP", "Laravel", "Python", "Node.js (Basic)", "Express.js (Learning)"]
                    },
                    {
                        name: "Databases",
                        items: ["MySQL", "PostgreSQL", "MariaDB", "SQLite", "MongoDB (Basic)"]
                    },
                    {
                        name: "Tools & Others",
                        items: ["Git", "GitHub", "WAMPSERVER", "Canva", "CapCut", "Figma", "Webflow", "Microsoft Office", "Photoshop (Basic)", "Adobe Premiere (Basic)", "VS Code", "Postman"]
                    },
                    {
                        name: "CMS & Platforms",
                        items: ["WordPress", "Shopify", "WooCommerce"]
                    }
                ]
            },
            recentprojects: {
                title: "All Recent Projects",
                projects: [
                    {
                        name: "Ayungon Tourist Spots",
                        description: "Tourist spots and their history",
                        url: "https://kawaiiha.github.io/Ayungon-Tourist-spot/app/index.html"
                    },
                    {
                        name: "Super Session Holiday-Camp",
                        description: "A Camp is a kids activity site for school holiday fun",
                        url: "https://holidaycamp.infinityfreeapp.com/"
                    },
                    {
                        name: "Mount Dharm in the land of Balsamer",
                        description: "Introduction to the region, then visual stories",
                        url: "https://jabaldurm.lovable.app"
                    },
                    {
                        name: "TasteLike It Restaurant",
                        description: "Online Ordering Restaurant",
                        url: "https://genirikainventori.kesug.com/app/index.php"
                    },
                    {
                        name: "FMANILA FASHION",
                        description: "Online fashion store",
                        url: "https://kawaiiha.github.io/Manila-fashion_shopify/app/"
                    }
                ]
            },
            allprojects: {
                title: "All Portfolio Projects",
                projects: [
                    {
                        name: "First Aid Knowledge Based",
                        description: "Basic first aid knowledge system",
                        id: "project1"
                    },
                    {
                        name: "JETJAIRO Booking System",
                        description: "Efficient booking platform",
                        id: "project2"
                    },
                    {
                        name: "Pharmacy Inventory",
                        description: "Medicine tracking system",
                        id: "project3"
                    },
                    {
                        name: "Furniture Inventory",
                        description: "Warehouse management",
                        id: "project6"
                    },
                    {
                        name: "Canva Designs",
                        description: "Graphic design portfolio",
                        id: "project4"
                    },
                    {
                        name: "Video Editing",
                        description: "CapCut projects",
                        id: "project5"
                    }
                ]
            }
        };

        function openViewAllModal(type) {
            const data = viewAllData[type];
            const modal = document.getElementById('viewAllModal');
            const content = document.getElementById('viewAllContent');
            
            let htmlContent = `<h2 class="text-3xl font-bold mb-6">${data.title}</h2>`;
            
            if (type === 'techstack') {
                data.sections.forEach(section => {
                    htmlContent += `
                        <div class="mb-6">
                            <h3 class="text-xl font-semibold mb-3 text-gray-700">${section.name}</h3>
                            <div class="flex flex-wrap gap-2">
                                ${section.items.map(item => `<span class="tech-badge">${item}</span>`).join('')}
                            </div>
                        </div>
                    `;
                });
            } else if (type === 'recentprojects') {
                htmlContent += '<div class="space-y-4">';
                data.projects.forEach(project => {
                    htmlContent += `
                        <a href="${project.url}" target="_blank" class="recent-project-card block">
                            <h3 class="font-semibold mb-2">${project.name}</h3>
                            <p class="text-sm text-gray-600 mb-3">${project.description}</p>
                            <p class="text-xs text-gray-500 font-mono">${project.url}</p>
                        </a>
                    `;
                });
                htmlContent += '</div>';
            } else if (type === 'allprojects') {
                htmlContent += '<div class="grid md:grid-cols-2 gap-4">';
                data.projects.forEach(project => {
                    htmlContent += `
                        <div class="project-card cursor-pointer" onclick="closeViewAllModal(); openProjectModal('${project.id}')">
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">${project.name}</h3>
                                <p class="text-sm text-gray-600">${project.description}</p>
                            </div>
                        </div>
                    `;
                });
                htmlContent += '</div>';
            }
            
            content.innerHTML = htmlContent;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeViewAllModal() {
            const modal = document.getElementById('viewAllModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('viewAllModal').addEventListener('click', (e) => {
            if (e.target.id === 'viewAllModal') closeViewAllModal();
        });