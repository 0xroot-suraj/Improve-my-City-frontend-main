import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle, Upload, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { complaintAPI } from "@/lib/api";

const categories = [
  "Public Works (roads, potholes, drainage)",
  "Water Supply & Sanitation",
  "Electricity & Streetlights",
  "Environment & Waste Management",
  "Traffic & Transport",
  "Public Amenities (parks, toilets, bus stops)",
  "Law & Order / Safety",
  "Urban Planning / Construction",
  "Health & Hygiene",
  "Animal Welfare",
  "Citizen Services (documents, offices)",
  "Other",
];

export default function RaiseComplaint() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    anonymous: false,
    description: "",
    location: "",
    photo: null as File | null,
    video: null as File | null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('category', formData.category);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('isAnonymous', formData.anonymous.toString());
      
      // Only add location if provided
      if (formData.location) {
        submitData.append('location', JSON.stringify({
          address: formData.location,
          coordinates: {
            latitude: 19.0760, // Sample coordinates (Mumbai)
            longitude: 72.8777
          }
        }));
      }

      // Add files if they exist
      if (formData.photo) {
        submitData.append('images', formData.photo);
      }
      if (formData.video) {
        submitData.append('videos', formData.video);
      }

      const response = await complaintAPI.create(submitData);
      
      if (response.success) {
        setTrackingId(response.data.complaint.trackingId);
        setShowConfirmation(true);
        toast({
          title: "Success",
          description: "Complaint submitted successfully!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = (action: "view" | "home") => {
    setShowConfirmation(false);
    if (action === "view") {
      navigate("/my-complaints");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Raise a Complaint</h1>
            <p className="text-muted-foreground">Report civic issues and help improve Mumbai</p>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Complaint Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select complaint category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Complaint Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymous" className="text-base">
                      Complain as Anonymous
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Your identity will be kept confidential
                    </p>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Complaint Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={5}
                  />
                </div>

                {/* Upload Section */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="photo">Add Photo</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                        className="cursor-pointer"
                      />
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video">Add Video (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                        className="cursor-pointer"
                      />
                      <Upload className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                  <Label>Location (Optional)</Label>
                  
                  {/* Map Placeholder */}
                  <div className="relative h-64 rounded-lg border bg-muted/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Google Maps integration placeholder
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Click map to select location
                        </p>
                      </div>
                    </div>
                  </div>

                  <Input
                    id="location"
                    type="text"
                    placeholder="Location will be auto-filled from map"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />

                  <Button type="button" variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Confirm Location
                  </Button>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="civic" size="lg" className="w-full" disabled={loading}>
                  <Send className="h-5 w-5 mr-2" />
                  {loading ? "Submitting..." : "Submit Complaint"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Complaint Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center space-y-2">
              <p>Your complaint has been registered with the Mumbai ABC Corporation.</p>
              <p className="text-lg font-semibold text-foreground">
                Tracking ID: <span className="text-primary">#{trackingId}</span>
              </p>
              <p className="text-xs">Save this ID to track your complaint status.</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button variant="civic" onClick={() => handleConfirmation("view")} className="w-full">
              View My Complaints
            </Button>
            <Button variant="outline" onClick={() => handleConfirmation("home")} className="w-full">
              Return to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
