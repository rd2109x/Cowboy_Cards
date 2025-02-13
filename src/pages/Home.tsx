import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./css/homepage.css"; // Ensure the correct path to the CSS file

const Home = () => {
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const classes = [
    { id: 1, name: "Chemistry 101", teacher: "Dr. Smith", sets: 5 },
    { id: 2, name: "Spanish Basics", teacher: "Mrs. Garcia", sets: 3 },
    { id: 3, name: "World History", teacher: "Mr. Johnson", sets: 7 },
  ];

  const handleCardClick = (id: number) => {
    setClickedCard(id);
    setTimeout(() => setClickedCard(null), 200); // Reset after animation
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Class
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <Link
            to={`/class/${cls.id}`}
            key={cls.id}
            className={`block ${clickedCard === cls.id ? "card-clicked" : ""}`}
            onClick={() => handleCardClick(cls.id)}
          >
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>{cls.name}</CardTitle>
                <CardDescription>{cls.teacher}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{cls.sets} sets</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;