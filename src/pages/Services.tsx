import { Server, Activity, Clock, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { mockServices, Service } from '@/data/mockData';
import { cn } from '@/lib/utils';

function formatLastIncident(isoString: string | null): string {
  if (!isoString) return 'Never';
  
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-card rounded-lg border border-border p-5 hover:bg-accent/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Server className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">{service.name}</h3>
            <StatusBadge status={service.status} size="sm" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Activity className="h-3.5 w-3.5" />
            <span className="text-xs">Error Rate</span>
          </div>
          <p className={cn(
            'text-lg font-semibold',
            service.errorRate > 2 ? 'text-destructive' : 
            service.errorRate > 0.5 ? 'text-warning' : 'text-success'
          )}>
            {service.errorRate}%
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs">Uptime</span>
          </div>
          <p className={cn(
            'text-lg font-semibold',
            service.uptime >= 99.9 ? 'text-success' : 
            service.uptime >= 99 ? 'text-warning' : 'text-destructive'
          )}>
            {service.uptime}%
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">Last Incident</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {formatLastIncident(service.lastIncident)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const healthyServices = mockServices.filter(s => s.status === 'healthy');
  const degradedServices = mockServices.filter(s => s.status === 'degraded');
  const outageServices = mockServices.filter(s => s.status === 'outage');

  return (
    <DashboardLayout>
      <Header 
        title="Services" 
        subtitle="Monitor all connected services and their health status" 
      />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Summary Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">
              {healthyServices.length} Healthy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">
              {degradedServices.length} Degraded
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">
              {outageServices.length} Outage
            </span>
          </div>
        </div>

        {/* Degraded Services */}
        {degradedServices.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Degraded Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {degradedServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Healthy Services */}
        {healthyServices.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Healthy Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthyServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
