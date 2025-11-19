// Enhanced data for speech therapy games

export const minimalPairs = [
  { pair: ['BAT', 'PAT'], focus: 'b/p' },
  { pair: ['CAT', 'HAT'], focus: 'c/h' },
  { pair: ['SIP', 'SHIP'], focus: 's/sh' },
  { pair: ['TIN', 'THIN'], focus: 't/th' },
  { pair: ['FAN', 'VAN'], focus: 'f/v' },
  { pair: ['GOAT', 'COAT'], focus: 'g/c' },
  { pair: ['CHAIR', 'SHARE'], focus: 'ch/sh' },
  { pair: ['RAKE', 'LAKE'], focus: 'r/l' },
  { pair: ['PEAR', 'BEAR'], focus: 'p/b' },
  { pair: ['DEN', 'TEN'], focus: 'd/t' }
];

export const consonantClusters = {
  'bl': ['BLUE', 'BLACK', 'BLOCK', 'BLOW'],
  'br': ['BROWN', 'BREAD', 'BRING', 'BRICK'],
  'cl': ['CLAP', 'CLEAN', 'CLOCK', 'CLOSE'],
  'cr': ['CRAB', 'CREAM', 'CROSS', 'CROWN'],
  'dr': ['DRAW', 'DRUM', 'DRINK', 'DROP'],
  'fl': ['FLAG', 'FLAT', 'FLIP', 'FLOW'],
  'fr': ['FROG', 'FRESH', 'FRUIT', 'FROM'],
  'gl': ['GLAD', 'GLASS', 'GLUE', 'GLOW'],
  'gr': ['GRAPE', 'GRASS', 'GREEN', 'GROW'],
  'pl': ['PLAY', 'PLANT', 'PLUG', 'PLUS'],
  'pr': ['PRAY', 'PRESS', 'PRIZE', 'PROP'],
  'sc': ['SCAT', 'SCOOP', 'SCORE', 'SCOUT'],
  'sk': ['SKATE', 'SKIP', 'SKIN', 'SKY'],
  'sl': ['SLAM', 'SLEEP', 'SLIP', 'SLOW'],
  'sm': ['SMALL', 'SMART', 'SMILE', 'SMOKE'],
  'sn': ['SNAP', 'SNAIL', 'SNAKE', 'SNOW'],
  'sp': ['SPACE', 'SPEAK', 'SPIN', 'SPOT'],
  'st': ['STAR', 'STEP', 'STOP', 'STORE'],
  'sw': ['SWAP', 'SWEEP', 'SWEET', 'SWIM'],
  'tr': ['TRACK', 'TRAIN', 'TREE', 'TRIP'],
  'tw': ['TWELVE', 'TWIN', 'TWIST', 'TWO']
};

export const vowelSounds = {
  short: {
    'a': ['CAT', 'HAT', 'BAT', 'MAT', 'RAT'],
    'e': ['BED', 'RED', 'PET', 'WET', 'NET'],
    'i': ['BIG', 'DIG', 'PIG', 'SIT', 'HIT'],
    'o': ['HOT', 'POT', 'DOT', 'NOT', 'GOT'],
    'u': ['CUP', 'PUP', 'SUN', 'RUN', 'FUN']
  },
  long: {
    'a': ['CAKE', 'MAKE', 'TAKE', 'GATE', 'LATE'],
    'e': ['TREE', 'BEE', 'SEE', 'FEET', 'MEET'],
    'i': ['BIKE', 'LIKE', 'KITE', 'FIVE', 'NINE'],
    'o': ['BONE', 'CONE', 'HOPE', 'ROPE', 'ROSE'],
    'u': ['CUBE', 'CUTE', 'HUGE', 'MULE', 'TUNE']
  }
};

