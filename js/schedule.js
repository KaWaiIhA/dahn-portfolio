function openSchedulerModal() {
            const modal = document.getElementById('schedulerModal');
            
            // Set minimum date to today
            const dateInput = modal.querySelector('input[name="date"]');
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeSchedulerModal() {
            const modal = document.getElementById('schedulerModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('schedulerModal').addEventListener('click', (e) => {
            if (e.target.id === 'schedulerModal') closeSchedulerModal();
        });

        document.getElementById('schedulerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const date = formData.get('date');
            const time = formData.get('time');
            const purpose = formData.get('purpose');
            const notes = formData.get('notes');
            
            // Format email
            const subject = encodeURIComponent(`Call Appointment Request - ${purpose}`);
            const body = encodeURIComponent(`
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Preferred Date: ${date}
Preferred Time: ${time}
Purpose: ${purpose}

Additional Notes:
${notes || 'None'}

---
Please confirm this appointment at your earliest convenience.
            `);
            
            const yourEmail = 'capiongdahnreymart@gmail.com';
            
            // Open Gmail compose
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${subject}&body=${body}`, '_blank');
            
            alert('Opening Gmail to send your appointment request. I\'ll get back to you soon to confirm!');
            closeSchedulerModal();
            e.target.reset();
        });