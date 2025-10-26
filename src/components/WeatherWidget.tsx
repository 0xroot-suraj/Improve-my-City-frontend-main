import { Cloud, Droplets, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WeatherWidget() {
  return (
    <Card className="p-6 shadow-card">
      <h3 className="font-heading font-semibold text-lg mb-4">Mumbai Weather</h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-primary">28°C</div>
          <p className="text-sm text-muted-foreground mt-1">Partly Cloudy</p>
        </div>
        <Cloud className="h-16 w-16 text-primary" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="font-semibold">12 km/h</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">5-Day Forecast</p>
        <div className="flex justify-between mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs font-medium">{day}</p>
              <p className="text-sm font-bold text-primary mt-1">27°</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
