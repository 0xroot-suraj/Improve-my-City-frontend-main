import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, FileText, Clock, CheckCircle2, Edit, LogOut, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI, userAPI } from "@/lib/api";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [editData, setEditData] = useState(profileData);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const complaintStats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        const user = response.data.user;
        const data = {
          name: user.username || "",
          email: user.email || "",
          phone: user.mobile || "",
          address: user.address || "",
          avatar: user.profilePicture?.url || "",
        };
        setProfileData(data);
        setEditData(data);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "Session Expired",
          description: "Please login again",
          variant: "destructive",
        });
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setUpdating(true);
    try {
      // Upload profile picture if changed
      if (imageFile) {
        await userAPI.uploadProfilePicture(imageFile);
      }

      // Update profile data
      const response = await userAPI.updateProfile({
        username: editData.name,
        mobile: editData.phone,
        address: editData.address,
      });

      if (response.success) {
        setProfileData(editData);
        setIsEditOpen(false);
        setImagePreview("");
        setImageFile(null);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        fetchProfile(); // Refresh profile data
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information and view your complaint statistics</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-elevated mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditOpen(true)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-1">{profileData.name}</h2>
                  <p className="text-sm text-muted-foreground">Registered Citizen</p>
                </div>

                <Separator />

                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Number</p>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{profileData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaint Statistics */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Complaint Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{complaintStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Complaints</p>
              </div>
              
              <div className="p-4 bg-red-500/10 rounded-lg text-center border border-red-500/20">
                <Clock className="h-6 w-6 mx-auto mb-2 text-red-700 dark:text-red-400" />
                <p className="text-2xl font-bold text-red-700 dark:text-red-400">{complaintStats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              
              <div className="p-4 bg-orange-500/10 rounded-lg text-center border border-orange-500/20">
                <Clock className="h-6 w-6 mx-auto mb-2 text-orange-700 dark:text-orange-400" />
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{complaintStats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              
              <div className="p-4 bg-green-500/10 rounded-lg text-center border border-green-500/20">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-green-700 dark:text-green-400" />
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">{complaintStats.resolved}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <div className="flex justify-center">
          <Button 
            variant="destructive" 
            size="lg"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={imagePreview || editData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {editData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="h-8 w-8 text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Click on the avatar to upload a new profile picture
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input 
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Contact Number</Label>
                <Input 
                  id="edit-phone"
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea 
                  id="edit-address"
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={updating}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={updating}>
                {updating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}
