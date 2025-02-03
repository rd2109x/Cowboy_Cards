import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlashCard } from "@/components/flashcards/FlashCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const ClassDetail = () => {
  const { id } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  // Mock data - in a real app this would come from an API
  const classData = {
    name: "Biology 101",
    teacher: "Dr. Smith",
  };

  // Mock flashcards data - using the first set's cards directly
  const flashcardsData = [
    { id: 1, front: "What is a cell?", back: "The basic structural unit of all living organisms" },
    { id: 2, front: "What is a nucleus?", back: "The control center of the cell containing genetic material" },
    { id: 3, front: "What is mitochondria?", back: "The powerhouse of the cell" }
  ];

  const handleMastered = () => {
    console.log("Card marked as mastered");
  };

  const handleStillLearning = () => {
    console.log("Card marked as still learning");
  };

  // Update current card index when the carousel changes
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentCardIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{classData.name}</h1>
        <p className="text-gray-600">Teacher: {classData.teacher}</p>
      </div>

      <div className="space-y-8">
        <Button onClick={() => window.history.back()} variant="outline" className="mb-4">
          ← Back
        </Button>
        <div className="w-full max-w-2xl mx-auto relative">
          <Carousel 
            orientation="vertical" 
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-mt-1 h-[400px]">
              {flashcardsData.map((card) => (
                <CarouselItem key={card.id}>
                  <FlashCard
                    front={card.front}
                    back={card.back}
                    onMastered={handleMastered}
                    onStillLearning={handleStillLearning}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* Pagination dots */}
          <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
            {flashcardsData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCardIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;