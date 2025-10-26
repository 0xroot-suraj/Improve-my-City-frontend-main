import { Card } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, CheckCircle, Brain } from "lucide-react";

const insights = [
  {
    title: "Pothole complaints increased by 23%",
    description: "Mainly in Western suburbs after recent rainfall",
    icon: TrendingUp,
    type: "trend",
  },
  {
    title: "Fast response in South Mumbai",
    description: "Average resolution time: 2.3 days",
    icon: CheckCircle,
    type: "success",
  },
  {
    title: "Alert: Waterlogging expected",
    description: "Heavy rainfall forecast for next week",
    icon: AlertTriangle,
    type: "warning",
  },
];

export default function AIInsights() {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h3 className="font-heading font-semibold text-xl">Weekly Civic Insights</h3>
        <span className="px-3 py-1 bg-gradient-accent text-accent-foreground text-xs font-semibold rounded-full ml-auto">
          AI Generated
        </span>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className={`p-2 rounded-lg h-fit ${
                insight.type === "success" ? "bg-green-500/10" :
                insight.type === "warning" ? "bg-secondary/10" :
                "bg-primary/10"
              }`}>
                <Icon className={`h-5 w-5 ${
                  insight.type === "success" ? "text-green-600" :
                  insight.type === "warning" ? "text-secondary" :
                  "text-primary"
                }`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-primary rounded-lg">
        <p className="text-sm text-primary-foreground">
          <span className="font-semibold">AI Prediction:</span> Based on historical data, we expect 15% increase in garbage-related complaints during festival season next month.
        </p>
      </div>
    </Card>
  );
}
