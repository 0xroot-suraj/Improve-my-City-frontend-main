import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const hotspots = [
  { area: "Andheri West", complaints: 45, intensity: "high" },
  { area: "Bandra", complaints: 38, intensity: "high" },
  { area: "Dadar", complaints: 32, intensity: "medium" },
  { area: "Worli", complaints: 28, intensity: "medium" },
  { area: "Colaba", complaints: 19, intensity: "low" },
];

export default function AIHeatmap() {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-xl">AI Complaint Heatmap</h3>
        <span className="px-3 py-1 bg-gradient-accent text-accent-foreground text-xs font-semibold rounded-full">
          AI Powered
        </span>
      </div>
      
      <div className="bg-muted rounded-lg p-4 mb-4 aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <p className="text-sm text-muted-foreground relative z-10">Interactive Map Visualization</p>
        <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-red-500/30 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-secondary/40 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-500/30 rounded-full blur-xl" />
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">Top Complaint Hotspots</h4>
        {hotspots.map((spot, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <MapPin className={`h-5 w-5 ${
                spot.intensity === "high" ? "text-red-500" :
                spot.intensity === "medium" ? "text-secondary" :
                "text-yellow-500"
              }`} />
              <div>
                <p className="font-medium">{spot.area}</p>
                <p className="text-xs text-muted-foreground">{spot.complaints} active complaints</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              spot.intensity === "high" ? "bg-red-500/10 text-red-600" :
              spot.intensity === "medium" ? "bg-secondary/10 text-secondary" :
              "bg-yellow-500/10 text-yellow-600"
            }`}>
              {spot.intensity.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
