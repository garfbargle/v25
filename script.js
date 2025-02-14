function getNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name')?.toLowerCase();
}

function showCard(name) {
    // Hide all cards
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.add('hidden');
    });

    // Show appropriate card based on name
    const messages = {
        natalia: "To my beautiful Nati, who makes my world more warm and adventurous than any volcano! \n\nHappy Valentine's Day! ❤️ \n\n- Love, Codi",
        kalia: "To my precious little cow lover! \n\n Daddy loves you to the moooon and back! \n\nLove, Dad",
        sam: `To my SamstaTehMonsta, Minecraft champion! You're better than netherite 𐂫! \n\n Happy Valentine's Day! \n\n ❤️ Love, Dad`,
        mom: "To the strongest woman I know!\n\nYour care and dedication to our family and others is truly inspiring. Thank you for always being there.\n\nHappy Valentine's Day! ❤️\n\nLove, Your Son",
        kayla: "To my tough-as-nails sister!\n\nProud of you for breaking barriers and showing them how it's done in a man's world. Keep being amazing!\n\nHappy Valentine's Day! ⚡❤️\n\nLove, Your Brother",
        tori: "To my animal-whispering sister!\n\nYour love for all creatures great and small makes the world a better place. Give all your furry (and scaly) friends a Valentine's hug from me!\n\nHappy Valentine's Day! 🐾❤️\n\nLove, Your Brother"
    };

    const cardId = `${name}-card`;
    const card = document.getElementById(cardId);
    
    if (card) {
        card.classList.remove('hidden');
        const messageElement = card.querySelector('.message');
        messageElement.textContent = messages[name] || '';
        
        // Add click handler for speak button
        const speakButton = card.querySelector('.speak-button');
        speakButton.onclick = () => {
            const message = messageElement.textContent;
            speakMessage(message);
        };
        
        if (name === 'sam') {
            createHeartParticles();
        } else if (name === 'kalia') {
            animateCowTail();
        } else if (name === 'mom') {
            animateHouseAndKeys();
        } else if (name === 'kayla') {
            animatePowerLines();
        } else if (name === 'tori') {
            animateAnimals();
        }
    } else {
        const defaultCard = document.getElementById('default-card');
        defaultCard.classList.remove('hidden');
        
        // Add click handler for default card speak button
        const speakButton = defaultCard.querySelector('.speak-button');
        speakButton.onclick = () => {
            const message = defaultCard.querySelector('.message').textContent;
            speakMessage(message);
        };
    }
}

function createHeartParticles() {
    const container = document.querySelector('.heart-particles');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'heart-particle';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '0';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }, 300);
}

function animateCowTail() {
    const cowAscii = document.getElementById('cow');
    let heartPosition = 0;
    let phase = 'up';
    let raining = false;
    let rainHearts = [];
    
    function updateScene() {
        const lines = cowAscii.innerText.split('\n');
        const heartLine = '    ❤️';
        const emptyLine = '     ';
        
        // Update moon expression
        lines[0] = phase === 'down' ? 
            '    🌝 *  .  *' :  // Full moon when heart reaches
            '    🌛 *  .  *';   // Crescent moon normally
        lines[1] = '     ⋆  ✦  ⋆';
            
        // Clear previous heart positions
        for (let i = 2; i < 8; i++) {
            lines[i] = emptyLine;
        }
        
        // Handle rising heart
        if (phase === 'up' && heartPosition < 6) {
            lines[7 - heartPosition] = heartLine;
        }
        
        // Handle raining hearts
        if (raining) {
            // Update existing rain hearts
            rainHearts = rainHearts.map(heart => ({
                ...heart,
                y: heart.y + 1
            })).filter(heart => heart.y < 6);
            
            // Add new rain heart every few frames
            if (Math.random() < 0.3) {
                rainHearts.push({
                    x: Math.floor(Math.random() * 5) * 4,  // Random x position
                    y: 0
                });
            }
            
            // Draw rain hearts
            rainHearts.forEach(heart => {
                if (heart.y < 6) {
                    const lineContent = lines[heart.y + 2];
                    lines[heart.y + 2] = lineContent.substring(0, heart.x) + '❤️' + 
                        lineContent.substring(heart.x + 2);
                }
            });
        }
        
        // Update animation state
        if (phase === 'up') {
            heartPosition++;
            if (heartPosition >= 6) {
                phase = 'down';
                raining = true;
                // Reset heart position for next cycle
                setTimeout(() => {
                    phase = 'up';
                    heartPosition = 0;
                    raining = false;
                    rainHearts = [];
                }, 4000);  // Rain for 4 seconds
            }
        }
        
        cowAscii.innerText = lines.join('\n');
    }

    // Run animation
    setInterval(updateScene, 200);
}

function animateHouseAndKeys() {
    const container = document.querySelector('.house-container');
    setInterval(() => {
        const key = document.createElement('div');
        key.innerHTML = '🔑';
        key.className = 'floating-key';
        key.style.left = Math.random() * 100 + '%';
        container.appendChild(key);
        setTimeout(() => key.remove(), 3000);
    }, 500);
}

function animatePowerLines() {
    const container = document.querySelector('.power-lines');
    setInterval(() => {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = Math.random() * 100 + '%';
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    }, 300);
}

function animateAnimals() {
    const container = document.querySelector('.animal-parade');
    const animals = ['🐕', '🐈', '🐍', '🐾'];
    let index = 0;
    
    setInterval(() => {
        const animal = document.createElement('div');
        animal.innerHTML = animals[index];
        animal.className = 'parading-animal';
        container.appendChild(animal);
        setTimeout(() => animal.remove(), 4000);
        index = (index + 1) % animals.length;
    }, 1000);
}

function speakMessage(message) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9; // Slightly slower rate for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch for a friendlier tone
    window.speechSynthesis.speak(utterance);
}

// Initialize the card when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const name = getNameFromUrl();
    showCard(name);
}); 