import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Share2, ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";

interface Announcement {
  id: string;
  adminName: string;
  adminDesignation: string;
  adminDepartment: string;
  adminPhoto: string;
  timestamp: string;
  title: string;
  body: string;
  image?: string;
  category: string;
  likes: number;
  isLiked: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    adminName: "Rajesh Nair",
    adminDesignation: "Municipal Officer",
    adminDepartment: "Public Works Dept.",
    adminPhoto: "",
    timestamp: "2 hours ago",
    title: "Clean Mumbai Week Begins!",
    body: "We're launching Clean Mumbai Week starting Monday, June 3rd. All citizens are encouraged to participate in neighborhood cleanup drives. Special waste collection drives will be organized in all 24 wards. Join us in making Mumbai cleaner and greener!",
    image: "",
    category: "Awareness",
    likes: 234,
    isLiked: false,
  },
  {
    id: "2",
    adminName: "Priya Deshmukh",
    adminDesignation: "Traffic Commissioner",
    adminDepartment: "Traffic Management",
    adminPhoto: "",
    timestamp: "5 hours ago",
    title: "Road Closure Notice - Marine Drive",
    body: "Marine Drive will be closed for traffic from 6 AM to 12 PM on Sunday for the Mumbai Marathon. Alternative routes via Pedder Road and Annie Besant Road are available. Please plan your journey accordingly.",
    image: "",
    category: "Maintenance",
    likes: 456,
    isLiked: false,
  },
  {
    id: "3",
    adminName: "Amit Sharma",
    adminDesignation: "Senior Officer",
    adminDepartment: "Urban Development",
    adminPhoto: "",
    timestamp: "1 day ago",
    title: "New Garden Inauguration in Bandra",
    body: "A new public garden with children's play area and walking tracks will be inaugurated at Bandra West on June 10th. The garden features eco-friendly landscaping and rainwater harvesting systems. All residents are invited to the opening ceremony at 9 AM.",
    image: "",
    category: "Public Event",
    likes: 789,
    isLiked: false,
  },
  {
    id: "4",
    adminName: "Kavita Mehta",
    adminDesignation: "Health Officer",
    adminDepartment: "Public Health Dept.",
    adminPhoto: "",
    timestamp: "2 days ago",
    title: "Free Health Checkup Camp - This Weekend",
    body: "Free health checkup camps will be organized across all municipal hospitals this weekend. Services include blood pressure monitoring, diabetes screening, and general health consultation. Timing: 9 AM to 5 PM. No appointment needed.",
    image: "",
    category: "Public Event",
    likes: 567,
    isLiked: false,
  },
];

const CityAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(mockAnnouncements);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const filtered = announcements.filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAnnouncements(filtered);
  }, [searchQuery, announcements]);

  const handleLike = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? {
              ...announcement,
              isLiked: !announcement.isLiked,
              likes: announcement.isLiked ? announcement.likes - 1 : announcement.likes + 1,
            }
          : announcement
      )
    );
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: "Check out this announcement from Mumbai Civic Portal",
        url: window.location.href,
      });
    } else {
      toast.success("Link copied to clipboard!");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Awareness":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Maintenance":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Public Event":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              City Announcements
            </h1>
            <p className="text-muted-foreground">
              Stay updated with official announcements from Mumbai ABC Corporation
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid gap-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-border"
              >
                {announcement.image && (
                  <div className="w-full h-48 bg-muted overflow-hidden">
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={announcement.adminPhoto} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {announcement.adminName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {announcement.adminName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {announcement.adminDesignation}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {announcement.adminDepartment}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{announcement.timestamp}</p>
                      <Badge className={`mt-2 ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                      {announcement.title}
                    </h2>
                    <p className="text-foreground/90 leading-relaxed">{announcement.body}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{announcement.likes} people like this</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(announcement.id)}
                        className={announcement.isLiked ? "text-red-500" : ""}
                      >
                        <Heart
                          className={`h-4 w-4 ${announcement.isLiked ? "fill-current" : ""}`}
                        />
                        <span className="ml-1">Like</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(announcement.title)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="ml-1">Share</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No announcements found matching your search.</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CityAnnouncements;
