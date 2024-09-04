document.addEventListener('DOMContentLoaded', () => {
    // Calculate FLAMES result based on user input
    window.calculateFLAMES = function() {
        const name1 = document.getElementById('name1').value.trim().toLowerCase();
        let name2 = document.getElementById('name2').value.trim().toLowerCase();
        
        if (name1 === '' || name2 === '') {
            alert('Please enter both names.');
            return;
        }
        
        const flames = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemy', 'Siblings'];
        let count = 0;
        
        // Remove common characters
        for (const char of name1) {
            if (name2.includes(char)) {
                count += 2;
                name2 = name2.replace(char, '');
            }
        }
        
        // Calculate the number of letters remaining
        const total = name1.length + name2.length;
        const n = total - count;
        
        // Determine the FLAMES result
        let index = 0;
        while (flames.length > 1) {
            index = (index + n - 1) % flames.length;
            flames.splice(index, 1);
        }
        
        const result = flames[0];
        document.getElementById('result').innerText = result;
        
        // Update the background based on the result
        document.body.className = `${result.toLowerCase()}-background`;
        
        // Create the rain effect with emojis
        createRainEffect(result);
    };

    // Clear input fields and result
    window.clearFields = function() {
        document.getElementById('name1').value = '';
        document.getElementById('name2').value = '';
        document.getElementById('result').innerText = '';
        document.body.className = '';
        const rainContainer = document.querySelector('.emoji-rain');
        rainContainer.innerHTML = ''; // Clear rain effect
    };

    // Function to create rain effect with emojis
    function createRainEffect(result) {
        const emojis = {
            Friends: '😊',
            Lovers: '😍',
            Affection: '😘',
            Marriage: '💍',
            Enemy: '😡',
            Siblings: '👫'
        };
        
        const emoji = emojis[result] || '💧';
        const rainContainer = document.querySelector('.emoji-rain');
        rainContainer.innerHTML = ''; // Clear previous rain

        for (let i = 0; i < 100; i++) {
            const emojiElement = document.createElement('span');
            emojiElement.textContent = emoji;
            emojiElement.style.position = 'absolute';
            emojiElement.style.fontSize = '24px';
            emojiElement.style.opacity = '0.7';
            emojiElement.style.left = `${Math.random() * 100}vw`;
            emojiElement.style.top = `${Math.random() * 100}vh`;
            emojiElement.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;

            rainContainer.appendChild(emojiElement);
        }
    }
});
