// Comprehensive German word database for advanced language learning games

export const germanNouns = {
  masculine: [
    { word: 'Tisch', translation: 'table' },
    { word: 'Stuhl', translation: 'chair' },
    { word: 'Hund', translation: 'dog' },
    { word: 'Baum', translation: 'tree' },
    { word: 'Berg', translation: 'mountain' },
    { word: 'Fluss', translation: 'river' },
    { word: 'Apfel', translation: 'apple' },
    { word: 'Teller', translation: 'plate' },
    { word: 'Löffel', translation: 'spoon' },
    { word: 'Computer', translation: 'computer' },
    { word: 'Vogel', translation: 'bird' },
    { word: 'Fisch', translation: 'fish' },
    { word: 'Ball', translation: 'ball' },
    { word: 'Garten', translation: 'garden' },
    { word: 'Himmel', translation: 'sky' }
  ],
  feminine: [
    { word: 'Katze', translation: 'cat' },
    { word: 'Blume', translation: 'flower' },
    { word: 'Tür', translation: 'door' },
    { word: 'Lampe', translation: 'lamp' },
    { word: 'Tasche', translation: 'bag' },
    { word: 'Sonne', translation: 'sun' },
    { word: 'Straße', translation: 'street' },
    { word: 'Milch', translation: 'milk' },
    { word: 'Maus', translation: 'mouse' },
    { word: 'Uhr', translation: 'clock' },
    { word: 'Frau', translation: 'woman' },
    { word: 'Stadt', translation: 'city' },
    { word: 'Wiese', translation: 'meadow' },
    { word: 'Brücke', translation: 'bridge' },
    { word: 'Küche', translation: 'kitchen' }
  ],
  neuter: [
    { word: 'Haus', translation: 'house' },
    { word: 'Auto', translation: 'car' },
    { word: 'Kind', translation: 'child' },
    { word: 'Buch', translation: 'book' },
    { word: 'Fenster', translation: 'window' },
    { word: 'Bett', translation: 'bed' },
    { word: 'Wasser', translation: 'water' },
    { word: 'Brot', translation: 'bread' },
    { word: 'Ei', translation: 'egg' },
    { word: 'Glas', translation: 'glass' },
    { word: 'Pferd', translation: 'horse' },
    { word: 'Meer', translation: 'sea' },
    { word: 'Schiff', translation: 'ship' },
    { word: 'Zimmer', translation: 'room' },
    { word: 'Tier', translation: 'animal' }
  ]
};

export const germanVerbs = [
  { infinitive: 'spielen', translation: 'to play', ich: 'spiele', du: 'spielst', er: 'spielt', wir: 'spielen', ihr: 'spielt', sie: 'spielen', partizip: 'gespielt', haben: true },
  { infinitive: 'laufen', translation: 'to run', ich: 'laufe', du: 'läufst', er: 'läuft', wir: 'laufen', ihr: 'lauft', sie: 'laufen', partizip: 'gelaufen', haben: false },
  { infinitive: 'essen', translation: 'to eat', ich: 'esse', du: 'isst', er: 'isst', wir: 'essen', ihr: 'esst', sie: 'essen', partizip: 'gegessen', haben: true },
  { infinitive: 'trinken', translation: 'to drink', ich: 'trinke', du: 'trinkst', er: 'trinkt', wir: 'trinken', ihr: 'trinkt', sie: 'trinken', partizip: 'getrunken', haben: true },
  { infinitive: 'gehen', translation: 'to go', ich: 'gehe', du: 'gehst', er: 'geht', wir: 'gehen', ihr: 'geht', sie: 'gehen', partizip: 'gegangen', haben: false },
  { infinitive: 'kommen', translation: 'to come', ich: 'komme', du: 'kommst', er: 'kommt', wir: 'kommen', ihr: 'kommt', sie: 'kommen', partizip: 'gekommen', haben: false },
  { infinitive: 'sehen', translation: 'to see', ich: 'sehe', du: 'siehst', er: 'sieht', wir: 'sehen', ihr: 'seht', sie: 'sehen', partizip: 'gesehen', haben: true },
  { infinitive: 'haben', translation: 'to have', ich: 'habe', du: 'hast', er: 'hat', wir: 'haben', ihr: 'habt', sie: 'haben', partizip: 'gehabt', haben: true },
  { infinitive: 'sein', translation: 'to be', ich: 'bin', du: 'bist', er: 'ist', wir: 'sind', ihr: 'seid', sie: 'sind', partizip: 'gewesen', haben: false },
  { infinitive: 'machen', translation: 'to do/make', ich: 'mache', du: 'machst', er: 'macht', wir: 'machen', ihr: 'macht', sie: 'machen', partizip: 'gemacht', haben: true }
];

