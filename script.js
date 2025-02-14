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
        natalia: "To my beautiful wife who makes my world more colorful than any volcano! Happy Valentine's Day! ❤️",
        kalia: "To my precious little cow lover! Daddy loves you to the moooon and back! ❤️",
        sam: "To my awesome Minecraft champion! You're better than diamonds! Happy Valentine's Day! ❤️"
    };

    const cardId = `${name}-card`;
    const card = document.getElementById(cardId);
    
    if (card) {
        card.classList.remove('hidden');
        card.querySelector('.message').textContent = messages[name] || '';
        
        if (name === 'sam') {
            createHeartParticles();
        } else if (name === 'kalia') {
            animateCowTail();
        }
    } else {
        document.getElementById('default-card').classList.remove('hidden');
    }
}

function createHeartParticles() {
    const container = document.querySelector('.heart-particles');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'heart-particle';
        heart.style.left = Math.random() * 100 + '%';
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

// Initialize the card when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const name = getNameFromUrl();
    showCard(name);
}); 