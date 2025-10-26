import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Mail, Building2, User, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Nair",
    designation: "Municipal Officer",
    department: "Public Works Department",
    email: "rajesh.nair@mumbai.gov.in",
    phone: "+91 98765 43210"
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin-login");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 pb-6 border-b">
              <div className="relative group cursor-pointer">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-picture-upload"
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      toast({
                        title: "Profile Picture Updated",
                        description: "Your profile picture has been updated successfully.",
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-sm text-muted-foreground">{profileData.designation}</p>
                <p className="text-xs text-muted-foreground">{profileData.department}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    value={profileData.designation}
                    onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Department
                </Label>
                <Input
                  id="department"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="bg-gradient-primary">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-primary">
                  Edit Profile
                </Button>
              )}
              <Button variant="outline">
                Change Password
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="ml-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">47</p>
                <p className="text-sm text-muted-foreground mt-1">Complaints Taken</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">42</p>
                <p className="text-sm text-muted-foreground mt-1">Resolved</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-accent">5</p>
                <p className="text-sm text-muted-foreground mt-1">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
