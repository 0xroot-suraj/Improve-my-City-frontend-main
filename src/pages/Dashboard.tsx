import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityCarousel from "@/components/CityCarousel";
import WeatherWidget from "@/components/WeatherWidget";
import ComplaintStats from "@/components/ComplaintStats";
import AIHeatmap from "@/components/AIHeatmap";
import AIInsights from "@/components/AIInsights";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Carousel */}
        <CityCarousel />

        {/* Welcome Section */}
        <section className="my-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Welcome to Improve My City: Mumbai
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your voice matters. Help us build a better Mumbai by reporting civic issues and tracking their resolution.
          </p>
        </section>

        {/* Weather & Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <WeatherWidget />
          
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-gradient-primary text-primary-foreground p-6 rounded-lg shadow-card">
              <p className="text-sm font-medium mb-2">Total Complaints</p>
              <p className="text-4xl font-bold">822</p>
              <p className="text-xs mt-2 opacity-90">This month</p>
            </div>
            <div className="bg-gradient-accent text-accent-foreground p-6 rounded-lg shadow-card">
              <p className="text-sm font-medium mb-2">Resolution Rate</p>
              <p className="text-4xl font-bold">66%</p>
              <p className="text-xs mt-2 opacity-90">Last 30 days</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-card">
              <p className="text-sm font-medium mb-2">Resolved</p>
              <p className="text-4xl font-bold">542</p>
              <p className="text-xs mt-2 opacity-90">This month</p>
            </div>
            <div className="bg-card text-foreground border border-border p-6 rounded-lg shadow-card">
              <p className="text-sm font-medium mb-2">Avg Response Time</p>
              <p className="text-4xl font-bold">2.5</p>
              <p className="text-xs mt-2 text-muted-foreground">Days</p>
            </div>
          </div>
        </div>

        {/* Complaint Statistics */}
        <section className="mb-12">
          <ComplaintStats />
        </section>

        {/* Raise Complaint CTA */}
        <section className="my-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 rounded-lg shadow-card">
            <AlertCircle className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-4">Have a Civic Issue?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Report potholes, garbage issues, broken streetlights, waterlogging, and more. We're here to help.
            </p>
            <Button 
              variant="civic" 
              size="lg" 
              onClick={() => navigate("/raise-complaint")}
            >
              Raise a Complaint
            </Button>
          </div>
        </section>

        {/* AI-Powered Section */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-6">
            <AIHeatmap />
            <AIInsights />
          </div>
        </section>

        {/* Smart Predictions */}
        <section className="mb-12">
          <div className="bg-card p-8 rounded-lg shadow-card border-l-4 border-secondary">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-xl mb-2">Smart Complaint Predictions</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI analyzes historical patterns to predict potential civic issues before they escalate.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <span className="text-sm font-medium">Pothole formation risk in Andheri</span>
                    <span className="text-xs font-semibold text-secondary">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <span className="text-sm font-medium">Waterlogging expected in Dadar</span>
                    <span className="text-xs font-semibold text-secondary">MEDIUM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <span className="text-sm font-medium">Streetlight maintenance due in Bandra</span>
                    <span className="text-xs font-semibold text-yellow-600">LOW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
