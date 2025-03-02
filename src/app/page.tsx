"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const destinations = [
  {
    alias: "dst1",
    name: "Paris",
    clues: [
      "Home to a famous tower finished in 1889",
      "Called the City of Light",
    ],
    funFacts: [
      "The Louvre is the world's largest art museum.",
      "Famous for café culture and haute cuisine.",
    ],
  },
  {
    alias: "dst2",
    name: "Tokyo",
    clues: [
      "Capital city with over 13 million residents",
      "Known for high-tech, anime, and cherry blossoms",
    ],
    funFacts: [
      "It's the most populous metropolitan area in the world.",
      "Tsukiji once was the world's largest fish market.",
    ],
  },
  {
    alias: "dst3",
    name: "Rome",
    clues: [
      "City built on seven hills",
      "Home to the Colosseum and Vatican City",
    ],
    funFacts: [
      "Contains the smallest country in the world within its borders.",
      "People throw about €1.5 million into the Trevi Fountain annually.",
    ],
  },
  {
    alias: "dst4",
    name: "New York City",
    clues: [
      "Contains a famous park designed by Frederick Law Olmsted",
      "Known as 'The Big Apple'",
    ],
    funFacts: [
      "More than 800 languages are spoken here, making it the most linguistically diverse city in the world.",
      "The subway system has 472 stations, the most of any system globally.",
    ],
  },
  {
    alias: "dst5",
    name: "London",
    clues: [
      "City traversed by the River Thames",
      "Home to Buckingham Palace and Big Ben",
    ],
    funFacts: [
      "The London Underground is the oldest underground railway network in the world.",
      "Has more than 170 museums, many of which are free to visit.",
    ],
  },
  {
    alias: "dst6",
    name: "Sydney",
    clues: [
      "Famous harbor city with a distinctive opera house",
      "Largest city in Australia",
    ],
    funFacts: [
      "The Sydney Harbour Bridge is nicknamed 'The Coathanger' due to its arch-based design.",
      "Bondi Beach is one of the most famous beaches in the world.",
    ],
  },
  {
    alias: "dst7",
    name: "Cairo",
    clues: [
      "Capital city located near ancient pyramids",
      "Situated along the Nile River",
    ],
    funFacts: [
      "The city's name means 'The Victorious' in Arabic.",
      "Home to Al-Azhar University, one of the oldest universities in the world, founded in 970 CE.",
    ],
  },
  {
    alias: "dst8",
    name: "Rio de Janeiro",
    clues: [
      "City with a giant Christ statue overlooking it",
      "Famous for its Carnival celebration",
    ],
    funFacts: [
      "The name means 'January River' although there is no actual river there.",
      "Copacabana Beach stretches for 4 kilometers and is one of the most famous beaches in the world.",
    ],
  },
  {
    alias: "dst9",
    name: "Barcelona",
    clues: [
      "City known for Gaudí's distinctive architecture",
      "Capital of Catalonia region",
    ],
    funFacts: [
      "La Sagrada Familia has been under construction since 1882 and is not expected to be completed until 2026.",
      "Has over 20 Michelin-starred restaurants.",
    ],
  },
  {
    alias: "dst10",
    name: "Venice",
    clues: [
      "City built on more than 100 small islands",
      "Famous for its canals and gondolas",
    ],
    funFacts: [
      "Has no roads, just canals and over 400 bridges.",
      "The entire city is listed as a UNESCO World Heritage Site.",
    ],
  },
  {
    alias: "dst11",
    name: "Dubai",
    clues: [
      "Home to the world's tallest building",
      "Desert city known for luxury shopping",
    ],
    funFacts: [
      "Only about 15% of its residents are native Emiratis.",
      "Has the world's largest choreographed fountain system at Dubai Mall.",
    ],
  },
  {
    alias: "dst12",
    name: "Bangkok",
    clues: [
      "Capital city with ornate shrines and vibrant street life",
      "Known for floating markets and tuk-tuks",
    ],
    funFacts: [
      "The full ceremonial name of Bangkok is the longest city name in the world at 168 letters.",
      "Home to more than 400 Buddhist temples.",
    ],
  },
  {
    alias: "dst13",
    name: "Istanbul",
    clues: [
      "City spanning two continents",
      "Former capital of three major empires",
    ],
    funFacts: [
      "The Grand Bazaar is one of the oldest and largest covered markets in the world with over 4,000 shops.",
      "The city was previously known as Byzantium and Constantinople.",
    ],
  },
  {
    alias: "dst14",
    name: "Prague",
    clues: [
      "City known as 'The City of a Hundred Spires'",
      "Home to a famous medieval astronomical clock",
    ],
    funFacts: [
      "Prague Castle is the largest ancient castle complex in the world.",
      "The city's historic center has been a UNESCO World Heritage site since 1992.",
    ],
  },
  {
    alias: "dst15",
    name: "Amsterdam",
    clues: [
      "City with more than 100 kilometers of canals",
      "Known for bicycles and tulips",
    ],
    funFacts: [
      "Has more bicycles than residents, with approximately 881,000 bikes for 821,000 people.",
      "Built entirely on wooden poles driven into the ground, as much of it is below sea level.",
    ],
  },
  {
    alias: "dst16",
    name: "Kyoto",
    clues: [
      "Former imperial capital of Japan",
      "Known for traditional wooden houses and geishas",
    ],
    funFacts: [
      "Home to over 1,600 Buddhist temples and 400 Shinto shrines.",
      "Was removed from the atomic bomb target list during WWII due to its cultural significance.",
    ],
  },
  {
    alias: "dst17",
    name: "San Francisco",
    clues: [
      "Hilly city known for a famous red bridge",
      "Home to cable cars and Victorian houses",
    ],
    funFacts: [
      "The Golden Gate Bridge was the longest suspension bridge in the world when it opened in 1937.",
      "The city's famous sourdough bread is unique due to a local strain of bacteria found only there.",
    ],
  },
  {
    alias: "dst18",
    name: "Marrakech",
    clues: [
      "City with a large medina and famous souks",
      "Known for its red buildings and walls",
    ],
    funFacts: [
      "Djemaa el-Fna square transforms from a market during the day to an open-air dining area at night.",
      "The city's name comes from Berber words meaning 'Land of God.'",
    ],
  },
  {
    alias: "dst19",
    name: "Hong Kong",
    clues: [
      "City with one of the world's most recognizable skylines",
      "Known for its harbor and dense skyscrapers",
    ],
    funFacts: [
      "Has more skyscrapers than any other city in the world.",
      "The Star Ferry has been carrying passengers across Victoria Harbour since 1888.",
    ],
  },
  {
    alias: "dst20",
    name: "Singapore",
    clues: [
      "Island city-state near the equator",
      "Known for cleanliness and modern architecture",
    ],
    funFacts: [
      "Chewing gum is banned to keep the city clean.",
      "Gardens by the Bay features 18 'Supertrees' that are vertical gardens up to 50 meters tall.",
    ],
  },
  {
    alias: "dst21",
    name: "Mexico City",
    clues: [
      "Built on the ruins of an ancient Aztec city",
      "One of the largest cities in the Americas",
    ],
    funFacts: [
      "The city is slowly sinking at a rate of about 10 cm per year.",
      "Has the most museums of any city in the world, with over 150.",
    ],
  },
  {
    alias: "dst22",
    name: "Berlin",
    clues: [
      "City once divided by a famous wall",
      "Known for its vibrant arts scene and nightlife",
    ],
    funFacts: [
      "Has more bridges than Venice, with approximately 1,700 bridges.",
      "The Berlin Zoo is the most visited zoo in Europe, with over 20,000 animals.",
    ],
  },
  {
    alias: "dst23",
    name: "Jerusalem",
    clues: [
      "Ancient city sacred to three major religions",
      "Home to the Western Wall and Dome of the Rock",
    ],
    funFacts: [
      "Has been destroyed and rebuilt at least 44 times throughout history.",
      "The Old City is divided into four quarters: Jewish, Muslim, Christian, and Armenian.",
    ],
  },
  {
    alias: "dst24",
    name: "Buenos Aires",
    clues: [
      "South American capital known for tango",
      "Called the 'Paris of South America'",
    ],
    funFacts: [
      "Home to the widest avenue in the world, 9 de Julio Avenue, with 16 lanes.",
      "El Ateneo Grand Splendid is a bookstore in a converted century-old theater.",
    ],
  },
  {
    alias: "dst25",
    name: "Cape Town",
    clues: [
      "City at the southern tip of Africa",
      "Overlooked by Table Mountain",
    ],
    funFacts: [
      "Home to the world's smallest floral kingdom, the Cape Floral Kingdom.",
      "The Castle of Good Hope is the oldest colonial building in South Africa, built in the 1600s.",
    ],
  },
  {
    alias: "dst26",
    name: "Seoul",
    clues: [
      "Capital city famous for K-pop and technology",
      "Blends ancient palaces with futuristic skyscrapers",
    ],
    funFacts: [
      "The Seoul subway has free Wi-Fi and cell service throughout the entire system.",
      "Gangnam became world-famous after the song 'Gangnam Style' but was already one of the most affluent districts.",
    ],
  },
  {
    alias: "dst27",
    name: "Vienna",
    clues: [
      "City of music, home to Mozart and Beethoven",
      "Known for grand palaces and coffee culture",
    ],
    funFacts: [
      "The Vienna State Opera hosts over 350 performances each year.",
      "The city's Central Cemetery has more than 2.5 million tombs, more than the city's living population.",
    ],
  },
  {
    alias: "dst28",
    name: "Havana",
    clues: [
      "Capital city known for vintage cars and colonial architecture",
      "Famous for its cigars and rum",
    ],
    funFacts: [
      "Old Havana (Habana Vieja) is a UNESCO World Heritage site with over 900 preserved historical buildings.",
      "The Malecón is a 5-mile seawall and roadway that serves as a popular social gathering place.",
    ],
  },
  {
    alias: "dst29",
    name: "Moscow",
    clues: [
      "City with colorful onion domes in its skyline",
      "Home to the Kremlin and Red Square",
    ],
    funFacts: [
      "The Moscow Metro is one of the deepest subway systems in the world and is famous for its ornate stations.",
      "The city has the most billionaire residents in the world, according to some counts.",
    ],
  },
  {
    alias: "dst30",
    name: "Athens",
    clues: [
      "Capital city dominated by ancient ruins",
      "Birthplace of democracy and Western philosophy",
    ],
    funFacts: [
      "Has been continuously inhabited for over 7,000 years.",
      "The Acropolis was built in the 5th century BCE and has survived wars, invasions, and natural disasters.",
    ],
  },
  {
    alias: "dst31",
    name: "Mumbai",
    clues: [
      "India's largest city, formerly known as Bombay",
      "Home to Bollywood and the Gateway of India",
    ],
    funFacts: [
      "Dharavi is one of the largest slums in Asia but also a thriving business center with an annual turnover of over $1 billion.",
      "The city's dabbawalas deliver over 200,000 home-cooked lunches daily with remarkable accuracy.",
    ],
  },
  {
    alias: "dst32",
    name: "Cusco",
    clues: ["Ancient capital of the Inca Empire", "Gateway to Machu Picchu"],
    funFacts: [
      "The city was designed in the shape of a puma, a sacred animal to the Incas.",
      "Many buildings in Cusco sit on original Incan stone foundations that have survived numerous earthquakes.",
    ],
  },
  {
    alias: "dst33",
    name: "Santorini",
    clues: [
      "Greek island with iconic white and blue buildings",
      "Built on the rim of an active volcano",
    ],
    funFacts: [
      "The island's official name is Thira, with Santorini being its Italian-given name.",
      "Some believe it to be the location of the lost city of Atlantis.",
    ],
  },
  {
    alias: "dst34",
    name: "Quebec City",
    clues: [
      "Only walled city in North America north of Mexico",
      "Known for its French heritage and Château Frontenac",
    ],
    funFacts: [
      "Old Quebec is a UNESCO World Heritage site founded in 1608, making it one of the oldest European settlements in North America.",
      "Hosts the world's largest winter carnival, featuring impressive ice sculptures.",
    ],
  },
  {
    alias: "dst35",
    name: "Petra",
    clues: [
      "Ancient city carved into rose-colored rock",
      "Featured in 'Indiana Jones and the Last Crusade'",
    ],
    funFacts: [
      "Was 'lost' to the Western world for hundreds of years until discovered by a Swiss explorer in 1812.",
      "Only about 15% of the ancient city has been excavated, with much still hidden underground.",
    ],
  },
  {
    alias: "dst36",
    name: "Dubrovnik",
    clues: [
      "Walled city on the Adriatic Sea",
      "Filming location for 'Game of Thrones'",
    ],
    funFacts: [
      "The city walls are 1,940 meters long and up to 25 meters high, completely surrounding the old city.",
      "Was an independent republic called Ragusa for over 450 years, which rivaled Venice in maritime trade.",
    ],
  },
  {
    alias: "dst37",
    name: "Machu Picchu",
    clues: [
      "15th-century Incan citadel set high in the Andes",
      "One of the New Seven Wonders of the World",
    ],
    funFacts: [
      "Its existence was known only to locals until American historian Hiram Bingham brought it to international attention in 1911.",
      "The site contains over 150 buildings ranging from baths and houses to temples and sanctuaries.",
    ],
  },
  {
    alias: "dst38",
    name: "Edinburgh",
    clues: [
      "Scottish capital built on seven hills",
      "Known for its medieval Old Town and Georgian New Town",
    ],
    funFacts: [
      "The Edinburgh Fringe Festival is the world's largest arts festival, with thousands of performances.",
      "Has more listed buildings than anywhere in the world.",
    ],
  },
  {
    alias: "dst39",
    name: "Vancouver",
    clues: [
      "Coastal city surrounded by mountains",
      "Consistently ranked as one of the world's most livable cities",
    ],
    funFacts: [
      "Stanley Park is larger than New York's Central Park at 1,001 acres.",
      "Greenpeace was founded in Vancouver in 1971.",
    ],
  },
  {
    alias: "dst40",
    name: "Bali",
    clues: [
      "Indonesian island known for its forested volcanic mountains",
      "Famous for yoga retreats and rice terraces",
    ],
    funFacts: [
      "Follows a unique form of Hinduism that combines aspects of Buddhism and ancient indigenous beliefs.",
      "Has a unique calendar system with 210 days in a year.",
    ],
  },
  {
    alias: "dst41",
    name: "Florence",
    clues: [
      "Birthplace of the Renaissance",
      "Home to Michelangelo's David and the Uffizi Gallery",
    ],
    funFacts: [
      "The Ponte Vecchio bridge survived WWII bombing because Hitler reportedly thought it was too beautiful to destroy.",
      "The city was the capital of Italy from 1865 to 1871.",
    ],
  },
  {
    alias: "dst42",
    name: "New Orleans",
    clues: [
      "City known for jazz, Creole cuisine, and Mardi Gras",
      "Features French and Spanish colonial architecture",
    ],
    funFacts: [
      "The city's above-ground cemeteries are called 'Cities of the Dead' due to the ornate tombs.",
      "Was founded by the French, ruled by the Spanish, and purchased by the U.S. as part of the Louisiana Purchase.",
    ],
  },
  {
    alias: "dst43",
    name: "Reykjavik",
    clues: [
      "World's northernmost capital of a sovereign state",
      "Powered almost entirely by geothermal energy",
    ],
    funFacts: [
      "The name means 'Smoky Bay' due to the steam rising from its hot springs.",
      "Almost 100% of Iceland's electricity comes from renewable sources, with much of Reykjavik heated by geothermal water.",
    ],
  },
  {
    alias: "dst44",
    name: "Zanzibar",
    clues: [
      "Archipelago known for its spice trade history",
      "Features Stone Town, a UNESCO World Heritage site",
    ],
    funFacts: [
      "Birthplace of Freddie Mercury, lead singer of Queen.",
      "Once the world's largest producer of cloves.",
    ],
  },
  {
    alias: "dst45",
    name: "Shanghai",
    clues: [
      "China's largest city and global financial hub",
      "Known for its futuristic skyline and colonial architecture",
    ],
    funFacts: [
      "The Shanghai Tower is the tallest building in China and the second-tallest in the world.",
      "The name Shanghai means 'Upon-the-Sea' in Chinese.",
    ],
  },
  {
    alias: "dst46",
    name: "Angkor Wat",
    clues: [
      "Largest religious monument in the world",
      "Ancient temple complex in Cambodia",
    ],
    funFacts: [
      "Appears on the Cambodian national flag, the only national flag to feature a building.",
      "Was originally constructed as a Hindu temple dedicated to Vishnu before being converted to a Buddhist temple.",
    ],
  },
  {
    alias: "dst47",
    name: "Chichén Itzá",
    clues: [
      "Pre-Columbian city built by the Maya civilization",
      "Famous for its stepped pyramid El Castillo",
    ],
    funFacts: [
      "During the spring and fall equinoxes, the sun casts a shadow on El Castillo that gives the appearance of a serpent slithering down the staircase.",
      "The name means 'At the mouth of the well of the Itza' in Yucatec Maya.",
    ],
  },
  {
    alias: "dst48",
    name: "Queenstown",
    clues: [
      "Adventure capital of New Zealand",
      "Located on the shores of Lake Wakatipu",
    ],
    funFacts: [
      "Commercial bungee jumping was pioneered here in 1988.",
      "The town was named Queenstown because it was 'fit for Queen Victoria.'",
    ],
  },
  {
    alias: "dst49",
    name: "Lisbon",
    clues: [
      "City of seven hills overlooking the Tagus River",
      "Known for its pastel-colored buildings and vintage trams",
    ],
    funFacts: [
      "Survived one of history's most powerful earthquakes in 1755, which led to the birth of modern seismology.",
      "The Vasco da Gama Bridge is the longest bridge in Europe at nearly 11 miles long.",
    ],
  },
  {
    alias: "dst50",
    name: "Copenhagen",
    clues: [
      "City known for its bicycles and colorful harbor",
      "Home to The Little Mermaid statue",
    ],
    funFacts: [
      "Tivoli Gardens is one of the oldest operating amusement parks in the world, opening in 1843.",
      "More than 50% of residents commute by bicycle daily.",
    ],
  },
  {
    alias: "dst51",
    name: "Kathmandu",
    clues: [
      "Capital city in the Himalayan valley",
      "Gateway to Mount Everest and the Himalayas",
    ],
    funFacts: [
      "Durbar Square contains over 50 temples and is a UNESCO World Heritage site.",
      "The city has the densest concentration of UNESCO World Heritage Sites of any capital city.",
    ],
  },
  {
    alias: "dst52",
    name: "Bruges",
    clues: [
      "Medieval city with preserved cobbled streets and canals",
      "Known as the 'Venice of the North'",
    ],
    funFacts: [
      "The entire historic center is a UNESCO World Heritage site.",
      "Has more than 80 bridges crossing its many canals.",
    ],
  },
  {
    alias: "dst53",
    name: "Casablanca",
    clues: [
      "Largest city in Morocco",
      "Home to the Hassan II Mosque with the world's tallest minaret",
    ],
    funFacts: [
      "Despite the famous film 'Casablanca,' none of the movie was actually filmed there.",
      "The Hassan II Mosque has a glass floor where worshippers can pray directly over the sea.",
    ],
  },
  {
    alias: "dst54",
    name: "San Diego",
    clues: [
      "Southern California city known for perfect weather",
      "Home to one of the world's most famous zoos",
    ],
    funFacts: [
      "Has the most farms of any city in the United States.",
      "Balboa Park is larger than both New York's Central Park and San Francisco's Golden Gate Park.",
    ],
  },
  {
    alias: "dst55",
    name: "Tallinn",
    clues: [
      "Medieval walled capital of Estonia",
      "One of the best-preserved Hanseatic town centers in the world",
    ],
    funFacts: [
      "First city to adopt free public transportation for its residents.",
      "Town Hall Square has been the center of the city since the 13th century.",
    ],
  },
  {
    alias: "dst56",
    name: "Tulum",
    clues: [
      "Ancient Mayan walled city perched on a cliff",
      "Only major Mayan city built on the coast",
    ],
    funFacts: [
      "One of the last cities built and inhabited by the Maya.",
      "The name originally meant 'wall' in the Yucatec Mayan language.",
    ],
  },
  {
    alias: "dst57",
    name: "Auckland",
    clues: [
      "New Zealand's largest city built on volcanic fields",
      "Known as the 'City of Sails'",
    ],
    funFacts: [
      "Built on approximately 48 volcanic cones, many of which are still considered active.",
      "Has the largest Polynesian population of any city in the world.",
    ],
  },
  {
    alias: "dst58",
    name: "Krakow",
    clues: [
      "Former capital of Poland with a well-preserved medieval core",
      "Home to one of Europe's oldest universities",
    ],
    funFacts: [
      "The main square, Rynek Główny, is the largest medieval town square in Europe.",
      "Legend says the city was founded on the defeat of a dragon.",
    ],
  },
  {
    alias: "dst59",
    name: "Monaco",
    clues: [
      "Second-smallest country in the world",
      "Known for its casino and Formula 1 race",
    ],
    funFacts: [
      "Could fit into Central Park nearly 2.5 times.",
      "Has the highest population density of any country and the lowest unemployment rate.",
    ],
  },
  {
    alias: "dst60",
    name: "Luang Prabang",
    clues: [
      "Ancient royal capital of Laos",
      "Known for its Buddhist temples and colonial architecture",
    ],
    funFacts: [
      "Every morning, hundreds of monks walk through the streets collecting alms in a tradition dating back centuries.",
      "The entire town is a UNESCO World Heritage site.",
    ],
  },
  {
    alias: "dst61",
    name: "Cartagena",
    clues: [
      "Colombian port city with colorful colonial architecture",
      "Surrounded by historic stone walls",
    ],
    funFacts: [
      "The walls took 200 years to complete and were built to protect the city from pirate attacks.",
      "Many scenes from the movie 'Romancing the Stone' were set here, although they were actually filmed in Mexico.",
    ],
  },
  {
    alias: "dst62",
    name: "Ljubljana",
    clues: [
      "Slovenia's capital with a car-free city center",
      "Known for its dragon bridges and riverside cafes",
    ],
    funFacts: [
      "The name is derived from 'ljubljena,' meaning 'beloved' in Slovenian.",
      "Almost 75% of the city is green spaces, one of the highest percentages in Europe.",
    ],
  },
  {
    alias: "dst63",
    name: "Stockholm",
    clues: ["Capital built across 14 islands", "Known as 'Beauty on Water'"],
    funFacts: [
      "The Stockholm subway system is known as the world's longest art gallery, with unique designs in each station.",
      "The Nobel Prize ceremony is held here annually on December 10th.",
    ],
  },
  {
    alias: "dst64",
    name: "Kyiv",
    clues: [
      "One of Eastern Europe's oldest cities",
      "Known for golden-domed churches and Slavic heritage",
    ],
    funFacts: [
      "Home to the deepest metro station in the world, Arsenalna, at 105.5 meters underground.",
      "Kyiv's Independence Square (Maidan Nezalezhnosti) has been the site of three revolutions.",
    ],
  },
  {
    alias: "dst65",
    name: "Varanasi",
    clues: [
      "One of the world's oldest continuously inhabited cities",
      "Sacred city along the Ganges River",
    ],
    funFacts: [
      "Mark Twain once said: 'Banaras is older than history, older than tradition, older even than legend.'",
      "There are over 2,000 temples within the city.",
    ],
  },
  {
    alias: "dst66",
    name: "Dublin",
    clues: [
      "Irish capital famous for its literary heritage",
      "Home to Trinity College and the Book of Kells",
    ],
    funFacts: [
      "The Guinness Storehouse is Ireland's most visited tourist attraction.",
      "The city has produced four Nobel Prize winners for literature: Yeats, Shaw, Beckett, and Heaney.",
    ],
  },
  {
    alias: "dst67",
    name: "Hanoi",
    clues: [
      "Vietnam's capital with French colonial architecture",
      "Known for its Old Quarter and street food",
    ],
    funFacts: [
      "The city celebrated its 1,000-year anniversary in 2010.",
      "Hoan Kiem Lake contains a rare species of giant softshell turtle that is nearly extinct.",
    ],
  },
  {
    alias: "dst68",
    name: "Cambridge",
    clues: [
      "Historic university city in England",
      "Known for punting on the River Cam",
    ],
    funFacts: [
      "The university library has over 8 million items, including Newton's personal copy of Principia with his handwritten notes.",
      "DNA's double helix structure was discovered here by Watson and Crick in 1953.",
    ],
  },
  {
    alias: "dst69",
    name: "Salzburg",
    clues: [
      "Austrian city where Mozart was born",
      "Setting for 'The Sound of Music'",
    ],
    funFacts: [
      "The Salzburg Festival is one of the world's most prestigious music and drama festivals.",
      "The name Salzburg means 'Salt Castle,' referring to the toll collected on salt barges.",
    ],
  },
  {
    alias: "dst70",
    name: "Fez",
    clues: [
      "Medieval city with the world's oldest university",
      "Known for its ancient medina and tanneries",
    ],
    funFacts: [
      "The medina of Fez contains over 9,000 narrow streets and alleys.",
      "The University of Al Quaraouiyine, founded in 859 CE, is the oldest continuously operating university in the world.",
    ],
  },
  {
    alias: "dst71",
    name: "Cairo",
    clues: [
      "Egypt's capital with a mix of ancient and modern architecture",
      "Known for its pyramids and Sphinx",
    ],
    funFacts: [
      "The Great Sphinx of Giza is the largest monolithic statue in the world.",
      "The Egyptian pyramids are the only one of the Seven Wonders of the Ancient World still standing.",
    ],
  },
];

