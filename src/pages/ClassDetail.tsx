import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
    leaderboard: [
      { id: 1, name: "John Doe", mastered: 35, totalAttempted: 40 },
      { id: 2, name: "Jane Smith", mastered: 32, totalAttempted: 38 },
      { id: 3, name: "Bob Johnson", mastered: 28, totalAttempted: 35 },
      { id: 4, name: "Alice Brown", mastered: 25, totalAttempted: 30 },
    ]
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
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
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