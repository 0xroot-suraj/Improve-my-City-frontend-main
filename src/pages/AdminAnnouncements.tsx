import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockAnnouncements = [
  {
    id: 1,
    admin: "Rajesh Nair",
    designation: "Municipal Officer, Public Works",
    timestamp: "2 hours ago",
    title: "Clean Mumbai Week Begins!",
    body: "Starting Monday, we're launching Clean Mumbai Week. All citizens are encouraged to participate in keeping their neighborhoods clean. Special waste collection drives will be organized.",
    category: "Public Event",
    likes: 342,
    image: null
  },
  {
    id: 2,
    admin: "Sneha Desai",
    designation: "Assistant Engineer, Traffic Dept.",
    timestamp: "5 hours ago",
    title: "Traffic Diversion - Marine Drive",
    body: "Due to ongoing maintenance work, Marine Drive will have traffic diversions from 10 AM to 6 PM for the next 3 days. Commuters are advised to use alternate routes.",
    category: "Maintenance",
    likes: 198,
    image: null
  }
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    body: "",
    category: "Awareness"
  });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const announcement = {
      id: announcements.length + 1,
      admin: "You (Admin)",
      designation: "Municipal Administrator",
      timestamp: "Just now",
      title: newAnnouncement.title,
      body: newAnnouncement.body,
      category: newAnnouncement.category,
      likes: 0,
      image: null
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: "", body: "", category: "Awareness" });
    setIsDialogOpen(false);
    
    toast({
      title: "Announcement Created",
      description: "Your announcement has been published successfully.",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Maintenance": "bg-accent text-accent-foreground",
      "Awareness": "bg-primary text-primary-foreground",
      "Public Event": "bg-green-600 text-white",
      "Emergency": "bg-destructive text-destructive-foreground",
      "Update": "bg-blue-600 text-white"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">City Announcements</h1>
            <p className="text-muted-foreground">Create and manage public announcements</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newAnnouncement.category}
                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Awareness">Awareness</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Public Event">Public Event</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Update">Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Message *</Label>
                  <Textarea
                    id="body"
                    placeholder="Enter announcement details"
                    rows={6}
                    value={newAnnouncement.body}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement} className="bg-gradient-primary">
                    Publish Announcement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Announcements Count */}
        <div className="text-sm text-muted-foreground">
          {announcements.length} active announcements
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header with Admin Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {announcement.admin.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{announcement.admin}</p>
                        <p className="text-xs text-muted-foreground">{announcement.designation}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{announcement.timestamp}</span>
                  </div>

                  {/* Category Badge */}
                  <Badge className={getCategoryColor(announcement.category)}>
                    {announcement.category}
                  </Badge>

                  {/* Title & Body */}
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">{announcement.title}</h3>
                    <p className="text-muted-foreground">{announcement.body}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{announcement.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
