// Mock data for the incident response dashboard
// Structured for easy replacement with real-time data

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';
export type Severity = 'low' | 'medium' | 'high';
export type IncidentStatus = 'open' | 'investigating' | 'resolved';
export type SystemStatus = 'healthy' | 'degraded' | 'outage';

export interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  level: LogLevel;
  message: string;
}

export interface Incident {
  id: string;
  severity: Severity;
  service: string;
  status: IncidentStatus;
  createdAt: string;
  title: string;
  description: string;
  aiSummary?: string;
  timeline?: TimelineEvent[];
  relatedLogs?: LogEntry[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'alert' | 'action' | 'update' | 'resolution';
  description: string;
}

export interface Service {
  id: string;
  name: string;
  status: SystemStatus;
  errorRate: number;
  lastIncident: string | null;
  uptime: number;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export interface SystemMetrics {
  logsPerMinute: number;
  errorRate: number;
  activeIncidents: number;
  systemStatus: SystemStatus;
}

// Generate timestamps for the last hour
const generateTimestamps = (count: number): string[] => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getTime() - (count - i) * 60000);
    return d.toISOString();
  });
};

const timestamps = generateTimestamps(60);

export const mockLogs: LogEntry[] = [
  { id: '1', timestamp: new Date().toISOString(), service: 'auth-service', level: 'ERROR', message: 'Failed to validate JWT token: TokenExpiredError' },
  { id: '2', timestamp: new Date(Date.now() - 5000).toISOString(), service: 'api-gateway', level: 'WARN', message: 'Rate limit threshold reached for IP 192.168.1.45' },
  { id: '3', timestamp: new Date(Date.now() - 12000).toISOString(), service: 'user-service', level: 'INFO', message: 'Successfully processed batch update for 1,247 user records' },
  { id: '4', timestamp: new Date(Date.now() - 18000).toISOString(), service: 'payment-service', level: 'ERROR', message: 'Database connection timeout after 30000ms' },
  { id: '5', timestamp: new Date(Date.now() - 25000).toISOString(), service: 'notification-service', level: 'INFO', message: 'Email queue processed: 892 messages sent' },
  { id: '6', timestamp: new Date(Date.now() - 32000).toISOString(), service: 'auth-service', level: 'WARN', message: 'Multiple failed login attempts detected for user admin@company.com' },
  { id: '7', timestamp: new Date(Date.now() - 40000).toISOString(), service: 'cache-service', level: 'INFO', message: 'Cache invalidation completed for key pattern user:*' },
  { id: '8', timestamp: new Date(Date.now() - 48000).toISOString(), service: 'api-gateway', level: 'ERROR', message: 'Circuit breaker opened for payment-service endpoint' },
  { id: '9', timestamp: new Date(Date.now() - 55000).toISOString(), service: 'search-service', level: 'INFO', message: 'Index rebuild completed in 4.2 seconds' },
  { id: '10', timestamp: new Date(Date.now() - 62000).toISOString(), service: 'auth-service', level: 'WARN', message: 'OAuth provider response time exceeding threshold: 2.3s' },
];

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    severity: 'high',
    service: 'auth-service',
    status: 'investigating',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    title: 'Authentication Service Degradation',
    description: 'Users experiencing intermittent authentication failures',
    aiSummary: 'Possible memory leak detected in auth-service. Analysis shows heap usage increased by 340% over the last 2 hours. Token validation latency spiked from 12ms to 890ms. Recommended actions: 1) Restart auth-service pods 2) Enable heap dump collection 3) Check for recent deployments affecting token caching.',
    timeline: [
      { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'alert', description: 'Alert triggered: Auth service error rate exceeded 5%' },
      { id: '2', timestamp: new Date(Date.now() - 3300000).toISOString(), type: 'action', description: 'On-call engineer acknowledged alert' },
      { id: '3', timestamp: new Date(Date.now() - 3000000).toISOString(), type: 'update', description: 'Investigation started: Analyzing service logs and metrics' },
      { id: '4', timestamp: new Date(Date.now() - 2400000).toISOString(), type: 'update', description: 'AI analysis completed: Memory leak pattern identified' },
    ],
    relatedLogs: mockLogs.filter(log => log.service === 'auth-service'),
  },
  {
    id: 'INC-2024-002',
    severity: 'medium',
    service: 'payment-service',
    status: 'open',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    title: 'Database Connection Pool Exhaustion',
    description: 'Payment processing delays due to database connectivity issues',
    aiSummary: 'Database connection pool exhaustion detected. Current connections: 100/100. Query analysis shows long-running transactions from batch processing jobs blocking the pool. Suggested action: Increase pool size temporarily and optimize batch job queries.',
  },
  {
    id: 'INC-2024-003',
    severity: 'low',
    service: 'notification-service',
    status: 'resolved',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    title: 'Email Delivery Delays',
    description: 'Transactional emails delayed by up to 15 minutes',
    aiSummary: 'Root cause identified: SMTP provider rate limiting. Resolution: Implemented exponential backoff and queue prioritization. Email delivery times normalized.',
  },
];

