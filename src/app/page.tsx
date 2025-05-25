"use client";

import { useCallback, useState, useEffect } from "react";
import { dummyStories } from "@/data/stories";

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<{
    id: number;
    username: string;
    avatar: string;
    images: string[];
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedStory) {
      setIsLoading(true);
      const img = new window.Image();
      img.src = selectedStory.images[currentImageIndex];
      img.onload = () => {
        setIsLoading(false);
      };
    }
  }, [selectedStory, currentImageIndex]);

  const storyTimer = useCallback(() => {
    if (selectedStory) {
      const timer = setTimeout(() => {
        if (currentImageIndex < selectedStory.images.length - 1) {
          setCurrentImageIndex(currentImageIndex + 1);
        } else {
          const nextStory = dummyStories?.find(
            (story) => story.id === selectedStory.id + 1
          );
          if (nextStory) {
            setSelectedStory(nextStory);
            setCurrentImageIndex(0);
          }
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [selectedStory, currentImageIndex]);

  useEffect(() => {
    const timer = storyTimer();
    return () => {
      if (timer) timer();
    };
  }, [storyTimer]);

  const nextStory = () => {
    if (!selectedStory) return;

    if (currentImageIndex < selectedStory.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      const nextStory = dummyStories?.find(
        (story) => story.id === selectedStory.id + 1
      );
      if (nextStory) {
        setSelectedStory(nextStory);
        setCurrentImageIndex(0);
      }
    }
  };

  const prevStory = () => {
    if (!selectedStory) return;

    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      const prevStory = dummyStories?.find(
        (story) => story.id === selectedStory.id - 1
      );
      if (prevStory) {
        setSelectedStory(prevStory);
        setCurrentImageIndex(prevStory.images.length - 1);
      }
    }
  };

  const styles = `
    @keyframes progress {
      from { width: 0; }
      to { width: 100%; }
    }

    .animate-progress {
      animation: progress 5s linear forwards;
    }
  `;

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="relative w-full overflow-x-auto pb-4 bg-gray-200 p-5 rounded-md">
        <div className="flex gap-4 p-5 min-w-max">
          {dummyStories.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-full p-[3px] bg-gradient-to-r from-[#F0C465] via-[#CE3678] to-[#A53798] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setSelectedStory(story);
                  setCurrentImageIndex(0);
                }}
              >
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-600">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url(${selectedStory.images[currentImageIndex]})`,
              opacity: isLoading ? 0 : 1,
            }}
          >
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-2 justify-between mt-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStory.avatar}
                    alt={selectedStory.username}
                    className="h-10 w-10 rounded-full border-2 border-white"
                  />
                  <p className="text-white font-medium">
                    {selectedStory.username}
                  </p>
                </div>
                <button
                  className="text-white text-2xl hover:bg-white/10 p-2 rounded-full transition-colors z-50 cursor-pointer"
                  onClick={() => {
                    setSelectedStory(null);
                    setCurrentImageIndex(0);
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="absolute top-4 left-0 right-0 px-4">
              <div className="flex gap-1">
                {selectedStory.images.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-white ${
                        index === currentImageIndex
                          ? "animate-progress"
                          : index < currentImageIndex
                          ? "w-full"
                          : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
              onClick={prevStory}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
              onClick={nextStory}
            />
          </div>
        </div>
      )}
      <style>{styles}</style>
    </div>
  );
}
