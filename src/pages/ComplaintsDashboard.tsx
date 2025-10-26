import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Plus, Clock, CheckCircle2, AlertCircle, User, Calendar, Image as ImageIcon, MapPin, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { complaintAPI } from "@/lib/api";

interface Complaint {
  _id: string;
  trackingId: string;
  title: string;
  description: string;
  category: string;
  location?: {
    address?: string;
    ward?: string;
    locality?: string;
  };
  upvotes: number;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  media?: {
    images?: Array<{ url: string; public_id: string }>;
    videos?: Array<{ url: string; public_id: string }>;
  };
  isAnonymous: boolean;
  createdAt: string;
  timestamps: {
    filed: string;
    inProgress?: string;
    resolved?: string;
  };
  assignedTo?: {
    username: string;
    email: string;
    designation?: string;
    department?: string;
  };
  adminNotes?: string;
}

export default function ComplaintsDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getMyComplaints();
      if (response.success && response.data) {
        setComplaints(response.data.complaints);
      }
    } catch (error: any) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch complaints. Please login again.",
        variant: "destructive",
      });
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
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

  const activeComplaints = complaints.filter(
    (c) => c.status === "pending" || c.status === "in-progress"
  );
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">My Complaints</h1>
            <p className="text-muted-foreground">Track and manage your civic complaints</p>
          </div>
          <Link to="/raise-complaint">
            <Button variant="civic" className="gap-2">
              <Plus className="h-5 w-5" />
              Raise New Complaint
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending / In Progress
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Resolved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Loading complaints...</p>
                </CardContent>
              </Card>
            ) : activeComplaints.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No active complaints</p>
                </CardContent>
              </Card>
            ) : (
              activeComplaints.map((complaint) => (
                <Card key={complaint._id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{complaint.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span className="text-xs font-mono">#{complaint.trackingId}</span>
                          <span>•</span>
                          <span>{complaint.category}</span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Filed on {new Date(complaint.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {complaint.upvotes} upvotes
                        </p>
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
            {loading ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Loading complaints...</p>
                </CardContent>
              </Card>
            ) : resolvedComplaints.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No resolved complaints</p>
                </CardContent>
              </Card>
            ) : (
              resolvedComplaints.map((complaint) => (
                <Card key={complaint._id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{complaint.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span className="text-xs font-mono">#{complaint.trackingId}</span>
                          <span>•</span>
                          <span>{complaint.category}</span>
                        </CardDescription>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Filed on {new Date(complaint.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {complaint.upvotes} upvotes
                        </p>
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
                  <span className="text-xs font-mono">#{selectedComplaint.trackingId}</span>
                  <span>•</span>
                  <span>{selectedComplaint.category}</span>
                  {selectedComplaint.location?.address && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedComplaint.location.address}
                      </span>
                    </>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Reporter Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedComplaint.isAnonymous ? <User className="h-6 w-6" /> : <User className="h-6 w-6" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedComplaint.isAnonymous ? 'Anonymous User' : 'Your Complaint'}</p>
                    {selectedComplaint.location?.address && (
                      <p className="text-sm text-muted-foreground">{selectedComplaint.location.address}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedComplaint.status)}
                </div>

                {/* Upvotes */}
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedComplaint.upvotes} people upvoted this complaint</span>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedComplaint.description}</p>
                </div>

                {/* Images */}
                {selectedComplaint.media?.images && selectedComplaint.media.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Media
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedComplaint.media.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border">
                          <img src={img.url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
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
                {selectedComplaint.assignedTo && (selectedComplaint.status === "in-progress" || selectedComplaint.status === "resolved") && (
                  <>
                    <Separator />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3">Handling Authority</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> {selectedComplaint.assignedTo.username}
                        </p>
                        {selectedComplaint.assignedTo.designation && (
                          <p>
                            <span className="font-medium">Designation:</span> {selectedComplaint.assignedTo.designation}
                          </p>
                        )}
                        {selectedComplaint.assignedTo.department && (
                          <p>
                            <span className="font-medium">Department:</span> {selectedComplaint.assignedTo.department}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          <a href={`mailto:${selectedComplaint.assignedTo.email}`} className="text-primary hover:underline">
                            {selectedComplaint.assignedTo.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Admin Notes */}
                {selectedComplaint.adminNotes && (
                  <>
                    <Separator />
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2">Admin Notes</h4>
                      <p className="text-sm text-muted-foreground">{selectedComplaint.adminNotes}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4 border-t">
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
