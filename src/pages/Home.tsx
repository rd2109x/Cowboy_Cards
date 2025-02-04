import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Home = () => {
  const classes = [
    { 
      id: 1, 
      name: "Biology 101", 
      teacher: "Dr. Smith", 
      sets: 5,
      leaderboard: [
        { name: "John Doe", score: 95 },
        { name: "Jane Smith", score: 90 },
        { name: "Bob Johnson", score: 85 },
      ]
    },
    { 
      id: 2, 
      name: "Spanish Basics", 
      teacher: "Mrs. Garcia", 
      sets: 3,
      leaderboard: [
        { name: "Alice Brown", score: 98 },
        { name: "Charlie Davis", score: 92 },
        { name: "Eva Wilson", score: 88 },
      ]
    },
    { 
      id: 3, 
      name: "World History", 
      teacher: "Mr. Johnson", 
      sets: 7,
      leaderboard: [
        { name: "Frank Miller", score: 94 },
        { name: "Grace Lee", score: 91 },
        { name: "Henry Taylor", score: 87 },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Class
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{cls.name}</CardTitle>
              <CardDescription>{cls.teacher}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="leaderboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="leaderboard">
                    <Trophy className="mr-2 h-4 w-4" />
                    Leaderboard
                  </TabsTrigger>
                  <TabsTrigger value="flashcards">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Flashcards
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="leaderboard" className="mt-4">
                  <div className="space-y-2">
                    {cls.leaderboard.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{entry.name}</span>
                        <span className="text-primary">{entry.score}%</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="flashcards" className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to={`/class/${cls.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Flashcards
                    </Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;