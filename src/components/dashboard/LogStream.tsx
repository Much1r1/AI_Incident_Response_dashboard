import { ScrollArea } from '@/components/ui/scroll-area';
import { LogEntry, LogLevel } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface LogStreamProps {
  logs: LogEntry[];
  maxHeight?: string;
}

const levelStyles: Record<LogLevel, string> = {
  INFO: 'log-info',
  WARN: 'log-warn',
  ERROR: 'log-error',
};

const levelBadgeStyles: Record<LogLevel, string> = {
  INFO: 'bg-info/10 text-info border-info/30',
  WARN: 'bg-warning/10 text-warning border-warning/30',
  ERROR: 'bg-destructive/10 text-destructive border-destructive/30',
};

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function LogStream({ logs, maxHeight = '400px' }: LogStreamProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">Real-Time Log Stream</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-slow" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <ScrollArea style={{ height: maxHeight }} className="scrollbar-thin">
        <div className="font-mono text-xs">
          {logs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                'flex items-start gap-3 px-4 py-2 border-b border-border/50 hover:bg-accent/30 transition-colors animate-fade-in',
                index === 0 && 'bg-accent/20'
              )}
            >
              <span className="text-muted-foreground shrink-0 w-20">
                {formatTimestamp(log.timestamp)}
              </span>
              <span className="text-primary shrink-0 w-32 truncate">
                {log.service}
              </span>
              <span className={cn(
                'shrink-0 px-2 py-0.5 rounded text-[10px] font-medium border',
                levelBadgeStyles[log.level]
              )}>
                {log.level}
              </span>
              <span className={cn('flex-1 break-all', levelStyles[log.level])}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
