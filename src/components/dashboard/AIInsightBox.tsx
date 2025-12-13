import { Sparkles, AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsight {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  service: string;
  message: string;
  confidence: number;
}

interface AIInsightBoxProps {
  insights: AIInsight[];
}

const typeConfig = {
  critical: {
    icon: XCircle,
    borderClass: 'border-destructive/40',
    bgClass: 'bg-destructive/5',
    iconClass: 'text-destructive',
    badgeClass: 'bg-destructive/10 text-destructive',
  },
  warning: {
    icon: AlertTriangle,
    borderClass: 'border-warning/40',
    bgClass: 'bg-warning/5',
    iconClass: 'text-warning',
    badgeClass: 'bg-warning/10 text-warning',
  },
  info: {
    icon: Info,
    borderClass: 'border-info/40',
    bgClass: 'bg-info/5',
    iconClass: 'text-info',
    badgeClass: 'bg-info/10 text-info',
  },
};

export function AIInsightBox({ insights }: AIInsightBoxProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">AI Insights</h3>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {insights.length} active
        </span>
      </div>
      <div className="divide-y divide-border">
        {insights.map((insight) => {
          const config = typeConfig[insight.type];
          const TypeIcon = config.icon;
          
          return (
            <div 
              key={insight.id} 
              className={cn(
                'p-4 border-l-2 transition-colors hover:bg-accent/20',
                config.borderClass,
                config.bgClass
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('mt-0.5 shrink-0', config.iconClass)}>
                  <TypeIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{insight.title}</span>
                    <span className={cn(
                      'px-1.5 py-0.5 rounded text-[10px] font-medium',
                      config.badgeClass
                    )}>
                      {insight.service}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.message}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