interface GameState {
  currentDestination: (typeof destinations)[0] | null;
  selectedClues: string[];
  options: string[];
  score: {
    correct: number;
    total: number;
  };
  answered: boolean;
  isCorrect: boolean | null;
}

const CONFETTI_CONFIG = {
  particleCount: 500,
  spread: 100,
  origin: { x: 0.5, y: 0.5 },
  colors: ["#FFFF00", "#FF0000", "#00FF00", "#0000FF"],
};

export default function Home() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [username, setUsername] = useState("");
  const [inviterScore, setInviterScore] = useState<{
    username: string;
    correct: number;
    total: number;
  } | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    currentDestination: null,
    selectedClues: [],
    options: [],
    score: {
      correct: 0,
      total: 0,
    },
    answered: false,
    isCorrect: null,
  });

  const generateOptions = (correctAnswer: string): string[] => {
    const allDestinations = destinations.map((d) => d.name);
    const shuffled = allDestinations
      .filter((name) => name !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [...shuffled, correctAnswer].sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const randomDest =
      destinations[Math.floor(Math.random() * destinations.length)];

    setGameState({
      currentDestination: randomDest,
      selectedClues: randomDest.clues,
      options: generateOptions(randomDest.name),
      score: gameState.score,
      answered: false,
      isCorrect: null,
    });
  };

  const retryCurrentRound = () => {
    if (!gameState.currentDestination) return;

    setGameState({
      ...gameState,
      answered: false,
      isCorrect: null,
    });
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (gameState.answered) return;

    const isCorrect = selectedAnswer === gameState.currentDestination?.name;

    if (isCorrect) {
      confetti(CONFETTI_CONFIG);
    }

    setGameState((prev) => ({
      ...prev,
      answered: true,
      isCorrect,
      score: {
        correct: prev.score.correct + (isCorrect ? 1 : 0),
        total: prev.score.total + 1,
      },
    }));
  };

  useEffect(() => {
    // Check for invitation parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviterUsername = urlParams.get("username");
    const inviterCorrect = urlParams.get("correct");
    const inviterTotal = urlParams.get("total");

    if (inviterUsername && inviterCorrect && inviterTotal) {
      setInviterScore({
        username: inviterUsername,
        correct: parseInt(inviterCorrect),
        total: parseInt(inviterTotal),
      });
    }

    startNewRound();
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      username: username,
      correct: gameState.score.correct.toString(),
      total: gameState.score.total.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const shareToWhatsApp = () => {
    if (!username.trim()) return;

    const shareUrl = generateShareLink();
    const message = `Hey! I'm ${username} and I'm challenging you to beat my GlobeTrotter score of ${gameState.score.correct}/${gameState.score.total}! Try here: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowShareModal(false);
  };

  // Add this function to handle copying
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Could add a toast notification here
        console.log("Link copied!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#f0e7ff] via-white to-[#f0e7ff] flex flex-col">
      <div className="max-w-4xl w-full mx-auto px-4 py-4 flex flex-col h-full">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-[#5d1eb5] mb-2">
            ✈️ GlobeTrotter
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <span className="text-[#666] font-medium">Score:</span>
              <span className="text-[#5d1eb5] font-bold text-lg">
                {gameState.score.correct}
              </span>
              <span className="text-[#666]">/</span>
              <span className="text-[#666]">{gameState.score.total}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="px-4 py-2 text-black bg-white rounded-full shadow-md text-[#5d1eb5] font-medium hover:bg-[#f8f9fa] transition-colors flex items-center gap-2"
            >
              <span>🤝</span>
              Challenge Friends
            </motion.button>
          </div>
          {inviterScore && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-[#666]"
            >
              {inviterScore.username} challenged you to beat{" "}
              {inviterScore.correct}/{inviterScore.total}!
            </motion.p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 flex-1 border border-[#e5e7eb] flex flex-col">
          <div className="space-y-3 mb-4">
            <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">
              Where am I? 🤔
            </h2>
            {gameState.selectedClues.map((clue, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-[#f8f9fa] to-white rounded-lg text-[#1a1a1a] border border-[#e5e7eb] shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌍</span>
                  <p className="text-base">{clue}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {gameState.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={gameState.answered}
                className={`p-4 rounded-lg text-center transition-all duration-200
                  ${
                    gameState.answered
                      ? option === gameState.currentDestination?.name
                        ? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg"
                        : "bg-red-50 text-red-500 border border-red-200"
                      : "bg-gradient-to-r from-[#5d1eb5] to-[#6f2ad4] text-white shadow-md hover:shadow-lg"
                  }
                  text-base font-medium disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            ))}
          </div>

          {gameState.answered && (
            <div className="mt-auto">
              <div className="bg-gradient-to-r from-[#f8f9fa] to-white rounded-xl border-2 border-[#e5e7eb] shadow-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {gameState.isCorrect ? "🎉" : "✨"}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">
                      {gameState.isCorrect ? "Brilliant!" : "Nice try!"}
                    </h3>
                    <p className="text-sm text-[#666]">
                      {gameState.isCorrect
                        ? "Here's an interesting fact about this place:"
                        : `The correct answer was ${gameState.currentDestination?.name}`}
                    </p>
                  </div>
                </div>
                <blockquote className="text-base italic text-[#5d1eb5] bg-[#f8f9fa] p-3 rounded-lg border-l-4 border-[#5d1eb5] mb-4">
                  {gameState.currentDestination?.funFacts[0]}
                </blockquote>

                <div className="flex gap-3">
                  {!gameState.isCorrect && (
                    <button
                      onClick={retryCurrentRound}
                      className="flex-1 p-3 bg-white text-[#5d1eb5] rounded-lg hover:bg-[#f8f9fa] transition-colors border-2 border-[#5d1eb5] font-medium"
                    >
                      Try Again
                    </button>
                  )}
                  <button
                    onClick={startNewRound}
                    className="flex-1 p-3 bg-gradient-to-r from-[#5d1eb5] to-[#6f2ad4] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Next Destination
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-black font-semibold">Challenge a Friend</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-[#666] hover:text-[#1a1a1a] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d1eb5] focus:border-transparent"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    Your Score
                  </label>
                  <div className="p-3 bg-[#f8f9fa] rounded-lg text-[#1a1a1a] font-medium">
                    {gameState.score.correct}/{gameState.score.total}
                  </div>
                </div>

                {username.trim() && (
                  <div>
                    <label className="block text-sm font-medium text-[#666] mb-1">
                      Share Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generateShareLink()}
                        readOnly
                        className="flex-1 p-3 bg-[#f8f9fa] rounded-lg text-[#666] font-mono text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(generateShareLink())}
                        className="p-3 bg-[#f8f9fa] text-[#5d1eb5] rounded-lg hover:bg-[#e9ecef] transition-colors"
                      >
                        📋 Copy
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={shareToWhatsApp}
                    disabled={!username.trim()}
                    className="flex-1 p-3 bg-gradient-to-r from-[#5d1eb5] to-[#6f2ad4] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>Share on WhatsApp</span>
                    <span>📱</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
