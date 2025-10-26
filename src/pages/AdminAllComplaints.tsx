import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MapPin, Calendar, Image as ImageIcon, ArrowUpDown, Filter, Search, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminComplaintAPI } from "@/lib/api";

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
  user: {
    _id: string;
    username: string;
    email: string;
  } | string;
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
}

const priorityOrder = { high: 3, medium: 2, low: 1 };

export default function AdminAllComplaints() {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchQuery, statusFilter, priorityFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await adminComplaintAPI.getAllComplaints();
      if (response.success && response.data) {
        // Sort by priority (high to low) and then by date (newest first)
        const sorted = response.data.complaints.sort((a: Complaint, b: Complaint) => {
          const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
          if (priorityDiff !== 0) return priorityDiff;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setComplaints(sorted);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch complaints",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = [...complaints];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      filtered = filtered.filter((c) => c.priority === priorityFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.trackingId.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      );
    }

    setFilteredComplaints(filtered);
  };

  const handleStatusChange = async (complaintId: string, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      const response = await adminComplaintAPI.updateComplaintStatus(complaintId, newStatus);
      
      if (response.success) {
        toast({
          title: "Success",
          description: `Complaint status updated to ${newStatus}`,
        });
        
        // Update local state
        setComplaints((prev) =>
          prev.map((c) => (c._id === complaintId ? { ...c, status: newStatus as any } : c))
        );
        
        // Update selected complaint if it's open
        if (selectedComplaint && selectedComplaint._id === complaintId) {
          setSelectedComplaint({ ...selectedComplaint, status: newStatus as any });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20">
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
            Low Priority
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-500">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-600">Resolved</Badge>;
      default:
        return null;
    }
  };

  const getUserDisplay = (complaint: Complaint) => {
    if (complaint.isAnonymous) return "Anonymous User";
    if (typeof complaint.user === 'string') return "User";
    return complaint.user.username || complaint.user.email;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">All Complaints</h1>
          <p className="text-muted-foreground">Priority-based complaint management system</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, tracking ID, category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredComplaints.length} of {complaints.length} complaints</span>
              <span className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sorted by: Priority (High to Low)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading complaints...</p>
            </CardContent>
          </Card>
        ) : filteredComplaints.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No complaints found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <Card
                key={complaint._id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedComplaint(complaint)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      {/* Title and Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold">{complaint.title}</h3>
                        <div className="flex gap-2 flex-shrink-0">
                          {getPriorityBadge(complaint.priority)}
                          {getStatusBadge(complaint.status)}
                        </div>
                      </div>

                      {/* Tracking ID and Category */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-mono">#{complaint.trackingId}</span>
                        <span>•</span>
                        <span>{complaint.category}</span>
                        {complaint.location?.address && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {complaint.location.address}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description Preview */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {complaint.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(complaint.createdAt).toLocaleDateString('en-IN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {complaint.upvotes} upvotes
                        </span>
                        <span>Reported by: {getUserDisplay(complaint)}</span>
                        {complaint.media?.images && complaint.media.images.length > 0 && (
                          <span className="flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {complaint.media.images.length} image(s)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Status Change */}
                    <div className="flex-shrink-0">
                      <Select
                        value={complaint.status}
                        onValueChange={(value) => handleStatusChange(complaint._id, value)}
                        disabled={updatingStatus}
                      >
                        <SelectTrigger className="w-[150px]" onClick={(e) => e.stopPropagation()}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Complaint Details Modal */}
      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedComplaint && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedComplaint.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 flex-wrap mt-2">
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
                {/* Priority and Status */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {getPriorityBadge(selectedComplaint.priority)}
                    {getStatusBadge(selectedComplaint.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Change Status:</span>
                    <Select
                      value={selectedComplaint.status}
                      onValueChange={(value) => handleStatusChange(selectedComplaint._id, value)}
                      disabled={updatingStatus}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Reporter Info */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold mb-2">Reporter Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {getUserDisplay(selectedComplaint)}</p>
                    {!selectedComplaint.isAnonymous && typeof selectedComplaint.user !== 'string' && (
                      <p><span className="font-medium">Email:</span> {selectedComplaint.user.email}</p>
                    )}
                    <p><span className="font-medium">Upvotes:</span> {selectedComplaint.upvotes}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedComplaint.description}</p>
                </div>

                {/* Media */}
                {selectedComplaint.media?.images && selectedComplaint.media.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Attached Images
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedComplaint.media.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(img.url)}
                        >
                          <img src={img.url} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                        {new Date(selectedComplaint.timestamps.filed || selectedComplaint.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {selectedComplaint.timestamps.inProgress && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className="font-medium">In Progress:</span>
                        <span className="text-muted-foreground">
                          {new Date(selectedComplaint.timestamps.inProgress).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    {selectedComplaint.timestamps.resolved && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">Resolved:</span>
                        <span className="text-muted-foreground">
                          {new Date(selectedComplaint.timestamps.resolved).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Viewer Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <img src={selectedImage || ''} alt="Full size" className="w-full h-auto rounded-lg" />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
