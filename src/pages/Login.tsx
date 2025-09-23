import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = login(username, password);
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <img
            src="/logo.jpg"
            alt="App Icon"
            className="mx-auto w-28 h-28 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panchakarma Care</h1>
            <p className="text-muted-foreground mt-2">Patient Management System</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="medical-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              [Role-Based Access]
              <br />
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    aria-label="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    aria-label="Enter password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full medical-gradient"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3 text-center">Demo Credentials</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Patient:</strong> patient / P@tient!2025
              </div>
              <div>
                <strong>Practitioner:</strong> doctor / Doctor@2025
              </div>
              <div>
                <strong>Clinic Admin:</strong> clinic / Clinic@2025
              </div>
              <div>
                <strong>Admin:</strong> admin / Admin@2025
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
