import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThumbsUp, MapPin, Calendar, Image as ImageIcon, CheckCircle, ExternalLink } from "lucide-react";
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

const mockComplaints = [
  {
    id: 1,
    title: "Large pothole on main road",
    description: "There is a dangerous pothole near the bus stop that has been causing accidents. It needs immediate attention.",
    category: "Public Works",
    location: "Bandra West, Near Linking Road",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    userName: "Priya Sharma",
    upvotes: 234,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1625134683971-e5c00b696805?w=800",
    date: "2024-10-24",
    status: "pending"
  },
  {
    id: 2,
    title: "Water supply disruption for 3 days",
    description: "Our area has not received water supply for the past 3 days. Many families are facing severe issues.",
    category: "Water",
    location: "Andheri East, Saki Naka",
    coordinates: { lat: 19.1076, lng: 72.8856 },
    userName: "Amit Patel",
    upvotes: 189,
    hasImage: false,
    imageUrl: undefined,
    date: "2024-10-23",
    status: "pending"
  },
  {
    id: 3,
    title: "Street lights not working",
    description: "Multiple street lights on our street have been non-functional for over a week, causing safety concerns.",
    category: "Electricity",
    location: "Dadar West, Shivaji Park",
    coordinates: { lat: 19.0270, lng: 72.8397 },
    userName: "Sneha Desai",
    upvotes: 156,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
    date: "2024-10-23",
    status: "pending"
  },
  {
    id: 4,
    title: "Garbage not collected for 4 days",
    description: "The municipal garbage collection has not happened in our area for 4 days now. The smell is unbearable.",
    category: "Environment",
    location: "Malad West, Orlem",
    coordinates: { lat: 19.1868, lng: 72.8347 },
    userName: "Vikram Singh",
    upvotes: 142,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800",
    date: "2024-10-22",
    status: "pending"
  },
  {
    id: 5,
    title: "Traffic signal malfunction",
    description: "The traffic signal at the junction is not working properly, causing traffic jams during peak hours.",
    category: "Traffic",
    location: "Powai, Central Avenue",
    coordinates: { lat: 19.1176, lng: 72.9060 },
    userName: "Rahul Mehta",
    upvotes: 98,
    hasImage: false,
    imageUrl: undefined,
    date: "2024-10-22",
    status: "pending"
  }
];

export default function AdminPendingIssues() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredComplaints = complaints
    .filter(c => selectedCategory === "All Categories" || c.category === selectedCategory)
    .sort((a, b) => b.upvotes - a.upvotes);

  const handleTakeComplaint = (complaintId: number, title: string) => {
    setComplaints(prev => prev.filter(c => c.id !== complaintId));
    toast({
      title: "Complaint Taken",
      description: `"${title}" has been assigned to you and moved to In Progress. User has been notified via email.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Pending Issues</h1>
            <p className="text-muted-foreground">Review and take action on pending complaints</p>
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
          <span>Showing {filteredComplaints.length} pending complaints</span>
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
                <p className="text-lg font-medium">No pending complaints</p>
                <p className="text-sm text-muted-foreground">All complaints in this category have been addressed</p>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{complaint.category}</Badge>
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
                        <span>{new Date(complaint.date).toLocaleDateString()}</span>
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

                    {/* Action Button */}
                    <div className="flex justify-end pt-2">
                      <Button
                        onClick={() => handleTakeComplaint(complaint.id, complaint.title)}
                        className="bg-gradient-primary"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Take Complaint
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
