import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Building2, Train, Heart, ExternalLink } from "lucide-react";

const mumbaiPlaces = [
  {
    name: "Gateway of India",
    description: "Iconic monument and the most photographed landmark of Mumbai, built during the British Raj.",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500",
    mapUrl: "https://maps.google.com/?q=Gateway+of+India+Mumbai",
  },
  {
    name: "Marine Drive",
    description: "The Queen's Necklace - a stunning 3km boulevard along the Arabian Sea coast.",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500",
    mapUrl: "https://maps.google.com/?q=Marine+Drive+Mumbai",
  },
  {
    name: "Chhatrapati Shivaji Terminus",
    description: "UNESCO World Heritage Site, an outstanding example of Victorian Gothic architecture.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500",
    mapUrl: "https://maps.google.com/?q=Chhatrapati+Shivaji+Terminus+Mumbai",
  },
  {
    name: "Juhu Beach",
    description: "Popular beach destination known for its street food and sunset views.",
    image: "https://images.unsplash.com/photo-1548619137-d789c563f1c2?w=500",
    mapUrl: "https://maps.google.com/?q=Juhu+Beach+Mumbai",
  },
  {
    name: "Siddhivinayak Temple",
    description: "One of the most revered temples in Mumbai, dedicated to Lord Ganesha.",
    image: "https://images.unsplash.com/photo-1582632304583-90043eff704f?w=500",
    mapUrl: "https://maps.google.com/?q=Siddhivinayak+Temple+Mumbai",
  },
  {
    name: "Bandra-Worli Sea Link",
    description: "Modern engineering marvel connecting Bandra and Worli across the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=500",
    mapUrl: "https://maps.google.com/?q=Bandra+Worli+Sea+Link+Mumbai",
  },
];

const mumbaiStats = [
  { label: "Population", value: "20.7M", icon: Users, description: "Metropolitan area" },
  { label: "Area", value: "603 km²", icon: Building2, description: "Municipal area" },
  { label: "Metro Lines", value: "11", icon: Train, description: "Active & under construction" },
  { label: "Civic Wards", value: "24", icon: MapPin, description: "Administrative zones" },
];

export default function ExploreMumbai() {
  const [counters, setCounters] = useState({
    population: 0,
    area: 0,
    metro: 0,
    wards: 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Animate counters
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      population: 20.7,
      area: 603,
      metro: 11,
      wards: 24,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        population: Math.min(targets.population * progress, targets.population),
        area: Math.min(targets.area * progress, targets.area),
        metro: Math.min(targets.metro * progress, targets.metro),
        wards: Math.min(targets.wards * progress, targets.wards),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-elevated">
            <img 
              src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200" 
              alt="Mumbai Skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                  Discover Mumbai
                </h1>
                <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
                  The City of Dreams - where tradition meets modernity, and millions chase their aspirations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">Mumbai at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">{counters.population.toFixed(1)}M</p>
                <p className="text-sm font-medium text-foreground">Population</p>
                <p className="text-xs text-muted-foreground">Metropolitan area</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardContent className="pt-6 text-center">
                <Building2 className="h-8 w-8 mx-auto mb-3 text-secondary" />
                <p className="text-3xl font-bold mb-1">{Math.round(counters.area)} km²</p>
                <p className="text-sm font-medium text-foreground">Area</p>
                <p className="text-xs text-muted-foreground">Municipal area</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardContent className="pt-6 text-center">
                <Train className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold mb-1">{Math.round(counters.metro)}</p>
                <p className="text-sm font-medium text-foreground">Metro Lines</p>
                <p className="text-xs text-muted-foreground">Active & under construction</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-secondary" />
                <p className="text-3xl font-bold mb-1">{Math.round(counters.wards)}</p>
                <p className="text-sm font-medium text-foreground">Civic Wards</p>
                <p className="text-xs text-muted-foreground">Administrative zones</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Places */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">Popular Places</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mumbaiPlaces.map((place, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <CardDescription>{place.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(place.mapUrl, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Open in Maps
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Spirit of Mumbai Banner */}
        <section className="mb-12">
          <Card className="shadow-elevated bg-gradient-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <Heart className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-heading font-bold mb-4">Discover the Spirit of Mumbai</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                From the bustling streets of Crawford Market to the serene shores of Worli Sea Face, 
                Mumbai is a city that never sleeps and always welcomes you with open arms.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