export const separableVerbs = [
  { verb: 'aufstehen', prefix: 'auf', stem: 'stehen', translation: 'to get up', ich: 'stehe auf', partizip: 'aufgestanden' },
  { verb: 'anrufen', prefix: 'an', stem: 'rufen', translation: 'to call', ich: 'rufe an', partizip: 'angerufen' },
  { verb: 'einkaufen', prefix: 'ein', stem: 'kaufen', translation: 'to shop', ich: 'kaufe ein', partizip: 'eingekauft' },
  { verb: 'fernsehen', prefix: 'fern', stem: 'sehen', translation: 'to watch TV', ich: 'sehe fern', partizip: 'ferngesehen' },
  { verb: 'mitkommen', prefix: 'mit', stem: 'kommen', translation: 'to come along', ich: 'komme mit', partizip: 'mitgekommen' },
  { verb: 'zurückkommen', prefix: 'zurück', stem: 'kommen', translation: 'to come back', ich: 'komme zurück', partizip: 'zurückgekommen' },
  { verb: 'abfahren', prefix: 'ab', stem: 'fahren', translation: 'to depart', ich: 'fahre ab', partizip: 'abgefahren' },
  { verb: 'anfangen', prefix: 'an', stem: 'fangen', translation: 'to begin', ich: 'fange an', partizip: 'angefangen' },
  { verb: 'aufmachen', prefix: 'auf', stem: 'machen', translation: 'to open', ich: 'mache auf', partizip: 'aufgemacht' },
  { verb: 'zumachen', prefix: 'zu', stem: 'machen', translation: 'to close', ich: 'mache zu', partizip: 'zugemacht' }
];

export const prepositions = {
  akkusativ: [
    { prep: 'durch', translation: 'through' },
    { prep: 'für', translation: 'for' },
    { prep: 'gegen', translation: 'against' },
    { prep: 'ohne', translation: 'without' },
    { prep: 'um', translation: 'around' }
  ],
  dativ: [
    { prep: 'aus', translation: 'from/out of' },
    { prep: 'bei', translation: 'at/near' },
    { prep: 'mit', translation: 'with' },
    { prep: 'nach', translation: 'after/to' },
    { prep: 'von', translation: 'from/of' },
    { prep: 'zu', translation: 'to' }
  ],
  wechsel: [
    { prep: 'an', translation: 'at/on', akkWhen: 'motion', datWhen: 'location' },
    { prep: 'auf', translation: 'on', akkWhen: 'motion', datWhen: 'location' },
    { prep: 'in', translation: 'in', akkWhen: 'motion', datWhen: 'location' },
    { prep: 'über', translation: 'over', akkWhen: 'motion', datWhen: 'location' },
    { prep: 'unter', translation: 'under', akkWhen: 'motion', datWhen: 'location' }
  ]
};