export const onsetRime = [
  { onset: 'c', rime: 'at', word: 'CAT' },
  { onset: 'b', rime: 'at', word: 'BAT' },
  { onset: 'h', rime: 'at', word: 'HAT' },
  { onset: 'm', rime: 'at', word: 'MAT' },
  { onset: 's', rime: 'un', word: 'SUN' },
  { onset: 'r', rime: 'un', word: 'RUN' },
  { onset: 'f', rime: 'un', word: 'FUN' },
  { onset: 'b', rime: 'un', word: 'BUN' },
  { onset: 'd', rime: 'og', word: 'DOG' },
  { onset: 'l', rime: 'og', word: 'LOG' },
  { onset: 'f', rime: 'og', word: 'FOG' },
  { onset: 'b', rime: 'ig', word: 'BIG' },
  { onset: 'd', rime: 'ig', word: 'DIG' },
  { onset: 'p', rime: 'ig', word: 'PIG' },
  { onset: 'w', rime: 'ig', word: 'WIG' }
];

export const phonemeSegments = {
  'CAT': ['C', 'A', 'T'],
  'DOG': ['D', 'O', 'G'],
  'SUN': ['S', 'U', 'N'],
  'BED': ['B', 'E', 'D'],
  'PIG': ['P', 'I', 'G'],
  'HAT': ['H', 'A', 'T'],
  'RUN': ['R', 'U', 'N'],
  'BUS': ['B', 'U', 'S'],
  'FAN': ['F', 'A', 'N'],
  'MOP': ['M', 'O', 'P'],
  'SHIP': ['SH', 'I', 'P'],
  'CHIN': ['CH', 'I', 'N'],
  'FISH': ['F', 'I', 'SH'],
  'DUCK': ['D', 'U', 'CK'],
  'FROG': ['F', 'R', 'O', 'G'],
  'SLIP': ['S', 'L', 'I', 'P'],
  'SNAP': ['S', 'N', 'A', 'P']
};

export const alliterationSets = [
  ['BIG', 'BEAR', 'BALL', 'BIKE'],
  ['CAT', 'CAKE', 'CUP', 'CAR'],
  ['DOG', 'DUCK', 'DOOR', 'DESK'],
  ['FISH', 'FIVE', 'FOOT', 'FORK'],
  ['GOAT', 'GAME', 'GATE', 'GIFT'],
  ['HAT', 'HAND', 'HORSE', 'HOUSE'],
  ['LION', 'LEAF', 'LAMP', 'LOCK'],
  ['MOON', 'MOUSE', 'MILK', 'MAP'],
  ['PIG', 'PEN', 'PARK', 'PIZZA'],
  ['SUN', 'SOCK', 'STAR', 'SNAKE']
];

export const cvcWords = {
  beginConsonants: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'Z'],
  midVowels: ['A', 'E', 'I', 'O', 'U'],
  endConsonants: ['B', 'D', 'G', 'K', 'M', 'N', 'P', 'T', 'X'],
  validWords: [
    'BAT', 'BED', 'BIG', 'BOX', 'BUG', 'BUS',
    'CAB', 'CAT', 'CUP', 'CUT',
    'DAD', 'DIG', 'DOG', 'DOT',
    'FAN', 'FAT', 'FIG', 'FIN', 'FIT', 'FUN',
    'GAP', 'GAS', 'GET', 'GOT', 'GUM',
    'HAM', 'HAT', 'HEN', 'HIM', 'HIT', 'HOT', 'HUG',
    'JAM', 'JAR', 'JET', 'JOB', 'JOG',
    'KIT',
    'LAP', 'LEG', 'LET', 'LID', 'LIP', 'LOG', 'LOT',
    'MAD', 'MAN', 'MAP', 'MAT', 'MEN', 'MET', 'MIX', 'MOP', 'MUD', 'MUG',
    'NAP', 'NET', 'NIT', 'NOD', 'NOT', 'NUT',
    'PAN', 'PAT', 'PEG', 'PEN', 'PET', 'PIG', 'PIN', 'PIT', 'POT', 'PUP',
    'RAG', 'RAN', 'RAT', 'RED', 'RIG', 'RIP', 'ROD', 'ROT', 'RUB', 'RUG', 'RUN',
    'SAT', 'SET', 'SIT', 'SIX', 'SUN',
    'TAB', 'TAG', 'TAN', 'TAP', 'TEN', 'TIP', 'TOP', 'TUB', 'TUG',
    'VAN', 'VET',
    'WAG', 'WEB', 'WET', 'WIG', 'WIN',
    'ZAP', 'ZIP'
  ]
};
