"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface Destination {
  alias: string;
  name: string;
  clues: string[];
  funFacts: string[];
}

interface GameState {
  currentDestination: Destination | null;
  selectedClues: string[];
  options: string[];
  score: {
    correct: number;
    total: number;
  };
  streak: number;
  questionTime: number;
  answered: boolean;
  isCorrect: boolean | null;
}

const CONFETTI_CONFIG = {
  particleCount: 500,
  spread: 100,
  origin: { x: 0.5, y: 0.5 },
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
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
    streak: 4,
    questionTime: 15,
    answered: false,
    isCorrect: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/destinations");
      const data = await response.json();
      console.log(data);
      setDestinations(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timer;

    if (gameState?.questionTime >= 0 && !gameState?.answered)
      timer = setInterval(() => {
        setGameState((prev) => {
          if (gameState?.questionTime <= 0) {
            handleAnswer("");
            return prev;
          } else
            return {
              ...prev,
              questionTime: prev?.questionTime - 1,
            };
        });
      }, 1000);

    return () => clearInterval(timer);
  }, [gameState?.questionTime, gameState?.answered]);

  const generateOptions = (correctAnswer: string): string[] => {
    const allDestinations = destinations.map((d) => d.name);
    const shuffled = allDestinations
      .filter((name) => name !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [...shuffled, correctAnswer].sort(() => Math.random() - 0.5);
  };

  const startNewRound = (newGame?: boolean) => {
    const randomDest =
      destinations[Math.floor(Math.random() * destinations.length)];

    setGameState({
      currentDestination: randomDest,
      selectedClues: randomDest?.clues || [],
      options: generateOptions(randomDest?.name),
      score: {
        correct: newGame ? 0 : gameState?.score?.correct,
        total: newGame ? 0 : gameState?.score?.total,
      },
      streak: gameState?.streak,
      questionTime: 15,
      answered: false,
      isCorrect: null,
    });
  };

  const retryCurrentRound = () => {
    if (!gameState?.currentDestination) return;

    setGameState({
      ...gameState,
      score: {
        correct: 0,
        total: 0,
      },
      streak: 0,
      questionTime: 15,
      answered: false,
      isCorrect: null,
    });

    startNewRound(true);
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (gameState?.answered) return;

    const isCorrect = selectedAnswer === gameState?.currentDestination?.name;

    let score: number;

    if (isCorrect) {
      confetti(CONFETTI_CONFIG);
      score =
        gameState?.questionTime >= 10
          ? 50
          : gameState?.questionTime >= 5
          ? 25
          : 10;
    } else if (!isCorrect && gameState?.streak > 5) setShowShareModal(true);

    setGameState((prev) => ({
      ...prev,
      answered: true,
      isCorrect,
      streak: isCorrect ? prev?.streak + 1 : 0,
      score: {
        correct:
          prev?.score.correct +
          (isCorrect ? score : 0) +
          (prev?.streak >= 3 ? 10 : 0),
        total: prev?.score.total + 50,
      },
    }));
  };

  useEffect(() => {
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
  }, [destinations]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      username: username,
      correct: gameState?.score.correct.toString(),
      total: gameState?.score.total.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const shareToWhatsApp = () => {
    if (!username.trim()) return;

    const shareUrl = generateShareLink();
    const message = `Hey! I'm ${username} and I'm challenging you to beat my GlobeTrotter score of ${gameState?.score.correct}/${gameState?.score.total}! Try here: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowShareModal(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
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
                {gameState?.score?.correct}
              </span>
              <span className="text-[#666]">/</span>
              <span className="text-[#666]">{gameState?.score?.total}</span>
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
            <div className=" flex justify-between items-center text-black">
              <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">
                Where am I? 🤔
              </h2>
              <h2>
                Streak : {gameState?.streak}{" "}
                <span>{gameState?.streak >= 3 && "Good going! "}</span>
              </h2>
              <h2>
                Time left :{" "}
                <span
                  className={
                    gameState?.questionTime >= 10
                      ? "text-green-500"
                      : gameState?.questionTime >= 5
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                >
                  {gameState?.questionTime > 0
                    ? gameState?.questionTime
                    : "Times Up!"}
                </span>
              </h2>
            </div>
            {gameState?.selectedClues.map((clue, index) => (
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
            {gameState?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={gameState?.answered}
                className={`p-4 cursor-pointer rounded-lg text-center transition-all duration-400 hover:scale-105
                  ${
                    gameState?.answered
                      ? option === gameState?.currentDestination?.name
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

          {gameState?.answered && (
            <div className="mt-auto">
              <div className="bg-gradient-to-r from-[#f8f9fa] to-white rounded-xl border-2 border-[#e5e7eb] shadow-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {gameState?.isCorrect ? "🎉" : "✨"}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">
                      {gameState?.isCorrect ? "Brilliant!" : "Nice try!"}
                    </h3>
                    <p className="text-sm text-[#666]">
                      {gameState?.isCorrect
                        ? "Here's an interesting fact about this place:"
                        : `The correct answer was ${gameState?.currentDestination?.name}`}
                    </p>
                  </div>
                </div>
                <blockquote className="text-base italic text-[#5d1eb5] bg-[#f8f9fa] p-3 rounded-lg border-l-4 border-[#5d1eb5] mb-4">
                  {gameState?.currentDestination?.funFacts[0]}
                </blockquote>

                <div className="flex gap-3">
                  {!gameState?.isCorrect ? (
                    <button
                      onClick={retryCurrentRound}
                      className="flex-1 p-3 bg-white text-[#5d1eb5] rounded-lg hover:bg-[#f8f9fa] transition-colors border-2 border-[#5d1eb5] font-medium"
                    >
                      Try Again
                    </button>
                  ) : (
                    <button
                      onClick={startNewRound()}
                      className="flex-1 p-3 bg-gradient-to-r from-[#5d1eb5] to-[#6f2ad4] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      Next Destination
                    </button>
                  )}
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
            className="fixed inset-0 bg-black opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-black font-semibold">
                  Challenge a Friend
                </h2>
                <p className="text-black my-2">
                  You have attained a high streak of 5+ ! Invite friends to
                  complete and beat the score{" "}
                </p>
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
                    className="w-full text-black p-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d1eb5] focus:border-transparent"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    Your Score
                  </label>
                  <div className="p-3 bg-[#f8f9fa] rounded-lg text-[#1a1a1a] font-medium">
                    {gameState?.score.correct}/{gameState?.score.total}
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
