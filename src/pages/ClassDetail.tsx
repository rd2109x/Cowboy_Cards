import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
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
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  // Mock data - in a real app this would come from an API
  const classData = {
    name: "Biology 101",
    teacher: "Dr. Smith",
    sets: [
      { id: 1, name: "Chapter 1: Cell Biology", totalCards: 20, mastered: 15 },
      { id: 2, name: "Chapter 2: Genetics", totalCards: 15, mastered: 8 },
    ],
    leaderboard: [
      { id: 1, name: "John Doe", mastered: 35, totalAttempted: 40 },
      { id: 2, name: "Jane Smith", mastered: 32, totalAttempted: 38 },
      { id: 3, name: "Bob Johnson", mastered: 28, totalAttempted: 35 },
      { id: 4, name: "Alice Brown", mastered: 25, totalAttempted: 30 },
    ]
  };

  // Mock flashcards data
  const flashcardsData = {
    1: [
      { id: 1, front: "What is a cell?", back: "The basic structural unit of all living organisms" },
      { id: 2, front: "What is a nucleus?", back: "The control center of the cell containing genetic material" },
      { id: 3, front: "What is mitochondria?", back: "The powerhouse of the cell" }
    ],
    2: [
      { id: 1, front: "What is DNA?", back: "A molecule carrying genetic instructions" },
      { id: 2, front: "What is RNA?", back: "A molecule involved in protein synthesis" },
      { id: 3, front: "What is a gene?", back: "A basic unit of heredity" }
    ]
  };

  const handleSetClick = (setId: number) => {
    setSelectedSetId(setId);
    setCurrentCardIndex(0);
  };

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

      <Tabs defaultValue="sets" className="w-full">
        <TabsList>
          <TabsTrigger value="sets">Flashcard Sets</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="sets">
          <div className="mb-4">
            <Button>Create New Set</Button>
          </div>

          {selectedSetId === null ? (
            <div className="grid gap-4">
              {classData.sets.map((set) => (
                <Card key={set.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSetClick(set.id)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{set.name}</h3>
                        <p className="text-sm text-gray-600">
                          Total cards: {set.totalCards}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Mastered: {set.mastered}/{set.totalCards}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <Button onClick={() => setSelectedSetId(null)} variant="outline" className="mb-4">
                ← Back to Sets
              </Button>
              <div className="w-full max-w-2xl mx-auto relative">
                <Carousel 
                  orientation="vertical" 
                  className="w-full"
                  setApi={setApi}
                >
                  <CarouselContent className="-mt-1 h-[400px]">
                    {flashcardsData[selectedSetId].map((card) => (
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
                  {flashcardsData[selectedSetId].map((_, index) => (
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
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Cards Mastered</TableHead>
                    <TableHead>Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classData.leaderboard.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.mastered}</TableCell>
                      <TableCell>
                        {Math.round((student.mastered / student.totalAttempted) * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetail;