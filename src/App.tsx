import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import AdminLogin from "./pages/AdminLogin";
import ComplaintsDashboard from "./pages/ComplaintsDashboard";
import CityComplaints from "./pages/CityComplaints";
import RaiseComplaint from "./pages/RaiseComplaint";
import ExploreMumbai from "./pages/ExploreMumbai";
import Profile from "./pages/Profile";
import CityAnnouncements from "./pages/CityAnnouncements";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAllComplaints from "./pages/AdminAllComplaints";
import AdminPendingIssues from "./pages/AdminPendingIssues";
import AdminInProgress from "./pages/AdminInProgress";
import AdminResolved from "./pages/AdminResolved";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminProfile from "./pages/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/city-complaints" element={<CityComplaints />} />
          <Route path="/my-complaints" element={<ComplaintsDashboard />} />
          <Route path="/explore" element={<ExploreMumbai />} />
          <Route path="/raise-complaint" element={<RaiseComplaint />} />
          <Route path="/announcements" element={<CityAnnouncements />} />
          <Route path="/profile" element={<Profile />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminAllComplaints />} />
          <Route path="/admin/pending" element={<AdminPendingIssues />} />
          <Route path="/admin/in-progress" element={<AdminInProgress />} />
          <Route path="/admin/resolved" element={<AdminResolved />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
