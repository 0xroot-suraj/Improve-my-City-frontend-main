import { useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle2, ThumbsUp, Users, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const statsData = [
  { label: "Pending Issues", value: 127, icon: AlertCircle, color: "text-destructive", bgColor: "bg-destructive/10" },
  { label: "In Progress", value: 84, icon: Clock, color: "text-accent", bgColor: "bg-accent/10" },
  { label: "Resolved", value: 1453, icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-100" },
  { label: "Total Upvotes", value: 3247, icon: ThumbsUp, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Total Users", value: 8921, icon: Users, color: "text-secondary", bgColor: "bg-secondary/10" },
];

const categoryData = [
  { name: "Public Works", value: 342, color: "hsl(220, 60%, 45%)" },
  { name: "Water", value: 287, color: "hsl(200, 70%, 50%)" },
  { name: "Electricity", value: 195, color: "hsl(30, 100%, 50%)" },
  { name: "Environment", value: 168, color: "hsl(120, 60%, 45%)" },
  { name: "Traffic", value: 143, color: "hsl(0, 70%, 50%)" },
  { name: "Health", value: 98, color: "hsl(280, 60%, 55%)" },
  { name: "Other", value: 231, color: "hsl(0, 0%, 60%)" },
];

const weeklyData = [
  { week: "Week 1", resolved: 87, new: 45 },
  { week: "Week 2", resolved: 102, new: 58 },
  { week: "Week 3", resolved: 95, new: 42 },
  { week: "Week 4", resolved: 118, new: 67 },
];

const departmentPerformance = [
  { name: "Public Works Dept.", resolved: 342, rating: 4.8 },
  { name: "Water Supply Dept.", resolved: 287, rating: 4.6 },
  { name: "Electrical Dept.", resolved: 195, rating: 4.5 },
  { name: "Environment Dept.", resolved: 168, rating: 4.7 },
];

const recentActivities = [
  { id: 1, user: "Priya Sharma", action: "reported pothole", location: "Bandra West", time: "5 mins ago", type: "new" },
  { id: 2, admin: "Rajesh Nair", action: "resolved water issue", location: "Andheri East", time: "12 mins ago", type: "resolved" },
  { id: 3, user: "Amit Patel", action: "upvoted complaint", location: "Dadar", time: "18 mins ago", type: "upvote" },
  { id: 4, admin: "Sneha Desai", action: "took street light complaint", location: "Juhu", time: "25 mins ago", type: "progress" },
  { id: 5, user: "Vikram Singh", action: "reported garbage issue", location: "Malad", time: "32 mins ago", type: "new" },
];

export default function AdminDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            Smart Mumbai Civic Dashboard
          </h1>
          <p className="text-muted-foreground">Real-time monitoring and management portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value.toLocaleString()}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Resolution Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="resolved" stroke="hsl(120, 60%, 45%)" strokeWidth={2} name="Resolved" />
                  <Line type="monotone" dataKey="new" stroke="hsl(0, 70%, 50%)" strokeWidth={2} name="New Issues" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Departments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Top Performing Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="resolved" fill="hsl(220, 60%, 35%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[250px] overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'resolved' ? 'bg-green-100' :
                      activity.type === 'progress' ? 'bg-accent/10' :
                      activity.type === 'upvote' ? 'bg-primary/10' :
                      'bg-destructive/10'
                    }`}>
                      {activity.type === 'resolved' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> :
                       activity.type === 'progress' ? <Clock className="h-4 w-4 text-accent" /> :
                       activity.type === 'upvote' ? <ThumbsUp className="h-4 w-4 text-primary" /> :
                       <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user || activity.admin}</span>
                        {' '}{activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.location} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
