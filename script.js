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
        natalia: "To my beautiful Nati, who makes my world more fiery and adventurous than any volcano! \n\nHappy Valentine's Day! ❤️ \n\n- Love, Codi",
        kalia: "To my precious little cow lover! Daddy loves you to the moooon and back! ❤️\n\n- Love, Dad",
        sam: `To my SamstaTehMonsta, Minecraft champion! You're better than netherite 𐂫! \n\n Happy Valentine's Day! \n\n ❤️ Love, Dad`
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
    const cow = document.getElementById('cow');
    let frame = 0;
    const frames = [
        '^^    ^^',
        '^^    ~^',
        '^^    /\\',
        '^^    ~^'
    ];
    
    setInterval(() => {
        const cowAscii = cow.innerHTML;
        const newTail = frames[frame];
        cow.innerHTML = cowAscii.replace(/\^\^    [\^\~\/\\]+/, newTail);
        frame = (frame + 1) % frames.length;
    }, 300);
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