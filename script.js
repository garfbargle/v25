function getNameFromUrl() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name')?.toLowerCase();
        console.log('URL name parameter:', name);
        return name;
    } catch (error) {
        console.error('Error getting name from URL:', error);
        return null;
    }
}

function updateMetaTags(name) {
    try {
        // Update page title
        let displayName = name;
        if (name && name.startsWith('custom-')) {
            displayName = name.replace('custom-', '');
        }
        
        const title = displayName ? 
            `To:${displayName} from:c0di` : 
            'from:c0di';
        
        const description = displayName ? 
            `to:${displayName} 💌` : 
            'to: you 💌';

        // Update document title
        document.title = title;

        // Update Open Graph meta tags
        document.querySelector('meta[property="og:title"]').setAttribute('content', title);
        document.querySelector('meta[property="og:description"]').setAttribute('content', description);

        // Update Twitter Card meta tags
        document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
        document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);

    } catch (error) {
        console.error('Error updating meta tags:', error);
    }
}

function showCard(name) {
    try {
        // Add this at the start of the showCard function
        updateMetaTags(name);

        // Hide all cards
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.add('hidden');
        });

        // Check if it's a custom card
        if (name && name.startsWith('custom-')) {
            const customName = name.replace('custom-', '');
            const customMessages = [
                `Dear ${customName},\n\nYour smile brightens every room you enter and your kindness touches everyone around you. On this Valentine's Day, I hope you feel as special as you make others feel!\n\nHappy Valentine's Day! ❤️\n\nWith love,\nYour Secret Admirer`,
                
                `Dear ${customName},\n\nLike a star in the night sky, you shine with your own unique light. May your Valentine's Day be as brilliant and special as you are!\n\nHappy Valentine's Day! ✨❤️\n\nWarmest wishes,\nYour Secret Admirer`,
                
                `Dear ${customName},\n\nYour presence makes the world a better place. Thank you for being the wonderful person that you are!\n\nHappy Valentine's Day! 🌟❤️\n\nWith appreciation,\nYour Secret Admirer`,
                
                `Dear ${customName},\n\nEvery day is brighter because you're in it. Your energy and spirit are truly one of a kind!\n\nHappy Valentine's Day! 🌈❤️\n\nCheers to you,\nYour Secret Admirer`,
                
                `Dear ${customName},\n\nYou have a heart of gold and a spirit that inspires. Never stop being the amazing person you are!\n\nHappy Valentine's Day! 💫❤️\n\nWith admiration,\nYour Secret Admirer`
            ];
            
            // Create a simple hash of the name to consistently select the same message
            const nameHash = customName.split('').reduce((hash, char) => {
                return ((hash << 5) - hash) + char.charCodeAt(0);
            }, 0);
            
            const messageIndex = Math.abs(nameHash) % customMessages.length;
            const customMessage = customMessages[messageIndex];
            
            const customCard = document.getElementById('custom-card');
            customCard.classList.remove('hidden');
            const messageElement = customCard.querySelector('.message');
            messageElement.textContent = customMessage;
            
            // Add click handler for speak button
            const speakButton = customCard.querySelector('.speak-button');
            speakButton.onclick = () => {
                speakMessage(customMessage);
            };
            
            // Start floating hearts animation
            createFloatingHearts();
            return;
        }

        // Show appropriate card based on name
        const messages = {
            natalia: "To my beautiful Natalia, who makes my world more warm and adventurous than any volcano! Thank you for being such an amazing Mom to our family! \n\n To many more travels & adventures around this planet together. <3 \n\nHappy Valentine's Day! ❤️ \n\n- Te amo mucho, Codi",
            kalia: "To my precious little cow lover! \n\n Daddy loves you to the moooon and back! \n\nLove, Dad",
            sam: `To my SamstaTehMonsta, Minecraft champion! You're better than netherite 𐂫! \n\n Happy Valentine's Day! \n\n ❤️ Love, Dad`,
            dad: "To my amazing dad, ⌘BigSarge628! 🎖️\n\nImagine if you hadn't been obsessed with computers too.... Your guidance and wisdom have shaped who I am today. Our endless conversations about everything under the sun are some of my most cherished memories. Can't wait for you to visit us - we have so much more to talk about!\n\nHappy Valentine's Day! ❤️\n\nProudly,\nYour Son",
            mom: "To the bravest Grandma in the world! 🦸‍♀️\n\nI know you're a bit scared of those sneaky snakes in Costa Rica, but guess what? They're more afraid of you than you are of them! 🐍💚 We all can't wait for you to come visit and experience the beauty of this amazing place! It's a paradise filled with sunshine, adventure, and love! 🌴✨ Maybe we can even find a fun way to help you face those fears—how about a little hypnosis magic? 🎩💖\n\nHappy Valentine's Day! ❤️\n\nLove, Your Son",
            kayla: "To my tough-as-nails sister!\n\nProud of you for breaking barriers and showing them how it's done in a man's world. Keep being amazing!\n\nHappy Valentine's Day! ⚡❤️\n\nLove, Your Brother",
            tori: "To my animal-whispering sister!\n\nYour love for all creatures great and small makes the world a better place. Give all your furry (and scaly) friends a Valentine's hug from me!\n\nHappy Valentine's Day! 🐾❤️\n\nLove, Your Brother",
            kyledan: "To Kyle & Dan, the ultimate freedom fighters! 🦅\n\nKeep stacking sats and protecting liberty. Your dedication to financial freedom and American values is truly inspiring.\n\nHappy Valentine's Day! ₿❤️🇺🇸\n\nFrom your fellow sovereign individual,\nCodi",
            erica: "To my amazing friend Erica! 💜\n\nFrom that first day of college until now, you've colored my world with your creativity and friendship. Your artistic soul and gaming spirit make you truly unique - like a rare legendary drop! 🎮\n\nHappy Valentine's Day! 🐙\n\nLove, Codi",
            viktor: "To my 🇧🇬h4xor friend Viktor! \n\nFrom debugging code to debugging life over Starbucks iced coffees, you've shown me what true friendship means in just a few days. Your brilliant mind for math and systems never ceases to amaze me!\n\nHappy Valentine's Day! ☕️\n\nFrom your friend irl,\nCodi",
            diran: "To my brilliant friend Diran! 🚀\n\nFrom late-night 'coding sessions' in the dorms to watching you conquer the world, you've always inspired me with your genius and generosity. Your journey from aerospace savant to crypto pioneer shows that the sky's not the limit - it's just the beginning!\n\nHappy Valentine's Day in Aussieland! 🇦🇲✨\n\nYour proud friend,\nCodi",
            hani: "To my brilliant friend Hani! 🌀\n\nFrom building portals to new dimensions to crushing it in games, your ability to bring sci-fi dreams to reality never ceases to amaze me. You're the perfect blend of hardware hacker and software wizard - a true renaissance builder!\n\nHappy Valentine's Day! 🎮✨\n\nLet's game/chat/w/e soon!\nCodi"
        };

        const cardId = `${name}-card`;
        const card = document.getElementById(cardId);
        
        if (card) {
            card.classList.remove('hidden');
            const messageElement = card.querySelector('.message');
            messageElement.textContent = messages[name] || '';
            
            // Add click handler for speak button
            const speakButton = card.querySelector('.speak-button');
            if (speakButton) {
                speakButton.onclick = () => {
                    const message = messageElement.textContent;
                    speakMessage(message);
                };
            }
            
            // Add click handler for reply button
            const replyButton = card.querySelector('.reply-button');
            if (replyButton) {
                replyButton.onclick = () => {
                    window.location.href = `mailto:_@c0di.com?subject=Re: Valentine's Day Card`;
                };
            }
            
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
            } else if (name === 'kyledan') {
                createStars();
            } else if (name === 'erica') {
                animateEricaScene();
            } else if (name === 'viktor') {
                animateViktorScene();
            } else if (name === 'diran') {
                animateDiranScene();
            } else if (name === 'hani') {
                animateHaniScene();
            } else if (name === 'natalia') {
                animateCostaRicaScene();
            } else if (name === 'dad') {
                animateMilitaryScene();
            }
        } else {
            const defaultCard = document.getElementById('default-card');
            defaultCard.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error showing card:', error);
        // Show default card as fallback
        const defaultCard = document.getElementById('default-card');
        if (defaultCard) {
            defaultCard.classList.remove('hidden');
        }
    }
}

