import React, { useState } from 'react';
import './App.css';
import soundManager from './utils/soundManager';

// Import all games
import LetterPacMan from './games/LetterPacMan';
import SyllableSlider from './games/SyllableSlider';
import WordBuilder from './games/WordBuilder';
import RhymeTime from './games/RhymeTime';
import LetterJumble from './games/LetterJumble';
import SoundMatcher from './games/SoundMatcher';
import WordRace from './games/WordRace';
import SpellingBee from './games/SpellingBee';
import LetterCatcher from './games/LetterCatcher';
import WordSearchAdventure from './games/WordSearchAdventure';
import InitialSoundSafari from './games/InitialSoundSafari';
import PhonemeBlender from './games/PhonemeBlender';
import SyllableCounter from './games/SyllableCounter';
import MinimalPairsMatch from './games/MinimalPairsMatch';
import ConsonantClusterQuest from './games/ConsonantClusterQuest';
import CVCBuilder from './games/CVCBuilder';

// German games
import ArtikelArcade from './games/ArtikelArcade';
import PluralPacMan from './games/PluralPacMan';
import VerbKonjugationQuest from './games/VerbKonjugationQuest';
import KompositaConstructor from './games/KompositaConstructor';
import TrennbareVerben from './games/TrennbareVerben';
import WortschatzWhack from './games/WortschatzWhack';
import IdiomIsland from './games/IdiomIsland';
import UmlautsAdventure from './games/UmlautsAdventure';
import ModalverbenMission from './games/ModalverbenMission';
import SynonymeAntonymeMatch from './games/SynonymeAntonymeMatch';
import DiminutivDesigner from './games/DiminutivDesigner';
import PerfektTenseRace from './games/PerfektTenseRace';

