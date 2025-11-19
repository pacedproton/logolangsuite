// Word lists organized by difficulty and learning concepts
export const wordData = {
  // Simple CVC (Consonant-Vowel-Consonant) words
  easy: [
    'cat', 'dog', 'hat', 'bat', 'rat', 'mat', 'sat', 'pat',
    'bed', 'red', 'led', 'fed', 'wed',
    'big', 'dig', 'fig', 'pig', 'wig',
    'hot', 'pot', 'dot', 'got', 'lot', 'not',
    'sun', 'fun', 'run', 'bun', 'gun',
    'can', 'fan', 'man', 'pan', 'ran', 'tan', 'van',
    'cup', 'pup', 'up',
    'fox', 'box', 'ox',
    'hen', 'pen', 'ten', 'den',
    'log', 'fog', 'hog', 'jog'
  ],

  // Words with blends and digraphs
  medium: [
    'ship', 'shop', 'shut', 'shed', 'shell',
    'chip', 'chop', 'chat', 'chin', 'chess',
    'this', 'that', 'them', 'then', 'thin',
    'frog', 'flag', 'flat', 'flip', 'flow',
    'tree', 'trip', 'trap', 'truck', 'track',
    'star', 'step', 'stop', 'stick', 'stone',
    'swim', 'swing', 'sweet', 'swell',
    'drum', 'drop', 'dress', 'draw', 'drink',
    'clap', 'clip', 'clock', 'cloud', 'clown',
    'play', 'plus', 'plug', 'plan', 'plant'
  ],

  // Longer words with multiple syllables
  hard: [
    'rabbit', 'kitten', 'chicken', 'monkey', 'tiger',
    'apple', 'banana', 'orange', 'lemon', 'mango',
    'happy', 'funny', 'silly', 'pretty', 'lucky',
    'number', 'letter', 'button', 'window', 'castle',
    'rainbow', 'sunshine', 'butterfly', 'ladybug', 'dragonfly',
    'garden', 'rocket', 'planet', 'robot', 'dragon',
    'pizza', 'cookie', 'candy', 'cupcake', 'popcorn',
    'music', 'magic', 'super', 'hero', 'power'
  ],

  // Rhyming word pairs for matching games
  rhymes: [
    ['cat', 'hat', 'bat', 'mat', 'rat'],
    ['dog', 'frog', 'log', 'fog', 'hog'],
    ['sun', 'fun', 'run', 'bun'],
    ['big', 'pig', 'dig', 'wig'],
    ['red', 'bed', 'fed', 'led'],
    ['box', 'fox', 'ox'],
    ['bee', 'tree', 'free', 'three'],
    ['rain', 'train', 'brain', 'chain'],
    ['light', 'night', 'bright', 'fight'],
    ['star', 'car', 'far', 'jar']
  ],

  // Syllable breakdown for syllable games
  syllables: {
    'butterfly': ['but', 'ter', 'fly'],
    'dinosaur': ['di', 'no', 'saur'],
    'elephant': ['el', 'e', 'phant'],
    'computer': ['com', 'pu', 'ter'],
    'calendar': ['cal', 'en', 'dar'],
    'together': ['to', 'geth', 'er'],
    'important': ['im', 'por', 'tant'],
    'wonderful': ['won', 'der', 'ful'],
    'hamburger': ['ham', 'bur', 'ger'],
    'basketball': ['bas', 'ket', 'ball'],
    'unicorn': ['u', 'ni', 'corn'],
    'rainbow': ['rain', 'bow'],
    'sunshine': ['sun', 'shine'],
    'playground': ['play', 'ground'],
    'snowman': ['snow', 'man']
  }
};

// Get random word from difficulty level
export const getRandomWord = (difficulty = 'easy') => {
  const words = wordData[difficulty];
  return words[Math.floor(Math.random() * words.length)];
};

// Get random word set
export const getRandomWords = (difficulty = 'easy', count = 5) => {
  const words = [...wordData[difficulty]];
  const selected = [];
  for (let i = 0; i < count && words.length > 0; i++) {
    const index = Math.floor(Math.random() * words.length);
    selected.push(words.splice(index, 1)[0]);
  }
  return selected;
};

// Get rhyme group
export const getRandomRhymeGroup = () => {
  const groups = wordData.rhymes;
  return groups[Math.floor(Math.random() * groups.length)];
};

// Get random syllable word
export const getRandomSyllableWord = () => {
  const words = Object.keys(wordData.syllables);
  const word = words[Math.floor(Math.random() * words.length)];
  return {
    word,
    syllables: wordData.syllables[word]
  };
};
