import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api";
import mmcEmblem from "@/assets/mmc-emblem.png";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        setShowOTP(true);
        toast({
          title: "OTP Sent",
          description: "Please check your email for the verification code",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTP(email, otp);
      
      if (response.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to Improve My City Mumbai",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid or expired OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-elevated">
        <div className="flex flex-col items-center mb-8">
          <img src={mmcEmblem} alt="Mumbai ABC Corporation" className="h-20 w-20 mb-4" />
          <h1 className="text-2xl font-heading font-bold text-center">Improve My City</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">Mumbai ABC Corporation</p>
        </div>

        {!showOTP ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="civic" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Login"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">Enter OTP</Label>
              <p className="text-sm text-muted-foreground text-center mb-4">
                We've sent a 6-digit code to {email}
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button onClick={handleOTPSubmit} variant="civic" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            
            <Button 
              onClick={() => setShowOTP(false)} 
              variant="ghost" 
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        )}

        <div className="flex justify-between mt-6 text-sm">
          <Link to="/create-account" className="text-primary hover:underline">
            Create Account
          </Link>
          <Link to="/admin-login" className="text-primary hover:underline">
            Admin Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