const App = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const games = [
    // Original 10 games
    {
      id: 'pacman',
      name: 'Letter Pac-Man',
      description: 'Navigate maze and collect letters to spell words!',
      icon: '👾',
      component: LetterPacMan,
      category: 'spelling'
    },
    {
      id: 'syllable-slider',
      name: 'Syllable Slider',
      description: 'Drag syllables together to build words!',
      icon: '🧩',
      component: SyllableSlider,
      category: 'syllables'
    },
    {
      id: 'word-builder',
      name: 'Word Builder',
      description: 'Click letters in order to spell words!',
      icon: '🔨',
      component: WordBuilder,
      category: 'spelling'
    },
    {
      id: 'rhyme-time',
      name: 'Rhyme Time',
      description: 'Match words that rhyme together!',
      icon: '🎵',
      component: RhymeTime,
      category: 'phonics'
    },
    {
      id: 'letter-jumble',
      name: 'Letter Jumble',
      description: 'Unscramble letters to form words!',
      icon: '🔄',
      component: LetterJumble,
      category: 'spelling'
    },
    {
      id: 'sound-matcher',
      name: 'Sound Matcher',
      description: 'Match letters to their sounds!',
      icon: '🔊',
      component: SoundMatcher,
      category: 'phonics'
    },
    {
      id: 'word-race',
      name: 'Word Race',
      description: 'Type words before time runs out!',
      icon: '⚡',
      component: WordRace,
      category: 'spelling'
    },
    {
      id: 'spelling-bee',
      name: 'Spelling Bee',
      description: 'Listen and spell words correctly!',
      icon: '🐝',
      component: SpellingBee,
      category: 'spelling'
    },
    {
      id: 'letter-catcher',
      name: 'Letter Catcher',
      description: 'Catch falling letters to spell words!',
      icon: '🧺',
      component: LetterCatcher,
      category: 'spelling'
    },
    {
      id: 'word-search',
      name: 'Word Search Adventure',
      description: 'Find hidden words in the grid!',
      icon: '🔍',
      component: WordSearchAdventure,
      category: 'reading'
    },

    // Logopedia games
    {
      id: 'initial-sound',
      name: 'Initial Sound Safari',
      description: 'Find words with the same beginning sound!',
      icon: '🦁',
      component: InitialSoundSafari,
      category: 'phonics'
    },
    {
      id: 'phoneme-blender',
      name: 'Phoneme Blender',
      description: 'Blend sounds together to make words!',
      icon: '🌪️',
      component: PhonemeBlender,
      category: 'phonics'
    },
    {
      id: 'syllable-counter',
      name: 'Syllable Counter',
      description: 'Count the syllables in words!',
      icon: '👏',
      component: SyllableCounter,
      category: 'syllables'
    },
    {
      id: 'minimal-pairs',
      name: 'Minimal Pairs Match',
      description: 'Hear the difference between similar sounds!',
      icon: '👂',
      component: MinimalPairsMatch,
      category: 'phonics'
    },
    {
      id: 'consonant-cluster',
      name: 'Consonant Cluster Quest',
      description: 'Practice words with blends!',
      icon: '⚔️',
      component: ConsonantClusterQuest,
      category: 'phonics'
    },
    {
      id: 'cvc-builder',
      name: 'CVC Builder',
      description: 'Build consonant-vowel-consonant words!',
      icon: '🏗️',
      component: CVCBuilder,
      category: 'spelling'
    },

    // German Language Games
    {
      id: 'artikel-arcade',
      name: 'Artikel Arcade',
      description: 'Master German articles: der, die, das!',
      icon: '🎮',
      component: ArtikelArcade,
      category: 'german'
    },
    {
      id: 'plural-pacman',
      name: 'Plural Pac-Man',
      description: 'Collect German plurals in a maze!',
      icon: '👾',
      component: PluralPacMan,
      category: 'german'
    },
    {
      id: 'verb-konjugation',
      name: 'Verb Konjugation Quest',
      description: 'Conjugate German verbs correctly!',
      icon: '⚔️',
      component: VerbKonjugationQuest,
      category: 'german'
    },
    {
      id: 'komposita',
      name: 'Komposita Constructor',
      description: 'Build German compound words!',
      icon: '🏗️',
      component: KompositaConstructor,
      category: 'german'
    },
    {
      id: 'trennbare-verben',
      name: 'Trennbare Verben',
      description: 'Separate German prefix verbs!',
      icon: '🔀',
      component: TrennbareVerben,
      category: 'german'
    },
    {
      id: 'wortschatz-whack',
      name: 'Wortschatz Whack-a-Mole',
      description: 'Learn German vocabulary categories!',
      icon: '🔨',
      component: WortschatzWhack,
      category: 'german'
    },
    {
      id: 'idiom-island',
      name: 'Idiom Island',
      description: 'Master German idioms and expressions!',
      icon: '🏝️',
      component: IdiomIsland,
      category: 'german'
    },
    {
      id: 'umlauts-adventure',
      name: 'Umlauts Adventure',
      description: 'Practice ä, ö, ü in German words!',
      icon: '⛰️',
      component: UmlautsAdventure,
      category: 'german'
    },
    {
      id: 'modalverben',
      name: 'Modalverben Mission',
      description: 'Use German modal verbs correctly!',
      icon: '🎯',
      component: ModalverbenMission,
      category: 'german'
    },
    {
      id: 'synonyme-antonyme',
      name: 'Synonyme & Antonyme Match',
      description: 'Match German synonyms and antonyms!',
      icon: '🎭',
      component: SynonymeAntonymeMatch,
      category: 'german'
    },
    {
      id: 'diminutiv',
      name: 'Diminutiv Designer',
      description: 'Create German diminutives with -chen and -lein!',
      icon: '🎨',
      component: DiminutivDesigner,
      category: 'german'
    },
    {
      id: 'perfekt-tense',
      name: 'Perfekt Tense Race',
      description: 'Form German perfect tense quickly!',
      icon: '⚡',
      component: PerfektTenseRace,
      category: 'german'
    }
  ];

  const categories = {
    all: 'All Games',
    spelling: '✏️ Spelling',
    phonics: '🔊 Phonics',
    syllables: '👏 Syllables',
    reading: '📖 Reading',
    german: '🇩🇪 Deutsch'
  };

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGames = selectedCategory === 'all'
    ? games
    : games.filter(g => g.category === selectedCategory);

  const toggleSound = () => {
    const enabled = soundManager.toggle();
    setSoundEnabled(enabled);
    soundManager.playClick();
  };

  if (currentGame) {
    const GameComponent = currentGame.component;
    return <GameComponent onBack={() => setCurrentGame(null)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-emoji">🎮</span>
          Kids Spelling & German Language Games
          <span className="title-emoji">🇩🇪</span>
        </h1>
        <p className="app-subtitle">28 Interactive Games: English Phonics + German Language Learning!</p>

        <button className="sound-toggle" onClick={toggleSound}>
          {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </header>

      <div className="category-filter">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(key);
              soundManager.playClick();
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="games-grid">
        {filteredGames.map(game => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => {
              setCurrentGame(game);
              soundManager.playClick();
            }}
          >
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-name">{game.name}</h3>
            <p className="game-description">{game.description}</p>
            <div className="play-button">Play Now!</div>
          </button>
        ))}
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ for learning | {games.length} games available</p>
      </footer>
    </div>
  );
};

export default App;
