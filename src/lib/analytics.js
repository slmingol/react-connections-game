/**
 * Analytics utility for tracking game events
 * 
 * This is a framework-agnostic wrapper that can be connected to any
 * analytics provider (Google Analytics, Plausible, Mixpanel, etc.)
 * 
 * To enable analytics, set window.analytics to your analytics instance
 * or configure the provider in your index.js before mounting the app.
 */

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} properties - Event properties
 */
export function trackEvent(eventName, properties = {}) {
  // Google Analytics 4 (gtag)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Plausible
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: properties });
  }
  
  // Custom analytics instance
  if (typeof window !== 'undefined' && window.analytics?.track) {
    window.analytics.track(eventName, properties);
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }
}

/**
 * Track page view
 * @param {string} path - Page path
 */
export function trackPageView(path) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', window.GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
  
  // Plausible (automatically tracks page views)
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview');
  }
  
  // Custom analytics
  if (typeof window !== 'undefined' && window.analytics?.page) {
    window.analytics.page(path);
  }
}

/**
 * Track game-specific events
 */
export const GameEvents = {
  // Game lifecycle
  GAME_STARTED: 'game_started',
  GAME_WON: 'game_won',
  GAME_LOST: 'game_lost',
  
  // Player actions
  WORD_SELECTED: 'word_selected',
  GUESS_SUBMITTED: 'guess_submitted',
  GUESS_CORRECT: 'guess_correct',
  GUESS_INCORRECT: 'guess_incorrect',
  
  // UI interactions
  SHUFFLE_CLICKED: 'shuffle_clicked',
  DESELECT_CLICKED: 'deselect_clicked',
  VIEW_RESULTS_CLICKED: 'view_results_clicked',
  SHARE_SCORE_CLICKED: 'share_score_clicked',
  INFO_MODAL_OPENED: 'info_modal_opened',
};

/**
 * Track game events with standardized properties
 */
export function trackGameEvent(event, properties = {}) {
  trackEvent(event, {
    category: 'game',
    ...properties,
  });
}

/**
 * Track web vitals metrics
 * Can be used with reportWebVitals() from performance.js
 */
export function trackWebVital(metric) {
  const { name, value, rating, id } = metric;
  
  // Send to analytics
  trackEvent('web_vitals', {
    category: 'performance',
    metric_name: name,
    metric_value: Math.round(value),
    metric_rating: rating,
    metric_id: id,
  });
}
