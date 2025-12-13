import { cn } from '@/lib/utils';
import { SystemStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: SystemStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<SystemStatus, { label: string; className: string }> = {
  healthy: { label: 'Healthy', className: 'status-healthy' },
  degraded: { label: 'Degraded', className: 'status-degraded' },
  outage: { label: 'Outage', className: 'status-outage' },
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium capitalize',
      config.className,
      sizeStyles[size]
    )}>
      <span className={cn(
        'rounded-full',
        size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
        status === 'healthy' && 'bg-success animate-pulse-slow',
        status === 'degraded' && 'bg-warning',
        status === 'outage' && 'bg-destructive animate-pulse'
      )} />
      {config.label}
    </span>
  );
}