export const modalVerbs = [
  { infinitive: 'können', translation: 'can/to be able to', ich: 'kann', du: 'kannst', er: 'kann', wir: 'können', ihr: 'könnt', sie: 'können' },
  { infinitive: 'müssen', translation: 'must/to have to', ich: 'muss', du: 'musst', er: 'muss', wir: 'müssen', ihr: 'müsst', sie: 'müssen' },
  { infinitive: 'wollen', translation: 'to want to', ich: 'will', du: 'willst', er: 'will', wir: 'wollen', ihr: 'wollt', sie: 'wollen' },
  { infinitive: 'sollen', translation: 'should/to be supposed to', ich: 'soll', du: 'sollst', er: 'soll', wir: 'sollen', ihr: 'sollt', sie: 'sollen' },
  { infinitive: 'dürfen', translation: 'may/to be allowed to', ich: 'darf', du: 'darfst', er: 'darf', wir: 'dürfen', ihr: 'dürft', sie: 'dürfen' },
  { infinitive: 'mögen', translation: 'to like', ich: 'mag', du: 'magst', er: 'mag', wir: 'mögen', ihr: 'mögt', sie: 'mögen' }
];

export const plurals = [
  { singular: 'Hund', plural: 'Hunde', pattern: '-e' },
  { singular: 'Katze', plural: 'Katzen', pattern: '-n' },
  { singular: 'Auto', plural: 'Autos', pattern: '-s' },
  { singular: 'Kind', plural: 'Kinder', pattern: '-er' },
  { singular: 'Buch', plural: 'Bücher', pattern: 'umlaut + -er' },
  { singular: 'Haus', plural: 'Häuser', pattern: 'umlaut + -er' },
  { singular: 'Apfel', plural: 'Äpfel', pattern: 'umlaut' },
  { singular: 'Mutter', plural: 'Mütter', pattern: 'umlaut' },
  { singular: 'Vater', plural: 'Väter', pattern: 'umlaut' },
  { singular: 'Tisch', plural: 'Tische', pattern: '-e' },
  { singular: 'Frau', plural: 'Frauen', pattern: '-en' },
  { singular: 'Mann', plural: 'Männer', pattern: 'umlaut + -er' },
  { singular: 'Bruder', plural: 'Brüder', pattern: 'umlaut' },
  { singular: 'Schwester', plural: 'Schwestern', pattern: '-n' },
  { singular: 'Fenster', plural: 'Fenster', pattern: 'no change' }
];

export const compoundWords = [
  { parts: ['Haus', 'Tür'], compound: 'Haustür', translation: 'front door' },
  { parts: ['Schul', 'Hof'], compound: 'Schulhof', translation: 'schoolyard' },
  { parts: ['Sonnen', 'Brille'], compound: 'Sonnenbrille', translation: 'sunglasses' },
  { parts: ['Hand', 'Schuh'], compound: 'Handschuh', translation: 'glove' },
  { parts: ['Kinder', 'Garten'], compound: 'Kindergarten', translation: 'kindergarten' },
  { parts: ['Feuer', 'Wehr'], compound: 'Feuerwehr', translation: 'fire department' },
  { parts: ['Geburts', 'Tag'], compound: 'Geburtstag', translation: 'birthday' },
  { parts: ['Flug', 'Zeug'], compound: 'Flugzeug', translation: 'airplane' },
  { parts: ['Zimmer', 'Tür'], compound: 'Zimmertür', translation: 'room door' },
  { parts: ['Telefon', 'Nummer'], compound: 'Telefonnummer', translation: 'phone number' },
  { parts: ['Brief', 'Kasten'], compound: 'Briefkasten', translation: 'mailbox' },
  { parts: ['Blumen', 'Topf'], compound: 'Blumentopf', translation: 'flower pot' },
  { parts: ['Apfel', 'Kuchen'], compound: 'Apfelkuchen', translation: 'apple cake' },
  { parts: ['Fußball', 'Spiel'], compound: 'Fußballspiel', translation: 'soccer game' },
  { parts: ['Wasser', 'Flasche'], compound: 'Wasserflasche', translation: 'water bottle' }
];