export const mockServices: Service[] = [
  { id: '1', name: 'auth-service', status: 'degraded', errorRate: 4.8, lastIncident: new Date(Date.now() - 3600000).toISOString(), uptime: 99.2 },
  { id: '2', name: 'api-gateway', status: 'healthy', errorRate: 0.3, lastIncident: new Date(Date.now() - 604800000).toISOString(), uptime: 99.99 },
  { id: '3', name: 'user-service', status: 'healthy', errorRate: 0.1, lastIncident: null, uptime: 99.98 },
  { id: '4', name: 'payment-service', status: 'degraded', errorRate: 2.1, lastIncident: new Date(Date.now() - 7200000).toISOString(), uptime: 99.5 },
  { id: '5', name: 'notification-service', status: 'healthy', errorRate: 0.2, lastIncident: new Date(Date.now() - 86400000).toISOString(), uptime: 99.95 },
  { id: '6', name: 'search-service', status: 'healthy', errorRate: 0.05, lastIncident: null, uptime: 99.99 },
  { id: '7', name: 'cache-service', status: 'healthy', errorRate: 0.0, lastIncident: null, uptime: 100 },
  { id: '8', name: 'analytics-service', status: 'healthy', errorRate: 0.15, lastIncident: new Date(Date.now() - 2592000000).toISOString(), uptime: 99.97 },
];

export const mockErrorRateData: MetricPoint[] = timestamps.map((time, i) => ({
  time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  value: Math.max(0, 1.5 + Math.sin(i / 10) * 1.2 + (i > 45 ? 2.5 : 0) + Math.random() * 0.5),
}));

export const mockLogsPerMinuteData: MetricPoint[] = timestamps.map((time, i) => ({
  time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  value: Math.floor(800 + Math.sin(i / 15) * 200 + Math.random() * 100),
}));

export const mockSystemMetrics: SystemMetrics = {
  logsPerMinute: 1247,
  errorRate: 3.2,
  activeIncidents: 2,
  systemStatus: 'degraded',
};

export const mockAIInsights = [
  {
    id: '1',
    type: 'critical' as const,
    title: 'Memory Leak Pattern Detected',
    service: 'auth-service',
    message: 'Possible memory leak detected in auth-service. Heap usage increased by 340% over the last 2 hours. Suggested action: restart service and inspect heap usage.',
    confidence: 94,
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Anomalous Traffic Pattern',
    service: 'api-gateway',
    message: 'Unusual spike in API requests from region us-east-1. Pattern suggests possible DDoS attempt or misconfigured client. Consider enabling enhanced rate limiting.',
    confidence: 78,
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Performance Optimization Opportunity',
    service: 'search-service',
    message: 'Query analysis shows 23% of search requests could benefit from caching. Estimated latency improvement: 150ms average.',
    confidence: 86,
  },
];
