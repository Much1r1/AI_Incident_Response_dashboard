import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Activity,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { LogStream } from '@/components/dashboard/LogStream';
import { mockIncidents, mockLogs, TimelineEvent } from '@/data/mockData';
import { cn } from '@/lib/utils';

const timelineTypeConfig = {
  alert: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  action: { icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
  update: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  resolution: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
};

function formatTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function IncidentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const incident = mockIncidents.find(inc => inc.id === id);
  
  if (!incident) {
    return (
      <DashboardLayout>
        <Header title="Incident Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">The incident you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const severityColors = {
    low: 'severity-low',
    medium: 'severity-medium',
    high: 'severity-high',
  };

  const statusColors = {
    open: 'text-destructive',
    investigating: 'text-warning',
    resolved: 'text-success',
  };

  return (
    <DashboardLayout>
      <Header 
        title={`Incident ${incident.id}`}
        subtitle={incident.title}
      />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Back Button & Status */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium border capitalize',
              severityColors[incident.severity]
            )}>
              {incident.severity} Severity
            </span>
            <span className={cn('text-sm font-medium capitalize', statusColors[incident.status])}>
              {incident.status}
            </span>
          </div>
        </div>

        {/* Incident Summary Card */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h2 className="font-semibold">Incident Summary</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service</p>
                <p className="font-medium">{incident.service}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Created</p>
                <p className="font-medium">{formatTimestamp(incident.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                <p className={cn('font-medium capitalize', statusColors[incident.status])}>
                  {incident.status}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
              <p className="text-muted-foreground">{incident.description}</p>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        {incident.aiSummary && (
          <div className="bg-card rounded-lg border border-primary/30 overflow-hidden glow-primary">
            <div className="px-6 py-4 border-b border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">AI Analysis</h2>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Auto-generated
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-foreground/90">
                {incident.aiSummary}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Timeline */}
          {incident.timeline && incident.timeline.length > 0 && (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-semibold">Timeline</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="relative space-y-6">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-3 bottom-3 w-px bg-border" />
                  
                  {incident.timeline.map((event, index) => {
                    const config = timelineTypeConfig[event.type];
                    const EventIcon = config.icon;
                    
                    return (
                      <div key={event.id} className="relative flex gap-4">
                        <div className={cn(
                          'relative z-10 h-6 w-6 rounded-full flex items-center justify-center',
                          config.bg
                        )}>
                          <EventIcon className={cn('h-3.5 w-3.5', config.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">
                            {formatTimestamp(event.timestamp)}
                          </p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Related Logs */}
          <div>
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-semibold">Related Logs</h2>
                </div>
              </div>
              <LogStream 
                logs={incident.relatedLogs || mockLogs.filter(log => log.service === incident.service)} 
                maxHeight="300px" 
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
