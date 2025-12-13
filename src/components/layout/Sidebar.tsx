import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Server, 
  Settings,
  Activity,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/services', label: 'Services', icon: Server },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="h-14 flex items-center gap-2 px-4 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-sm">Incident Response</h1>
          <p className="text-[10px] text-muted-foreground">AI-Powered SRE</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to !== '/' && location.pathname.startsWith(item.to));
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-slow" />
          <span className="text-xs text-sidebar-foreground/70">System Online</span>
        </div>
      </div>
    </aside>
  );
}
