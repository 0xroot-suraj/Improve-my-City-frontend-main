import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const categoryData = [
  { name: "Potholes", value: 245 },
  { name: "Garbage", value: 189 },
  { name: "Streetlights", value: 156 },
  { name: "Waterlogging", value: 134 },
  { name: "Others", value: 98 },
];

const statusData = [
  { name: "Resolved", value: 542, fill: "hsl(142, 76%, 36%)" },
  { name: "Pending", value: 280, fill: "hsl(30, 100%, 50%)" },
];

const COLORS = ["hsl(220, 60%, 35%)", "hsl(30, 100%, 50%)", "hsl(142, 76%, 36%)", "hsl(0, 70%, 50%)", "hsl(220, 15%, 45%)"];

export default function ComplaintStats() {
  return (
    <Card className="p-6 shadow-card">
      <h3 className="font-heading font-semibold text-xl mb-6">Complaint Statistics</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Status Overview</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Category Breakdown</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 85%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(220, 60%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">822</p>
          <p className="text-xs text-muted-foreground mt-1">Total Complaints</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">542</p>
          <p className="text-xs text-muted-foreground mt-1">Resolved</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">280</p>
          <p className="text-xs text-muted-foreground mt-1">In Progress</p>
        </div>
      </div>
    </Card>
  );
}
