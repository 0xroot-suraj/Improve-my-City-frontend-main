import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThumbsUp, MapPin, Calendar, Image as ImageIcon, CheckCircle, Mail, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All Categories",
  "Public Works",
  "Water",
  "Electricity",
  "Environment",
  "Traffic",
  "Law & Order",
  "Health",
  "Animal Care",
  "Citizen Services",
  "Other"
];

const mockInProgressComplaints = [
  {
    id: 6,
    title: "Broken pavement tiles",
    description: "Several tiles on the footpath are broken and loose, creating a tripping hazard for pedestrians.",
    category: "Public Works",
    location: "Worli, Annie Besant Road",
    coordinates: { lat: 19.0089, lng: 72.8186 },
    userName: "Meera Joshi",
    assignedTo: "You (Admin)",
    upvotes: 87,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1597008641621-cefdcf718025?w=800",
    date: "2024-10-20",
    takenDate: "2024-10-22",
    status: "in-progress"
  },
  {
    id: 7,
    title: "Sewage overflow issue",
    description: "There is sewage overflow in our lane causing unhygienic conditions and foul smell.",
    category: "Water",
    location: "Kurla West, LBS Marg",
    coordinates: { lat: 19.0728, lng: 72.8826 },
    userName: "Suresh Kumar",
    assignedTo: "You (Admin)",
    upvotes: 76,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=800",
    date: "2024-10-19",
    takenDate: "2024-10-21",
    status: "in-progress"
  },
  {
    id: 8,
    title: "Illegal parking blocking road",
    description: "Vehicles are regularly parked illegally on our street, blocking emergency access and causing traffic issues.",
    category: "Traffic",
    location: "Juhu, JVPD Scheme",
    coordinates: { lat: 19.1075, lng: 72.8263 },
    userName: "Anjali Nair",
    assignedTo: "You (Admin)",
    upvotes: 64,
    hasImage: false,
    imageUrl: undefined,
    date: "2024-10-21",
    takenDate: "2024-10-23",
    status: "in-progress"
  }
];

export default function AdminInProgress() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [complaints, setComplaints] = useState(mockInProgressComplaints);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredComplaints = complaints
    .filter(c => selectedCategory === "All Categories" || c.category === selectedCategory)
    .sort((a, b) => b.upvotes - a.upvotes);

  const handleMarkResolved = (complaintId: number, title: string) => {
    setComplaints(prev => prev.filter(c => c.id !== complaintId));
    toast({
      title: "Marked as Resolved",
      description: `"${title}" has been moved to Resolved. User has been notified.`,
    });
  };

  const handleSendUpdate = (title: string, userName: string) => {
    toast({
      title: "Email Update Sent",
      description: `Status update email sent to ${userName} regarding "${title}".`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">In Progress</h1>
            <p className="text-muted-foreground">Manage complaints currently being addressed</p>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Complaints Count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing {filteredComplaints.length} complaints in progress</span>
          {selectedCategory !== "All Categories" && (
            <span>in {selectedCategory}</span>
          )}
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No complaints in progress</p>
                <p className="text-sm text-muted-foreground">Take some pending complaints to start working on them</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-elevated transition-shadow border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{complaint.category}</Badge>
                          <Badge className="bg-accent text-accent-foreground">In Progress</Badge>
                          <span className="text-xs text-muted-foreground">
                            Reported by {complaint.userName}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <ThumbsUp className="h-4 w-4 fill-primary" />
                        <span className="font-semibold">{complaint.upvotes}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{complaint.description}</p>

                    {/* Assigned Info */}
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Taken on {new Date(complaint.takenDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{complaint.location}</span>
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${complaint.coordinates.lat},${complaint.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View on Map</span>
                      </a>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Reported: {new Date(complaint.date).toLocaleDateString()}</span>
                      </div>
                      {complaint.hasImage && complaint.imageUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImage(complaint.imageUrl!)}
                          className="flex items-center gap-1 text-primary hover:text-primary h-auto p-0"
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span>View attachment</span>
                        </Button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendUpdate(complaint.title, complaint.userName)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email Update
                      </Button>
                      <Button
                        onClick={() => handleMarkResolved(complaint.id, complaint.title)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Attachment</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Complaint attachment" 
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
