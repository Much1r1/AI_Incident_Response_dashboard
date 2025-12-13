import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MetricPoint } from '@/data/mockData';

interface MetricsChartProps {
  title: string;
  data: MetricPoint[];
  type?: 'area' | 'bar';
  color?: string;
  unit?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">
          {payload[0].value.toFixed(2)}{unit}
        </p>
      </div>
    );
  }
  return null;
};

export function MetricsChart({ 
  title, 
  data, 
  type = 'area', 
  color = 'hsl(var(--primary))',
  unit = '',
  height = 200 
}: MetricsChartProps) {
  // Show only last 20 data points for cleaner display
  const displayData = data.slice(-20);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={height}>
          {type === 'area' ? (
            <AreaChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${title.replace(/\s/g, '')})`}
              />
            </AreaChart>
          ) : (
            <BarChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip unit={unit} />} />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
