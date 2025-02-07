
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Apple, LogIn } from "lucide-react";
import { useHistory } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { IonContent, IonPage } from "@ionic/react";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth submitted:", { email, password, isLogin });
    
    toast({
      title: isLogin ? "Welcome back!" : "Account created",
      description: "You have been successfully logged in.",
    });

    history.push("/home");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{isLogin ? "Welcome back" : "Create account"}</CardTitle>
              <CardDescription>
                {isLogin ? "Enter your credentials to continue" : "Sign up for a new account"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {isLogin && (
                  <Button variant="link" className="px-0 text-sm">
                    Forgot password?
                  </Button>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  {isLogin ? "Sign in" : "Sign up"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <Apple className="mr-2 h-4 w-4" />
                  Continue with Apple
                </Button>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm"
                >
                  {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </IonContent>
    </IonPage>
  );
};
