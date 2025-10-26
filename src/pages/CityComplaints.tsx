import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, AlertCircle, CheckCircle2, ThumbsUp, MapPin, Search, Filter, User, Calendar, Image as ImageIcon, X } from "lucide-react";

const mockPublicComplaints = [
  {
    id: "IMC12345",
    title: "Pothole on Western Express Highway",
    category: "Public Works",
    ward: "K/West",
    locality: "Andheri West",
    status: "pending",
    date: "2025-10-20",
    upvotes: 42,
    reporter: "Rajesh Kumar",
    reporterAvatar: "",
    description: "A large pothole has developed on the Western Express Highway near Andheri West. It's causing traffic issues and is a safety hazard for two-wheelers.",
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400"],
    isAnonymous: false,
    timestamps: {
      filed: "2025-10-20T10:30:00",
    },
  },
  {
    id: "IMC12346",
    title: "Broken Streetlight near Station",
    category: "Electricity & Streetlights",
    ward: "H/East",
    locality: "Bandra East",
    status: "in-progress",
    date: "2025-10-18",
    upvotes: 28,
    reporter: "Priya Sharma",
    reporterAvatar: "",
    description: "The streetlight near Bandra East station has been non-functional for over a week, making it unsafe for pedestrians at night.",
    images: [],
    isAnonymous: false,
    timestamps: {
      filed: "2025-10-18T15:20:00",
      inProgress: "2025-10-19T09:00:00",
    },
    adminInfo: {
      name: "Suresh Patil",
      designation: "Assistant Engineer",
      department: "Electrical Department",
      email: "suresh.patil@mcgm.gov.in",
    },
  },
  {
    id: "IMC12347",
    title: "Garbage not collected for 3 days",
    category: "Environment & Waste Management",
    ward: "A",
    locality: "Colaba",
    status: "resolved",
    date: "2025-10-15",
    upvotes: 67,
    reporter: "Anonymous Citizen",
    reporterAvatar: "",
    description: "Garbage has not been collected from our street for the past 3 days. It's creating a health hazard and attracting stray animals.",
    images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"],
    isAnonymous: true,
    timestamps: {
      filed: "2025-10-15T08:00:00",
      inProgress: "2025-10-15T14:00:00",
      resolved: "2025-10-16T07:30:00",
    },
    adminInfo: {
      name: "Meera Desai",
      designation: "Sanitation Supervisor",
      department: "Solid Waste Management",
      email: "meera.desai@mcgm.gov.in",
    },
  },
  {
    id: "IMC12348",
    title: "Water leakage in main pipeline",
    category: "Water Supply & Sanitation",
    ward: "P/South",
    locality: "Goregaon",
    status: "in-progress",
    date: "2025-10-10",
    upvotes: 51,
    reporter: "Amit Patel",
    reporterAvatar: "",
    description: "There is a major water leakage in the main pipeline near the market area. Water is being wasted continuously.",
    images: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400"],
    isAnonymous: false,
    timestamps: {
      filed: "2025-10-10T11:45:00",
      inProgress: "2025-10-11T08:00:00",
    },
    adminInfo: {
      name: "Vikram Singh",
      designation: "Water Supply Engineer",
      department: "Hydraulic Engineering",
      email: "vikram.singh@mcgm.gov.in",
    },
  },
  {
    id: "IMC12349",
    title: "Illegal construction blocking road",
    category: "Urban Planning / Construction",
    ward: "K/East",
    locality: "Andheri East",
    status: "pending",
    date: "2025-10-19",
    upvotes: 89,
    reporter: "Sunita Iyer",
    reporterAvatar: "",
    description: "An unauthorized construction is blocking the main road access. This is causing severe traffic congestion and is a violation of building codes.",
    images: ["https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400"],
    isAnonymous: false,
    timestamps: {
      filed: "2025-10-19T16:00:00",
    },
  },
  {
    id: "IMC12350",
    title: "Stray dogs causing safety concerns",
    category: "Animal Welfare",
    ward: "D",
    locality: "Malabar Hill",
    status: "pending",
    date: "2025-10-21",
    upvotes: 34,
    reporter: "Anonymous Citizen",
    reporterAvatar: "",
    description: "A pack of stray dogs has been aggressive towards pedestrians in the area. Requesting animal control intervention.",
    images: [],
    isAnonymous: true,
    timestamps: {
      filed: "2025-10-21T12:30:00",
    },
  },
];

