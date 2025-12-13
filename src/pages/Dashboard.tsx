import { 
    Activity, 
    AlertTriangle, 
    FileText, 
    ShieldCheck 
  } from 'lucide-react';
  import { DashboardLayout } from '@/components/layout/DashboardLayout';
  import { Header } from '@/components/layout/Header';
  import { StatCard } from '@/components/dashboard/StatCard';
  import { LogStream } from '@/components/dashboard/LogStream';
  import { MetricsChart } from '@/components/dashboard/MetricsChart';
  import { IncidentTable } from '@/components/dashboard/IncidentTable';
  import { AIInsightBox } from '@/components/dashboard/AIInsightBox';
  import { StatusBadge } from '@/components/dashboard/StatusBadge';
  import { 
    mockLogs, 
    mockIncidents, 
    mockErrorRateData, 
    mockLogsPerMinuteData, 
    mockSystemMetrics,
    mockAIInsights 
  } from '@/data/mockData';
  
  export default function Dashboard() {
    return (
      <DashboardLayout>
        <Header 
          title="System Dashboard" 
          subtitle="Real-time monitoring and incident response" 
        />
        
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* System Status Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-medium text-muted-foreground">System Status</h2>
              <StatusBadge status={mockSystemMetrics.systemStatus} size="lg" />
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Logs per Minute"
              value={mockSystemMetrics.logsPerMinute.toLocaleString()}
              icon={FileText}
              trend={{ value: 12, isPositive: true }}
              subtitle="Across all services"
            />
            <StatCard
              title="Error Rate"
              value={`${mockSystemMetrics.errorRate}%`}
              icon={AlertTriangle}
              trend={{ value: 0.8, isPositive: false }}
              variant="warning"
              subtitle="Last 15 minutes"
            />
            <StatCard
              title="Active Incidents"
              value={mockSystemMetrics.activeIncidents}
              icon={Activity}
              variant={mockSystemMetrics.activeIncidents > 0 ? 'error' : 'success'}
              subtitle="Requiring attention"
            />
            <StatCard
              title="Services Healthy"
              value="6/8"
              icon={ShieldCheck}
              variant="success"
              subtitle="2 degraded"
            />
          </div>
  
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MetricsChart
              title="Error Rate Over Time"
              data={mockErrorRateData}
              type="area"
              color="hsl(var(--destructive))"
              unit="%"
              height={180}
            />
            <MetricsChart
              title="Logs Per Minute"
              data={mockLogsPerMinuteData}
              type="bar"
              color="hsl(var(--primary))"
              unit=" logs"
              height={180}
            />
          </div>
  
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Left Column - Logs & Incidents */}
            <div className="xl:col-span-2 space-y-4">
              <LogStream logs={mockLogs} maxHeight="280px" />
              <IncidentTable incidents={mockIncidents} />
            </div>
            
            {/* Right Column - AI Insights */}
            <div>
              <AIInsightBox insights={mockAIInsights} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  