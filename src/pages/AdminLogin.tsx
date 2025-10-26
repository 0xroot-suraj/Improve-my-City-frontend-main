import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api";
import mmcEmblem from "@/assets/mmc-emblem.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.adminLogin(credentials.username, credentials.password);
      
      if (response.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to Admin Portal",
        });
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid admin credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img src={mmcEmblem} alt="" className="h-96 w-96 brightness-200" />
      </div>
      
      <Card className="w-full max-w-md p-8 shadow-elevated relative z-10 bg-card/95 backdrop-blur">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-2">Improve My City: Mumbai</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email / Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="admin@mumbai.gov.in"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" variant="civic" className="w-full" disabled={loading}>
            <Shield className="h-4 w-4 mr-2" />
            {loading ? "Logging in..." : "Login as Admin"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-primary hover:underline">
            Back to User Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