export const adjectives = [
  { base: 'groß', translation: 'big', comparative: 'größer', superlative: 'größte' },
  { base: 'klein', translation: 'small', comparative: 'kleiner', superlative: 'kleinste' },
  { base: 'gut', translation: 'good', comparative: 'besser', superlative: 'beste' },
  { base: 'schlecht', translation: 'bad', comparative: 'schlechter', superlative: 'schlechteste' },
  { base: 'schön', translation: 'beautiful', comparative: 'schöner', superlative: 'schönste' },
  { base: 'alt', translation: 'old', comparative: 'älter', superlative: 'älteste' },
  { base: 'jung', translation: 'young', comparative: 'jünger', superlative: 'jüngste' },
  { base: 'schnell', translation: 'fast', comparative: 'schneller', superlative: 'schnellste' },
  { base: 'langsam', translation: 'slow', comparative: 'langsamer', superlative: 'langsamste' },
  { base: 'warm', translation: 'warm', comparative: 'wärmer', superlative: 'wärmste' },
  { base: 'kalt', translation: 'cold', comparative: 'kälter', superlative: 'kälteste' }
];

export const idioms = [
  { idiom: 'Daumen drücken', literal: 'press thumbs', meaning: 'wish good luck', english: 'cross fingers' },
  { idiom: 'Schwein haben', literal: 'have pig', meaning: 'be lucky', english: 'be lucky' },
  { idiom: 'Tomaten auf den Augen haben', literal: 'have tomatoes on eyes', meaning: 'not see obvious', english: 'be blind to obvious' },
  { idiom: 'ins kalte Wasser springen', literal: 'jump in cold water', meaning: 'take the plunge', english: 'dive right in' },
  { idiom: 'die Katze aus dem Sack lassen', literal: 'let cat out of bag', meaning: 'reveal secret', english: 'let the cat out of the bag' },
  { idiom: 'Hals- und Beinbruch', literal: 'neck and leg break', meaning: 'good luck', english: 'break a leg' },
  { idiom: 'auf Wolke sieben schweben', literal: 'float on cloud seven', meaning: 'be very happy', english: 'on cloud nine' },
  { idiom: 'zwei Fliegen mit einer Klappe schlagen', literal: 'hit two flies with one swatter', meaning: 'accomplish two things at once', english: 'kill two birds with one stone' },
  { idiom: 'jemandem die Daumen halten', literal: 'hold thumbs for someone', meaning: 'wish luck', english: 'keep fingers crossed' },
  { idiom: 'Ich verstehe nur Bahnhof', literal: 'I only understand train station', meaning: "don't understand", english: "it's all Greek to me" }
];

export const synonymsAntonyms = {
  synonyms: [
    { word1: 'groß', word2: 'riesig', meaning: 'big/huge' },
    { word1: 'klein', word2: 'winzig', meaning: 'small/tiny' },
    { word1: 'schön', word2: 'hübsch', meaning: 'beautiful/pretty' },
    { word1: 'schnell', word2: 'rasch', meaning: 'fast/quick' },
    { word1: 'sprechen', word2: 'reden', meaning: 'speak/talk' },
    { word1: 'Kind', word2: 'Junge', meaning: 'child/boy' },
    { word1: 'Haus', word2: 'Gebäude', meaning: 'house/building' }
  ],
  antonyms: [
    { word1: 'groß', word2: 'klein', meaning: 'big/small' },
    { word1: 'alt', word2: 'jung', meaning: 'old/young' },
    { word1: 'warm', word2: 'kalt', meaning: 'warm/cold' },
    { word1: 'gut', word2: 'schlecht', meaning: 'good/bad' },
    { word1: 'Tag', word2: 'Nacht', meaning: 'day/night' },
    { word1: 'hell', word2: 'dunkel', meaning: 'bright/dark' },
    { word1: 'oben', word2: 'unten', meaning: 'up/down' }
  ]
};

