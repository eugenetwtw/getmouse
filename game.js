document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const missesElement = document.getElementById('misses');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');
    
    // Create miss indicator element
    const missIndicator = document.createElement('div');
    missIndicator.id = 'miss-indicator';
    missIndicator.textContent = 'MISS!';
    missIndicator.style.display = 'none';
    document.querySelector('.game-container').appendChild(missIndicator);
    
    // Game state
    let score = 0;
    let misses = 0;
    let gameActive = true;
    let activeMouseCount = 0;
    let maxMice = 5; // Maximum number of mice on screen at once
    
    // Game settings
    const maxMisses = 3;
    const mouseSpeed = {
        min: 2,
        max: 5
    };
    const mouseSpawnInterval = 1000; // New mouse every 1 second
    
    // Initialize game
    function initGame() {
        score = 0;
        misses = 0;
        gameActive = true;
        activeMouseCount = 0;
        
        // Update UI
        scoreElement.textContent = score;
        missesElement.textContent = misses;
        gameOverScreen.classList.add('hidden');
        
        // Clear any existing mice
        const existingMice = document.querySelectorAll('.mouse');
        existingMice.forEach(mouse => mouse.remove());
        
        // Start spawning mice
        startSpawningMice();
    }
    
    // Handle game area clicks (misses)
    gameArea.addEventListener('click', (e) => {
        // Only count as miss if clicking directly on game area (not on a mouse)
        if (e.target === gameArea && gameActive) {
            misses++;
            missesElement.textContent = misses;
            
            // Show miss indicator at click position
            missIndicator.style.display = 'block';
            missIndicator.style.left = `${e.clientX - gameArea.getBoundingClientRect().left - 40}px`;
            missIndicator.style.top = `${e.clientY - gameArea.getBoundingClientRect().top - 40}px`;
            
            // Hide miss indicator after a short delay
            setTimeout(() => {
                missIndicator.style.display = 'none';
            }, 500);
            
            // Flash the misses counter
            missesElement.parentElement.classList.add('flash');
            setTimeout(() => {
                missesElement.parentElement.classList.remove('flash');
            }, 500);
            
            if (misses >= maxMisses) {
                endGame();
            }
        }
    });
    
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
        
        // Add click handler
        mouse.addEventListener('click', (e) => {
            if (!gameActive) return;
            
            // Prevent the click from registering as a miss
            e.stopPropagation();
            
            // Increase score
            score++;
            scoreElement.textContent = score;
            
            // Make mouse fade out
            mouse.classList.add('fade-out');
            
            // Remove mouse after animation
            setTimeout(() => {
                mouse.remove();
                activeMouseCount--;
            }, 500);
        });
        
        // Add to game area
        gameArea.appendChild(mouse);
        
        // Start mouse movement
        moveMouse(mouse, dx, dy);
        
        // Remove mouse after random time if not clicked
        const lifespan = Math.random() * 3000 + 2000; // 2-5 seconds
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