function createHeartParticles() {
    try {
        const container = document.querySelector('.heart-particles');
        if (!container) return;
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'heart-particle';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '0';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, 300);
    } catch (error) {
        console.error('Error creating heart particles:', error);
    }
}

function animateCowTail() {
    try {
        const cowAscii = document.getElementById('cow');
        if (!cowAscii) return;
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
    } catch (error) {
        console.error('Error animating cow tail:', error);
    }
}

function animateHouseAndKeys() {
    try {
        const container = document.querySelector('.tropical-particles');
        const particles = ['🌺', '🦋', '✨', '🌸', '🍃'];
        
        // Create tropical particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'tropical-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.position = 'absolute';
            particle.style.fontSize = (Math.random() * 10 + 15) + 'px';
            particle.style.animation = 'floatParticle 3s ease-out forwards';
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }

        // Create friendly snake that runs away
        const snakeContainer = document.querySelector('.snake-container');
        const snake = document.createElement('div');
        snake.className = 'friendly-snake';
        snake.textContent = '🐍';
        snake.style.position = 'absolute';
        snake.style.bottom = '20px';
        snake.style.fontSize = '30px';
        snake.style.transition = 'left 4s ease-in-out';
        snakeContainer.appendChild(snake);
        
        function resetSnake() {
            snake.style.left = '-50px';
            setTimeout(() => {
                snake.style.left = 'calc(100% + 50px)';
            }, 100);
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .tropical-particles {
                position: relative;
                width: 100%;
                height: 200px;
                overflow: hidden;
            }
            
            .tropical-particle {
                position: absolute;
                opacity: 0;
                transform: translate(0, 0) rotate(0deg);
                pointer-events: none;
            }
            
            .snake-container {
                position: relative;
                width: 100%;
                height: 60px;
                overflow: hidden;
            }
            
            .friendly-snake {
                transform: scaleX(-1);
            }
            
            @keyframes floatParticle {
                0% {
                    opacity: 0;
                    transform: translate(0, 0) rotate(0deg);
                }
                20% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translate(${Math.random() > 0.5 ? '-' : ''}100px, -100px) rotate(${Math.random() * 360}deg);
                }
            }
        `;
        document.head.appendChild(style);

        // Start animations
        setInterval(createParticle, 500);
        setInterval(resetSnake, 8000);
        
        // Initial snake animation
        resetSnake();
    } catch (error) {
        console.error('Error animating tropical scene:', error);
    }
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

function createStars() {
    const container = document.querySelector('.stars');
    if (!container) return;
    
    const createStar = () => {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 15 + 10) + 'px';
        star.style.opacity = '0';
        star.style.animation = 'starTwinkle 2s ease-in-out infinite';
        container.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    };

    setInterval(createStar, 300);
}

function speakMessage(message) {
    try {
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not available');
            return;
        }
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Error with speech synthesis:', error);
    }
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    container.innerHTML = ''; // Clear existing hearts
    
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    };

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        createHeart();
    }

    // Continue creating hearts
    setInterval(createHeart, 500);
}

// Move initialization code into a main function
function initializeApp() {
    // Check for name in URL and show appropriate card
    const name = getNameFromUrl();
    showCard(name);

    // Add event listener for custom card creation
    const customNameInput = document.getElementById('custom-name');
    if (customNameInput) {
        customNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                createCustomCard();
            }
        });
    }
}

// More robust initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function createCustomCard() {
    const nameInput = document.getElementById('custom-name');
    const name = nameInput.value.trim().toLowerCase();
    
    if (name) {
        // Check if the name is in our special list
        const specialNames = ['natalia', 'kalia', 'sam', 'mom', 'kayla', 'tori', 
                            'kyledan', 'erica', 'viktor', 'diran', 'hani'];
        
        // Update URL without refreshing
        const url = new URL(window.location);
        if (specialNames.includes(name)) {
            url.searchParams.set('name', name);
        } else {
            url.searchParams.set('name', 'custom-' + encodeURIComponent(name));
        }
        window.history.pushState({}, '', url);
        
        showCard(specialNames.includes(name) ? name : 'custom-' + name);
    }
}

// Add this keyframe animation to the existing styles
const style = document.createElement('style');
style.textContent = `
    @keyframes starTwinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add animation function for Erica's card
function animateEricaScene() {
    const container = document.querySelector('.jellyfish-container');
    const paintContainer = document.querySelector('.paint-splashes');
    
    // Create jellyfish
    function createJellyfish() {
        const jellyfish = document.createElement('div');
        jellyfish.innerHTML = '🪼';
        jellyfish.className = 'jellyfish';
        jellyfish.style.left = Math.random() * 80 + 10 + '%';
        jellyfish.style.top = Math.random() * 80 + 10 + '%';
        container.appendChild(jellyfish);
        setTimeout(() => jellyfish.remove(), 8000);
    }

    // Create paint splashes
    function createPaintSplash() {
        const splash = document.createElement('div');
        splash.className = 'paint-splash';
        splash.style.left = Math.random() * 100 + '%';
        splash.style.top = Math.random() * 100 + '%';
        splash.style.transform = `scale(${Math.random() * 2 + 1})`;
        splash.style.background = `hsl(${280 + Math.random() * 40}, 70%, 50%)`;
        paintContainer.appendChild(splash);
        setTimeout(() => splash.remove(), 3000);
    }

    // Start animations
    setInterval(createJellyfish, 2000);
    setInterval(createPaintSplash, 1000);
}

// Add Viktor's animation function
function animateViktorScene() {
    const container = document.querySelector('.hacker-scene');
    const cafeItems = ['☕️', '🧀', '💻', '📐'];
    
    // Create binary rain effect
    function createBinaryDrop() {
        const drop = document.createElement('div');
        drop.className = 'binary-drop';
        drop.textContent = Math.random() > 0.5 ? '1' : '0';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(drop);
        setTimeout(() => drop.remove(), 2000);
    }

    // Create floating café items
    function createCafeItem() {
        const item = document.createElement('div');
        item.className = 'cafe-item';
        item.textContent = cafeItems[Math.floor(Math.random() * cafeItems.length)];
        item.style.left = Math.random() * 100 + '%';
        item.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(item);
        setTimeout(() => item.remove(), 3000);
    }

    setInterval(createBinaryDrop, 100);
    setInterval(createCafeItem, 1000);
}

// Add Diran's animation function
function animateDiranScene() {
    const container = document.querySelector('.aerospace-scene');
    
    // Create code particles
    function createCodeParticle() {
        const codes = ['if', 'for', '{}', '()', '=>'];
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = codes[Math.floor(Math.random() * codes.length)];
        particle.style.left = Math.random() * 100 + '%';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }
    
    // Create crypto symbols
    function createCryptoSymbol() {
        const symbols = ['₿', 'Ξ', '◈', '₳', '⟠'];
        const symbol = document.createElement('div');
        symbol.className = 'crypto-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + '%';
        container.appendChild(symbol);
        setTimeout(() => symbol.remove(), 4000);
    }
    
    // Start animations
    setInterval(createCodeParticle, 500);
    setInterval(createCryptoSymbol, 1000);
}

// Add Hani's animation function
function animateHaniScene() {
    const container = document.querySelector('.portal-particles');
    const gamingContainer = document.querySelector('.gaming-elements');
    const gameIcons = ['🎮', '🎲', '🎯', '💻', '🔧', '⚡'];
    
    // Create portal particles
    function createPortalParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = `hsl(${Math.random() * 60 + 120}, 100%, 50%)`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.borderRadius = '50%';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0;
        let y = 0;
        let scale = 1;
        
        function animate() {
            x += vx;
            y += vy;
            scale *= 0.99;
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            
            if (scale > 0.01) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        container.appendChild(particle);
        animate();
    }
    
    // Create gaming/tech elements
    function createGameIcon() {
        const icon = document.createElement('div');
        icon.textContent = gameIcons[Math.floor(Math.random() * gameIcons.length)];
        icon.style.position = 'absolute';
        icon.style.fontSize = '24px';
        icon.style.left = Math.random() * 100 + '%';
        icon.style.top = Math.random() * 100 + '%';
        icon.style.opacity = '0';
        icon.style.animation = 'fadeInOut 2s ease-in-out forwards';
        gamingContainer.appendChild(icon);
        setTimeout(() => icon.remove(), 2000);
    }
    
    setInterval(createPortalParticle, 50);
    setInterval(createGameIcon, 1000);
}

// Add animation function for Natalia's Costa Rica adventure scene
function animateCostaRicaScene() {
    const container = document.querySelector('.costa-rica-scene');
    if (!container) return;

    // Create beach elements
    const beach = document.createElement('div');
    beach.className = 'beach';
    container.appendChild(beach);

    // Create mountain/volcano
    const volcano = document.createElement('div');
    volcano.className = 'volcano';
    container.appendChild(volcano);

    // Create van
    const van = document.createElement('div');
    van.className = 'adventure-van';
    van.innerHTML = '🚐';
    container.appendChild(van);

    // Create lava particles
    function createLavaParticle() {
        const particle = document.createElement('div');
        particle.className = 'lava-particle';
        
        // Create multiple particles with different trajectories
        const side = Math.random() > 0.5 ? 1 : -1;
        const distance = 30 + Math.random() * 40;
        
        particle.style.left = `${70 + Math.random() * 10}%`;
        particle.style.top = '20%';
        particle.style.setProperty('--distance', `${distance * side}px`);
        particle.style.setProperty('--delay', `${Math.random() * 0.5}s`);
        particle.style.background = `hsl(${Math.random() * 30 + 10}, 100%, ${50 + Math.random() * 20}%)`; // Orange-red colors
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Create beach particles
    function createBeachParticle() {
        const beachElements = ['🌊', '🏖️', '🌴', '🦜'];
        const particle = document.createElement('div');
        particle.className = 'beach-particle';
        particle.innerHTML = beachElements[Math.floor(Math.random() * beachElements.length)];
        particle.style.left = `${Math.random() * 30}%`;
        particle.style.bottom = '10%';
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    // Animate van movement
    let position = 0;
    const animateVan = () => {
        position += 0.5;
        if (position <= 100) {
            van.style.left = `${position}%`;
            van.style.bottom = `${10 + Math.sin(position / 10) * 5}%`; // Add bouncing effect
            van.style.transform = 'scaleX(-1)'; // Flip the van to face right
            requestAnimationFrame(animateVan);
        } else {
            position = 0;
            requestAnimationFrame(animateVan);
        }
    };

    // Start animations
    animateVan();
    setInterval(createLavaParticle, 100); // More frequent lava particles
    setInterval(createBeachParticle, 2000);
}

// Update the Costa Rica scene styles
const costaRicaStyle = document.createElement('style');
costaRicaStyle.textContent = `
    .costa-rica-scene {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: linear-gradient(180deg, 
            #FF851B 0%, /* Sunset orange */
            #87CEEB 20%, /* Sky blue */
            #87CEEB 60%,
            #FFD700 100% /* Beach sand */
        );
    }

    .beach {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40%;
        height: 40%;
        background: #FFD700;
        border-radius: 0 100% 0 0;
        transform-origin: bottom left;
        animation: beachWave 5s ease-in-out infinite;
    }

    .beach::before {
        content: '🌴';
        position: absolute;
        font-size: 40px;
        left: 20%;
        bottom: 60%;
        animation: palmSway 3s ease-in-out infinite;
    }

    .beach::after {
        content: '🌊';
        position: absolute;
        font-size: 30px;
        left: 40%;
        bottom: 20%;
        animation: waveRoll 2s linear infinite;
    }

    .volcano {
        position: absolute;
        bottom: 0;
        right: 10%;
        width: 30%;
        height: 70%;
        background: linear-gradient(45deg, #8B4513, #A0522D);
        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        animation: volcanoGlow 4s ease-in-out infinite;
    }

    .lava-particle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        filter: blur(2px);
        animation: lavaTrajectory 2s ease-out forwards;
        opacity: 0.8;
    }

    .adventure-van {
        position: absolute;
        bottom: 15%;
        left: 0;
        font-size: 2em;
        animation: vanDrive 10s linear infinite;
    }

    @keyframes lavaTrajectory {
        0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateX(var(--distance)) translateY(100px);
            opacity: 0;
        }
    }

    @keyframes vanDrive {
        0% {
            left: -10%;
            transform: translateY(0) scaleX(-1);
        }
        50% {
            left: 110%;
            transform: translateY(-30px) scaleX(-1);
        }
        50.1% {
            left: -10%;
            transform: translateY(-30px) scaleX(-1);
        }
        100% {
            left: 110%;
            transform: translateY(0) scaleX(-1);
        }
    }
`;
document.head.appendChild(costaRicaStyle);

// Add animation function for Dad's military theme
function animateMilitaryScene() {
    const container = document.querySelector('.military-scene');
    if (!container) return;

    // Create medals and stars
    function createMedal() {
        const medals = ['🎖️', '⭐', '🏅'];
        const medal = document.createElement('div');
        medal.className = 'military-medal';
        medal.textContent = medals[Math.floor(Math.random() * medals.length)];
        medal.style.left = Math.random() * 100 + '%';
        medal.style.top = Math.random() * 100 + '%';
        container.appendChild(medal);
        setTimeout(() => medal.remove(), 3000);
    }

    // Create computer code particles
    function createCodeParticle() {
        const codes = ['if', 'while', 'for', '{}', '[]', '⌘'];
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = codes[Math.floor(Math.random() * codes.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.color = '#00ff00'; // Military green color
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Create American flag wave effect
    const flag = document.createElement('div');
    flag.className = 'military-flag';
    flag.textContent = '🇺🇸';
    container.appendChild(flag);

    // Start animations
    setInterval(createMedal, 1000);
    setInterval(createCodeParticle, 500);
}

// Add military scene styles
const militaryStyle = document.createElement('style');
militaryStyle.textContent = `
    .military-scene {
        height: 300px;
        background: linear-gradient(to bottom, #1a472a, #2d5a3f);
        position: relative;
        overflow: hidden;
        padding: 20px;
    }

    .military-medal {
        position: absolute;
        font-size: 30px;
        animation: medalFloat 3s ease-out forwards;
    }

    .military-flag {
        position: absolute;
        font-size: 60px;
        right: 20px;
        top: 20px;
        animation: flagWave 3s infinite;
    }

    @keyframes medalFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(militaryStyle); 