export const umlautWords = [
  { without: 'schon', with: 'schön', translation: 'already/beautiful' },
  { without: 'Mutter', with: 'Mütter', translation: 'mother/mothers' },
  { without: 'Vater', with: 'Väter', translation: 'father/fathers' },
  { without: 'Bruder', with: 'Brüder', translation: 'brother/brothers' },
  { without: 'Apfel', with: 'Äpfel', translation: 'apple/apples' },
  { without: 'Haus', with: 'Häuser', translation: 'house/houses' },
  { without: 'Buch', with: 'Bücher', translation: 'book/books' },
  { without: 'konnen', with: 'können', translation: 'can' },
  { without: 'mussen', with: 'müssen', translation: 'must' },
  { without: 'uber', with: 'über', translation: 'over/about' }
];

export const verbRektion = [
  { verb: 'warten', preposition: 'auf', case: 'Akkusativ', example: 'warten auf den Bus', translation: 'wait for the bus' },
  { verb: 'denken', preposition: 'an', case: 'Akkusativ', example: 'denken an dich', translation: 'think of you' },
  { verb: 'sprechen', preposition: 'über', case: 'Akkusativ', example: 'sprechen über das Wetter', translation: 'talk about the weather' },
  { verb: 'träumen', preposition: 'von', case: 'Dativ', example: 'träumen von dir', translation: 'dream of you' },
  { verb: 'helfen', preposition: 'bei', case: 'Dativ', example: 'helfen bei den Hausaufgaben', translation: 'help with homework' },
  { verb: 'sich freuen', preposition: 'auf', case: 'Akkusativ', example: 'sich freuen auf den Urlaub', translation: 'look forward to vacation' },
  { verb: 'sich interessieren', preposition: 'für', case: 'Akkusativ', example: 'sich interessieren für Musik', translation: 'be interested in music' },
  { verb: 'achten', preposition: 'auf', case: 'Akkusativ', example: 'achten auf die Zeit', translation: 'pay attention to time' }
];

export const diminutives = [
  { base: 'Katze', chen: 'Kätzchen', lein: 'Kätzlein', translation: 'cat/kitten' },
  { base: 'Hund', chen: 'Hündchen', lein: 'Hündlein', translation: 'dog/puppy' },
  { base: 'Haus', chen: 'Häuschen', lein: 'Häuslein', translation: 'house/little house' },
  { base: 'Buch', chen: 'Büchlein', lein: 'Büchlein', translation: 'book/booklet' },
  { base: 'Kind', chen: 'Kindchen', lein: 'Kindlein', translation: 'child/little child' },
  { base: 'Tisch', chen: 'Tischchen', lein: 'Tischlein', translation: 'table/little table' },
  { base: 'Baum', chen: 'Bäumchen', lein: 'Bäumlein', translation: 'tree/little tree' },
  { base: 'Blume', chen: 'Blümchen', lein: 'Blümlein', translation: 'flower/little flower' }
];

export const wordCategories = {
  Tiere: ['Hund', 'Katze', 'Vogel', 'Fisch', 'Pferd', 'Maus', 'Schwein', 'Kuh'],
  Essen: ['Brot', 'Käse', 'Wurst', 'Apfel', 'Milch', 'Ei', 'Kuchen', 'Suppe'],
  Farben: ['rot', 'blau', 'grün', 'gelb', 'schwarz', 'weiß', 'braun', 'orange'],
  Körper: ['Kopf', 'Hand', 'Fuß', 'Auge', 'Nase', 'Mund', 'Ohr', 'Bein'],
  Kleidung: ['Hose', 'Hemd', 'Kleid', 'Schuh', 'Socke', 'Hut', 'Jacke', 'Rock'],
  Möbel: ['Tisch', 'Stuhl', 'Bett', 'Schrank', 'Sofa', 'Regal', 'Lampe', 'Spiegel']
};
