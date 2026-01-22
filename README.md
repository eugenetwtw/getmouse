# 🐭 GetMouse - Mouse Catching Game

A fun and interactive browser-based game where you catch moving mice before they escape! Test your reflexes and hand-eye coordination in this fast-paced clicking challenge.

## 🎮 Game Overview

**GetMouse** is a simple yet addictive web game built with vanilla JavaScript. Players must click on randomly moving mice to score points while avoiding misses. The game features dynamic mouse movement with physics-based bouncing, making each playthrough unique and challenging.

## ✨ Features

- 🎯 **Click-to-Catch Gameplay** - Click on moving mice to score points
- 🏃 **Dynamic Movement** - Mice move in random directions and bounce off walls
- 📊 **Score Tracking** - Keep track of your successful catches
- ❌ **Miss Counter** - Three strikes and you're out!
- 🔄 **Auto-Respawn** - New mice continuously spawn during gameplay
- 💫 **Smooth Animations** - Fade-out effects and visual feedback
- 🎨 **Clean UI** - Minimalist design with clear game information
- 🔁 **Restart Function** - Play again instantly after game over

## 🕹️ How to Play

1. **Objective**: Click on as many mice as possible to increase your score
2. **Scoring**: Each successful click on a mouse = +1 point
3. **Misses**: Clicking empty space (missing a mouse) = +1 miss
4. **Game Over**: Accumulate 3 misses and the game ends
5. **Restart**: Click "Play Again" to start a new game

### Game Mechanics

- **Mouse Behavior**:
  - Up to 5 mice can appear on screen simultaneously
  - Each mouse moves at a random speed and direction
  - Mice bounce off the game area boundaries
  - Mice automatically disappear after 2-5 seconds if not caught
  - Mouse sprite flips based on movement direction

- **Difficulty**:
  - New mice spawn every second
  - Mouse speed ranges from 2 to 5 pixels per frame
  - Active mouse count is limited to 5 concurrent mice

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installations required!

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/eugenetwtw/getmouse.git
   ```

2. Navigate to the project directory:
   ```bash
   cd getmouse
   ```

3. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

   Or simply double-click the `index.html` file.

### Alternative: Live Server

For development, you can use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
getmouse/
├── index.html      # Main HTML structure
├── game.js         # Game logic and mechanics (206 lines)
├── style.css       # Styling and animations
├── mouse.svg       # Mouse sprite (currently using emoji)
└── README.md       # Project documentation
```

## 🛠️ Technical Details

### Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Styling, animations, and transitions
- **Vanilla JavaScript** - Game logic with no frameworks
- **DOM Manipulation** - Dynamic element creation and updates
- **requestAnimationFrame** - Smooth 60 FPS animations

### Key Code Components

- **Game State Management**: Score tracking, miss counting, game active status
- **Spawn System**: Interval-based mouse spawning with max limit
- **Movement System**: Physics-based movement with boundary collision
- **Event Handling**: Click detection for catches and misses
- **Animation System**: CSS transitions and keyframe animations

### Game Configuration (Customizable)

```javascript
maxMisses = 3;              // Maximum allowed misses
mouseSpeed.min = 2;         // Minimum mouse speed
mouseSpeed.max = 5;         // Maximum mouse speed
mouseSpawnInterval = 1000;  // Spawn delay in milliseconds
maxMice = 5;                // Max concurrent mice on screen
```

## 🎨 Customization

You can easily customize the game by modifying:

- **Game Area Size**: Edit `.game-container` in `style.css` (currently 800x600px)
- **Mouse Appearance**: Replace the 🐭 emoji in `style.css` or use the `mouse.svg` file
- **Colors**: Modify the color scheme in `style.css`
- **Difficulty**: Adjust game settings in `game.js` (lines 24-30)

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] High score leaderboard with localStorage
- [ ] Sound effects for catches and misses
- [ ] Power-ups (slow motion, freeze, bonus points)
- [ ] Different mouse types with varying speeds/points
- [ ] Mobile touch support optimization
- [ ] Combo system for consecutive catches
- [ ] Time-based challenge mode

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational and personal use.

## 🎓 Learning Resources

This project demonstrates:

- DOM manipulation and event handling
- Game loop implementation with `requestAnimationFrame`
- Collision detection (boundary checking)
- CSS animations and transitions
- State management in vanilla JavaScript
- Event propagation and `stopPropagation()`

Perfect for beginners learning web development and game programming concepts!

---

**Enjoy catching mice! 🐭✨**