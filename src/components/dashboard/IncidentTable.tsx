import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Incident, Severity, IncidentStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Eye, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface IncidentTableProps {
  incidents: Incident[];
}

const severityStyles: Record<Severity, string> = {
  low: 'severity-low',
  medium: 'severity-medium',
  high: 'severity-high',
};

const statusConfig: Record<IncidentStatus, { label: string; icon: typeof AlertCircle; className: string }> = {
  open: { label: 'Open', icon: AlertCircle, className: 'text-destructive' },
  investigating: { label: 'Investigating', icon: Clock, className: 'text-warning' },
  resolved: { label: 'Resolved', icon: CheckCircle2, className: 'text-success' },
};

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">Active Incidents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Service</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {incidents.map((incident) => {
              const StatusIcon = statusConfig[incident.status].icon;
              return (
                <tr 
                  key={incident.id} 
                  className="hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-primary">{incident.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex px-2 py-1 rounded text-xs font-medium border capitalize',
                      severityStyles[incident.severity]
                    )}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{incident.service}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className={cn('flex items-center gap-1.5', statusConfig[incident.status].className)}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      <span className="text-sm capitalize">{statusConfig[incident.status].label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{formatTime(incident.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/incidents/${incident.id}`)}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
