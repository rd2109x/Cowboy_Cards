import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ClassDetail = () => {
  const { id } = useParams();
  
  // Mock data - in a real app this would come from an API
  const classData = {
    name: "Biology 101",
    teacher: "Dr. Smith",
    sets: [
      { id: 1, name: "Chapter 1: Cell Biology", totalCards: 20, mastered: 15 },
      { id: 2, name: "Chapter 2: Genetics", totalCards: 15, mastered: 8 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{classData.name}</h1>
        <p className="text-gray-600">Teacher: {classData.teacher}</p>
      </div>

      <Tabs defaultValue="sets" className="w-full">
        <TabsList>
          <TabsTrigger value="sets">Flashcard Sets</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="sets">
          <div className="mb-4">
            <Button>
              Create New Set
            </Button>
          </div>

          <div className="grid gap-4">
            {classData.sets.map((set) => (
              <Card key={set.id}>
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
        </TabsContent>

        <TabsContent value="announcements">
          <p className="text-gray-600">No announcements yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetail;