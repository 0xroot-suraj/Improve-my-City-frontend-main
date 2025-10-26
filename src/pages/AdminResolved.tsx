import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThumbsUp, MapPin, Calendar, Image as ImageIcon, CheckCircle, ExternalLink } from "lucide-react";

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

const mockResolvedComplaints = [
  {
    id: 9,
    title: "Street light replacement needed",
    description: "Street light pole damaged and needs replacement for safety.",
    category: "Electricity",
    location: "Borivali West, IC Colony",
    coordinates: { lat: 19.2403, lng: 72.8567 },
    userName: "Kavita Reddy",
    resolvedBy: "You (Admin)",
    upvotes: 123,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800",
    reportedDate: "2024-10-15",
    resolvedDate: "2024-10-20",
    resolutionTime: "5 days"
  },
  {
    id: 10,
    title: "Water pipeline leak",
    description: "Major water pipeline leak causing water wastage and road damage.",
    category: "Water",
    location: "Chembur, Sion-Trombay Road",
    coordinates: { lat: 19.0633, lng: 72.8997 },
    userName: "Manish Kapoor",
    resolvedBy: "Rajesh Nair",
    upvotes: 145,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800",
    reportedDate: "2024-10-12",
    resolvedDate: "2024-10-18",
    resolutionTime: "6 days"
  },
  {
    id: 11,
    title: "Pothole causing accidents",
    description: "Deep pothole on highway exit causing vehicle damage and accidents.",
    category: "Public Works",
    location: "Ghatkopar East, LBS Marg",
    coordinates: { lat: 19.0863, lng: 72.9081 },
    userName: "Deepak Shah",
    resolvedBy: "You (Admin)",
    upvotes: 198,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1625134683971-e5c00b696805?w=800",
    reportedDate: "2024-10-10",
    resolvedDate: "2024-10-16",
    resolutionTime: "6 days"
  },
  {
    id: 12,
    title: "Illegal dumping of waste",
    description: "Construction waste being dumped illegally in residential area.",
    category: "Environment",
    location: "Kandivali East, Thakur Village",
    coordinates: { lat: 19.2056, lng: 72.8736 },
    userName: "Pooja Iyer",
    resolvedBy: "Sneha Desai",
    upvotes: 87,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800",
    reportedDate: "2024-10-08",
    resolvedDate: "2024-10-14",
    resolutionTime: "6 days"
  },
  {
    id: 13,
    title: "Blocked drainage causing flooding",
    description: "Drainage system blocked, causing water logging during rains.",
    category: "Public Works",
    location: "Santacruz West, Linking Road",
    coordinates: { lat: 19.0806, lng: 72.8328 },
    userName: "Rohit Sharma",
    resolvedBy: "You (Admin)",
    upvotes: 167,
    hasImage: false,
    imageUrl: undefined,
    reportedDate: "2024-10-05",
    resolvedDate: "2024-10-12",
    resolutionTime: "7 days"
  }
];

export default function AdminResolved() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredComplaints = mockResolvedComplaints
    .filter(c => selectedCategory === "All Categories" || c.category === selectedCategory)
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Resolved Issues</h1>
            <p className="text-muted-foreground">View successfully resolved complaints</p>
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
          <span>Showing {filteredComplaints.length} resolved complaints</span>
          {selectedCategory !== "All Categories" && (
            <span>in {selectedCategory}</span>
          )}
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-elevated transition-shadow border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{complaint.category}</Badge>
                        <Badge className="bg-green-600 text-white">Resolved</Badge>
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

                  {/* Resolution Info */}
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-md border border-green-200 dark:border-green-900">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Successfully Resolved
                      </p>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <span className="font-medium">Resolved by:</span> {complaint.resolvedBy}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Resolution time: {complaint.resolutionTime} • Resolved on {new Date(complaint.resolvedDate).toLocaleDateString()}
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
                      <span>Reported: {new Date(complaint.reportedDate).toLocaleDateString()}</span>
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
                </div>
              </CardContent>
            </Card>
          ))}
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
