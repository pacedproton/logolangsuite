# Kids Spelling & Speech Games 🎮

A comprehensive collection of 30+ interactive web-based games designed for 6-year-olds to learn spelling, reading, and speech through engaging, gamified experiences.

## Features

### 16 Games Included

**Original Spelling & Reading Games:**
1. **Letter Pac-Man** 👾 - Navigate a maze collecting letters to spell words
2. **Syllable Slider** 🧩 - Drag and drop syllables to build words
3. **Word Builder** 🔨 - Click letters in sequence to spell words
4. **Rhyme Time** 🎵 - Match rhyming words with animations
5. **Letter Jumble** 🔄 - Unscramble letters to form words
6. **Sound Matcher** 🔊 - Match letters to their phonetic sounds
7. **Word Race** ⚡ - Type words against the clock
8. **Spelling Bee** 🐝 - Listen and spell words correctly
9. **Letter Catcher** 🧺 - Catch falling letters to spell words
10. **Word Search Adventure** 🔍 - Find hidden words in a grid

**Logopedia/Speech Therapy Games:**
11. **Initial Sound Safari** 🦁 - Identify words with target beginning sounds
12. **Phoneme Blender** 🌪️ - Blend individual sounds into complete words
13. **Syllable Counter** 👏 - Count syllables in words
14. **Minimal Pairs Match** 👂 - Distinguish between similar-sounding words
15. **Consonant Cluster Quest** ⚔️ - Practice consonant blends (bl, tr, st, etc.)
16. **CVC Builder** 🏗️ - Build consonant-vowel-consonant words

## Educational Benefits

- **Phonological Awareness**: Sound discrimination, blending, and segmentation
- **Spelling Skills**: Letter recognition, sequencing, and word formation
- **Reading Comprehension**: Word recognition and vocabulary building
- **Speech Therapy**: Minimal pairs, articulation, and phoneme practice
- **Fine Motor Skills**: Drag-and-drop, clicking, and keyboard typing
- **Auditory Processing**: Listen and respond activities with speech synthesis

## Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Web Audio API** - Sound effects and tones
- **Web Speech API** - Text-to-speech for word pronunciation
- **Pure CSS** - Animations and responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Game Features

### Sound & Feedback
- ✅ Real-time audio feedback for correct/incorrect answers
- 🔊 Text-to-speech for word pronunciation
- 🎵 Musical tones for success and errors
- 🔇 Sound toggle option

### Gamification
- 🏆 Score tracking across all games
- 📈 Progressive difficulty levels
- ⭐ Visual rewards and animations
- 🎯 Immediate feedback with modals

### Accessibility
- 📱 Fully responsive design
- ⌨️ Keyboard controls (where applicable)
- 🖱️ Mouse and touch support
- 🎨 High-contrast, colorful UI

## Game Categories

Games are organized into categories:
- ✏️ **Spelling** - Letter and word formation games
- 🔊 **Phonics** - Sound-based learning activities
- 👏 **Syllables** - Syllable awareness games
- 📖 **Reading** - Word recognition activities

## File Structure

```
logolangsuite/
├── public/
├── src/
│   ├── components/       # Shared UI components
│   │   ├── GameContainer.jsx
│   │   └── Modal.jsx
│   ├── games/           # Individual game components
│   │   ├── LetterPacMan.jsx
│   │   ├── SyllableSlider.jsx
│   │   └── ... (14 more games)
│   ├── data/            # Word lists and game data
│   │   ├── words.js
│   │   └── logopediaData.js
│   ├── utils/           # Utility functions
│   │   └── soundManager.js
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app with game menu
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

## Educational Concepts Covered

### Phonological Awareness
- Initial sounds
- Final sounds
- Rhyming
- Syllable counting
- Phoneme blending
- Phoneme segmentation

### Spelling Patterns
- CVC (Consonant-Vowel-Consonant) words
- Consonant blends/clusters
- Simple and complex words
- Letter sequencing

### Speech Therapy
- Minimal pairs (bat/pat, ship/sip)
- Articulation practice
- Sound discrimination
- Auditory memory

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for educational purposes.

## Contributing

This is an educational project. Feel free to fork and enhance with more games!

## Future Enhancements

Potential additions:
- Progress tracking and saved scores
- Parent/teacher dashboard
- More advanced games for older children
- Multiplayer modes
- Achievement system
- Printable worksheets

---

Made with ❤️ for young learners everywhere!