export default function CityComplaints() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<typeof mockPublicComplaints[0] | null>(null);
  const [upvotedComplaints, setUpvotedComplaints] = useState<Set<string>>(new Set());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUpvote = (complaintId: string) => {
    setUpvotedComplaints(prev => {
      const newSet = new Set(prev);
      if (newSet.has(complaintId)) {
        newSet.delete(complaintId);
      } else {
        newSet.add(complaintId);
      }
      return newSet;
    });
  };

  const getUpvoteCount = (baseCount: number, complaintId: string) => {
    return upvotedComplaints.has(complaintId) ? baseCount + 1 : baseCount;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  const filterComplaints = (complaints: typeof mockPublicComplaints) => {
    return complaints.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.ward.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => getUpvoteCount(b.upvotes, b.id) - getUpvoteCount(a.upvotes, a.id));
  };

  const pendingComplaints = filterComplaints(mockPublicComplaints.filter((c) => c.status === "pending"));
  const inProgressComplaints = filterComplaints(mockPublicComplaints.filter((c) => c.status === "in-progress"));
  const resolvedComplaints = filterComplaints(mockPublicComplaints.filter((c) => c.status === "resolved"));

  const categories = Array.from(new Set(mockPublicComplaints.map((c) => c.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">City Complaints – Mumbai Civic Portal</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore and support civic issues reported across Mumbai. The more upvotes a complaint receives, the higher its priority for resolution.
          </p>
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Complaint Map View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 rounded-lg border bg-muted/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Interactive map showing complaint locations
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Map integration placeholder - pins will show reported issues
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="shadow-card mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, locality, or ward..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              In Progress ({inProgressComplaints.length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Resolved ({resolvedComplaints.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingComplaints.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending complaints found</p>
                </CardContent>
              </Card>
            ) : (
              pendingComplaints.map((complaint) => (
                <Card key={complaint.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{complaint.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono">#{complaint.id}</span>
                          <span>•</span>
                          <span>{complaint.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {complaint.locality}, Ward {complaint.ward}
                          </span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                          Filed on {new Date(complaint.date).toLocaleDateString("en-IN")}
                        </p>
                        <Button 
                          variant={upvotedComplaints.has(complaint.id) ? "default" : "ghost"} 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleUpvote(complaint.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{getUpvoteCount(complaint.upvotes, complaint.id)}</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {inProgressComplaints.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No complaints in progress</p>
                </CardContent>
              </Card>
            ) : (
              inProgressComplaints.map((complaint) => (
                <Card key={complaint.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{complaint.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono">#{complaint.id}</span>
                          <span>•</span>
                          <span>{complaint.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {complaint.locality}, Ward {complaint.ward}
                          </span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                          Filed on {new Date(complaint.date).toLocaleDateString("en-IN")}
                        </p>
                        <Button 
                          variant={upvotedComplaints.has(complaint.id) ? "default" : "ghost"} 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleUpvote(complaint.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{getUpvoteCount(complaint.upvotes, complaint.id)}</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedComplaints.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No resolved complaints</p>
                </CardContent>
              </Card>
            ) : (
              resolvedComplaints.map((complaint) => (
                <Card key={complaint.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{complaint.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono">#{complaint.id}</span>
                          <span>•</span>
                          <span>{complaint.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {complaint.locality}, Ward {complaint.ward}
                          </span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                          Filed on {new Date(complaint.date).toLocaleDateString("en-IN")}
                        </p>
                        <Button 
                          variant={upvotedComplaints.has(complaint.id) ? "default" : "ghost"} 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleUpvote(complaint.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{getUpvoteCount(complaint.upvotes, complaint.id)}</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Complaint Details Modal */}
      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedComplaint && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedComplaint.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono">#{selectedComplaint.id}</span>
                  <span>•</span>
                  <span>{selectedComplaint.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedComplaint.locality}, Ward {selectedComplaint.ward}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Reporter Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedComplaint.reporterAvatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedComplaint.isAnonymous ? <User className="h-6 w-6" /> : selectedComplaint.reporter.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedComplaint.reporter}</p>
                    <p className="text-sm text-muted-foreground">{selectedComplaint.locality}, Ward {selectedComplaint.ward}</p>
                  </div>
                </div>

                <Separator />

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedComplaint.status)}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedComplaint.description}</p>
                </div>

                {/* Images */}
                {selectedComplaint.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Media
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedComplaint.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border">
                          <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="font-medium">Filed:</span>
                      <span className="text-muted-foreground">
                        {new Date(selectedComplaint.timestamps.filed).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {selectedComplaint.timestamps.inProgress && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="font-medium">In Progress:</span>
                        <span className="text-muted-foreground">
                          {new Date(selectedComplaint.timestamps.inProgress).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    {selectedComplaint.timestamps.resolved && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">Resolved:</span>
                        <span className="text-muted-foreground">
                          {new Date(selectedComplaint.timestamps.resolved).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Info */}
                {selectedComplaint.adminInfo && (selectedComplaint.status === "in-progress" || selectedComplaint.status === "resolved") && (
                  <>
                    <Separator />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3">Handling Authority</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {selectedComplaint.adminInfo.name}
                        </p>
                        <p>
                          <span className="font-medium">Designation:</span> {selectedComplaint.adminInfo.designation}
                        </p>
                        <p>
                          <span className="font-medium">Department:</span> {selectedComplaint.adminInfo.department}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          <a href={`mailto:${selectedComplaint.adminInfo.email}`} className="text-primary hover:underline">
                            {selectedComplaint.adminInfo.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button 
                  variant={upvotedComplaints.has(selectedComplaint.id) ? "default" : "outline"}
                  onClick={() => handleUpvote(selectedComplaint.id)}
                  className="gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Support ({getUpvoteCount(selectedComplaint.upvotes, selectedComplaint.id)})
                </Button>
                <Button onClick={() => setSelectedComplaint(null)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
