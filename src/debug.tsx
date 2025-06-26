import * as React from 'react';
import { PLATFORM_TO_ICON } from './platformIcon';

type PlatformName = keyof typeof PLATFORM_TO_ICON;

interface IconUsageStats {
  platform: string;
  icon: string;
  loadCount: number;
  loadTime: number;
  lastLoaded: Date;
  format: 'sm' | 'lg';
}

class IconDebugger {
  private stats: Map<string, IconUsageStats> = new Map();
  private isEnabled: boolean = process.env.NODE_ENV === 'development';

  recordIconLoad(platform: string, icon: string, format: 'sm' | 'lg', loadTime: number) {
    if (!this.isEnabled) return;

    const key = `${icon}-${format}`;
    const existing = this.stats.get(key);

    if (existing) {
      existing.loadCount++;
      existing.loadTime += loadTime;
      existing.lastLoaded = new Date();
    } else {
      this.stats.set(key, {
        platform,
        icon,
        loadCount: 1,
        loadTime,
        lastLoaded: new Date(),
        format
      });
    }
  }

  getStats(): IconUsageStats[] {
    return Array.from(this.stats.values()).sort((a, b) => b.loadCount - a.loadCount);
  }

  getMostUsedIcons(limit: number = 10): IconUsageStats[] {
    return this.getStats().slice(0, limit);
  }

  getUnusedIcons(): PlatformName[] {
    const usedIcons = new Set(this.getStats().map(stat => stat.icon));
    const allIcons = new Set(Object.values(PLATFORM_TO_ICON));
    
    return Array.from(allIcons).filter(icon => !usedIcons.has(icon)) as PlatformName[];
  }

  getTotalBundleSize(): { estimated: string; icons: number } {
    const allIcons = Object.values(PLATFORM_TO_ICON);
    const avgIconSize = 1.2; // KB - rough estimate based on your SVGs
    const totalSize = allIcons.length * avgIconSize * 2; // sm + lg versions
    
    return {
      estimated: `${totalSize.toFixed(1)} KB`,
      icons: allIcons.length
    };
  }

  getOptimizedBundleSize(): { estimated: string; icons: number; savings: string } {
    const usedIcons = this.getStats();
    const avgIconSize = 1.2; // KB
    const optimizedSize = usedIcons.length * avgIconSize;
    const fullSize = Object.values(PLATFORM_TO_ICON).length * avgIconSize * 2;
    const savings = ((fullSize - optimizedSize) / fullSize * 100).toFixed(1);
    
    return {
      estimated: `${optimizedSize.toFixed(1)} KB`,
      icons: usedIcons.length,
      savings: `${savings}%`
    };
  }

  logReport() {
    if (!this.isEnabled) return;

    console.group('🎯 Platform Icons Usage Report');
    
    console.log('📊 Most Used Icons:');
    this.getMostUsedIcons(5).forEach((stat, i) => {
      console.log(`${i + 1}. ${stat.icon} (${stat.platform}) - ${stat.loadCount} loads`);
    });

    console.log('\n📦 Bundle Analysis:');
    const full = this.getTotalBundleSize();
    const optimized = this.getOptimizedBundleSize();
    console.log(`Full bundle: ${full.estimated} (${full.icons} icons)`);
    console.log(`Optimized: ${optimized.estimated} (${optimized.icons} icons)`);
    console.log(`Potential savings: ${optimized.savings}`);

    const unused = this.getUnusedIcons();
    if (unused.length > 0) {
      console.log(`\n🚫 Unused icons (${unused.length}):`, unused.slice(0, 10).join(', '));
    }

    console.groupEnd();
  }

  clear() {
    this.stats.clear();
  }
}

export const iconDebugger = new IconDebugger();

// Helper to validate platform names at development time
export function validatePlatform(platform: string): boolean {
  const normalizedPlatform = platform.replace(".", "-").replace(/^node-/, 'javascript-');
  const isValid = normalizedPlatform in PLATFORM_TO_ICON;
  
  if (!isValid && process.env.NODE_ENV === 'development') {
    console.warn(`⚠️ Unknown platform: "${platform}". Available platforms:`, Object.keys(PLATFORM_TO_ICON));
  }
  
  return isValid;
}

// Development-only component to show icon usage overlay
export function IconDebugOverlay({ enabled = false }: { enabled?: boolean }) {
  if (!enabled || process.env.NODE_ENV !== 'development') return null;

  const [stats, setStats] = React.useState<IconUsageStats[]>([]);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(iconDebugger.getStats());
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <strong>🎯 Icon Usage ({stats.length})</strong>
      {stats.slice(0, 5).map(stat => (
        <div key={`${stat.icon}-${stat.format}`}>
          {stat.icon}: {stat.loadCount}x
        </div>
      ))}
      <button 
        onClick={() => iconDebugger.logReport()}
        style={{ marginTop: '5px', fontSize: '10px' }}
      >
        Log Full Report
      </button>
    </div>
  );
}

// Hook to track icon performance
export function useIconPerformance() {
  const [metrics, setMetrics] = React.useState({
    totalIcons: 0,
    loadedIcons: 0,
    averageLoadTime: 0
  });

  React.useEffect(() => {
    const stats = iconDebugger.getStats();
    const totalLoadTime = stats.reduce((sum, stat) => sum + stat.loadTime, 0);
    
    setMetrics({
      totalIcons: Object.keys(PLATFORM_TO_ICON).length,
      loadedIcons: stats.length,
      averageLoadTime: stats.length > 0 ? totalLoadTime / stats.length : 0
    });
  }, []);

  return metrics;
} 