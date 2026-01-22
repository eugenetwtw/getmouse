document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');

    // Game state
    let score = 0;
    let gameActive = true;
    let activeMouseCount = 0;
    let maxMice = 3; // Maximum number of mice on screen at once

    // Game settings
    const mouseSpeed = {
        min: 1,
        max: 3
    };
    const mouseSpawnInterval = 1500; // New mouse every 1.5 seconds
    
    // Initialize game
    function initGame() {
        score = 0;
        gameActive = true;
        activeMouseCount = 0;

        // Update UI
        scoreElement.textContent = score;
        gameOverScreen.classList.add('hidden');

        // Clear any existing mice and explosions
        const existingMice = document.querySelectorAll('.mouse');
        existingMice.forEach(mouse => mouse.remove());
        const existingExplosions = document.querySelectorAll('.explosion');
        existingExplosions.forEach(exp => exp.remove());

        // Start spawning mice
        startSpawningMice();
    }

    // Create explosion effect
    function createExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;

        // Create multiple particles for firework effect
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f', '#bb8fce'];
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('explosion-particle');

            // Random color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Calculate random direction
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50; // Random distance
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            explosion.appendChild(particle);
        }

        gameArea.appendChild(explosion);

        // Remove explosion after animation
        setTimeout(() => {
            explosion.remove();
        }, 600);
    }
    
    // No more click handling for misses - hover-based gameplay!
    
    // Create a mouse element
    function createMouse() {
        if (!gameActive || activeMouseCount >= maxMice) return;
        
        activeMouseCount++;
        
        // Create mouse element
        const mouse = document.createElement('div');
        mouse.classList.add('mouse');
        
        // Set random position (keeping mouse fully within game area)
        const mouseSize = 80; // Size in pixels
        const xPos = Math.random() * (gameArea.offsetWidth - mouseSize);
        const yPos = Math.random() * (gameArea.offsetHeight - mouseSize);
        
        mouse.style.left = `${xPos}px`;
        mouse.style.top = `${yPos}px`;
        
        // Set random movement direction and speed
        const speed = Math.random() * (mouseSpeed.max - mouseSpeed.min) + mouseSpeed.min;
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        
        // Add hover handler - just hover over the mouse to catch it!
        let caught = false;
        mouse.addEventListener('mouseenter', () => {
            if (!gameActive || caught) return;
            caught = true;

            // Increase score
            score++;
            scoreElement.textContent = score;

            // Get mouse position for explosion
            const rect = mouse.getBoundingClientRect();
            const gameRect = gameArea.getBoundingClientRect();
            const explosionX = rect.left + rect.width / 2 - gameRect.left;
            const explosionY = rect.top + rect.height / 2 - gameRect.top;

            // Create explosion effect
            createExplosion(explosionX, explosionY);

            // Make mouse burst out
            mouse.classList.add('caught');

            // Remove mouse after animation
            setTimeout(() => {
                mouse.remove();
                activeMouseCount--;
            }, 400);
        });
        
        // Add to game area
        gameArea.appendChild(mouse);
        
        // Start mouse movement
        moveMouse(mouse, dx, dy);
        
        // Remove mouse after random time if not clicked
        const lifespan = Math.random() * 4000 + 3000; // 3-7 seconds (increased for easier gameplay)
        setTimeout(() => {
            if (mouse.parentNode === gameArea) {
                mouse.remove();
                activeMouseCount--;
            }
        }, lifespan);
    }
    
    // Move a mouse element
    function moveMouse(mouse, dx, dy) {
        if (!gameActive || !mouse.parentNode) return;
        
        // Get current position
        let xPos = parseFloat(mouse.style.left);
        let yPos = parseFloat(mouse.style.top);
        
        // Update position
        xPos += dx;
        yPos += dy;
        
        // Bounce off walls
        const mouseSize = 80;
        if (xPos <= 0 || xPos >= gameArea.offsetWidth - mouseSize) {
            dx = -dx;
            xPos = Math.max(0, Math.min(xPos, gameArea.offsetWidth - mouseSize));
        }
        
        if (yPos <= 0 || yPos >= gameArea.offsetHeight - mouseSize) {
            dy = -dy;
            yPos = Math.max(0, Math.min(yPos, gameArea.offsetHeight - mouseSize));
        }
        
        // Apply new position
        mouse.style.left = `${xPos}px`;
        mouse.style.top = `${yPos}px`;
        
        // Flip the mouse image based on direction
        if (dx < 0) {
            mouse.style.transform = 'scaleX(-1)';
        } else {
            mouse.style.transform = 'scaleX(1)';
        }
        
        // Continue movement
        requestAnimationFrame(() => moveMouse(mouse, dx, dy));
    }
    
    // Start spawning mice
    function startSpawningMice() {
        const spawnInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(spawnInterval);
                return;
            }
            
            if (activeMouseCount < maxMice) {
                createMouse();
            }
        }, mouseSpawnInterval);
    }
    
    // End the game
    function endGame() {
        gameActive = false;
        finalScoreElement.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }
    
    // Restart button handler
    restartButton.addEventListener('click', initGame);
    
    // Start the game
    initGame();
});
