document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const successMessage = document.getElementById('success-message');
    const userDisplay = document.getElementById('user-display');
    const submitBtn = document.getElementById('submit-btn');

    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Visual feedback on button
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';

        // Collect form data
        const formData = new FormData(surveyForm);
        const data = Object.fromEntries(formData.entries());

        // Secure Proxy Configuration (Supabase Edge Function)
        const PROXY_URL = 'https://ttggzbpexwobzohtyxqc.supabase.co/functions/v1/submit-survey-secure';

        // Send to Secure Proxy
        fetch(PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en el servidor seguro');
            return response.json();
        })
        .then(result => {
            console.log('Submission Success:', result);
            // Hide form and show success message
            surveyForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            userDisplay.innerText = data.id_estudiante;
        })
        .catch(error => {
            console.error('Submission Error:', error);
            alert('Hubo un problema al procesar tu encuesta. Por favor, inténtalo de nuevo.');
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Encuesta';
        });
    });

    // Suble interaction for rating labels
    const ratingLabels = document.querySelectorAll('.rating-scale label');
    ratingLabels.forEach(label => {
        label.addEventListener('click', () => {
            // Subtle pulse animation could go here
        });
    });
});

function createParticles() {
    // Simple logic to add some dynamic feeling if needed
    // In this case, the CSS animation scaleIn handles the wow factor
}
