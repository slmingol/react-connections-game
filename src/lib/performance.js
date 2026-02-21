import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Reports Core Web Vitals metrics to the console in development
 * and to analytics in production
 * 
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Loading performance
 * - INP (Interaction to Next Paint): Responsiveness
 * - LCP (Largest Contentful Paint): Loading performance
 * - TTFB (Time to First Byte): Server response time
 * 
 * Note: FID (First Input Delay) has been deprecated in favor of INP
 */
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

/**
 * Default handler that logs metrics to console in development
 * Override this by passing your own handler to reportWebVitals()
 */
export function logWebVitals(metric) {
  const { name, value, rating, delta } = metric;
  
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name,
      value: `${Math.round(value)}ms`,
      rating,
      delta: `${Math.round(delta)}ms`,
    });
  }
}

/**
 * Thresholds for Core Web Vitals ratings
 * https://web.dev/vitals/
 */
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};
