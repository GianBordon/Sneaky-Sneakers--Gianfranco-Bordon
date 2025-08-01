import React, { useEffect, useRef } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const UserBehaviorTracker = () => {
  const { trackUserBehavior, trackPerformance } = useAnalytics();
  const lastScrollPosition = useRef(0);
  const scrollTimeout = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const sessionStartTime = useRef(Date.now());

  useEffect(() => {
    // Track performance metrics
    trackPerformance({
      page_load_time: performance.now(),
      dom_content_loaded: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0,
      first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    });

    // Scroll tracking
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDirection = currentScroll > lastScrollPosition.current ? 'down' : 'up';
      const scrollPercentage = Math.round((currentScroll / (document.body.scrollHeight - window.innerHeight)) * 100);

      // Track significant scroll events
      if (Math.abs(currentScroll - lastScrollPosition.current) > 100) {
        trackUserBehavior('scroll', {
          direction: scrollDirection,
          percentage: scrollPercentage,
          position: currentScroll
        });
        lastScrollPosition.current = currentScroll;
      }

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set new timeout for scroll end
      scrollTimeout.current = setTimeout(() => {
        trackUserBehavior('scroll_end', {
          final_position: currentScroll,
          final_percentage: scrollPercentage
        });
      }, 1000);
    };

    // Click tracking
    const handleClick = (event) => {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      const className = target.className || '';
      const id = target.id || '';
      const text = target.textContent?.trim().substring(0, 50) || '';

      // Track clicks on interactive elements
      if (tagName === 'button' || tagName === 'a' || target.closest('button') || target.closest('a')) {
        trackUserBehavior('click', {
          element_type: tagName,
          element_class: className,
          element_id: id,
          element_text: text,
          page_url: window.location.href
        });
      }
    };

    // Mouse movement tracking (throttled)
    let mouseTimeout;
    const handleMouseMove = (event) => {
      if (mouseTimeout) return;

      mouseTimeout = setTimeout(() => {
        const deltaX = Math.abs(event.clientX - mousePosition.current.x);
        const deltaY = Math.abs(event.clientY - mousePosition.current.y);

        // Track significant mouse movements
        if (deltaX > 50 || deltaY > 50) {
          trackUserBehavior('mouse_movement', {
            delta_x: deltaX,
            delta_y: deltaY,
            position: { x: event.clientX, y: event.clientY }
          });
        }

        mousePosition.current = { x: event.clientX, y: event.clientY };
        mouseTimeout = null;
      }, 500);
    };

    // Form interaction tracking
    const handleFormInteraction = (event) => {
      const target = event.target;
      if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
        trackUserBehavior('form_interaction', {
          action: event.type,
          field_type: target.type || 'text',
          field_name: target.name || '',
          field_id: target.id || ''
        });
      }
    };

    // Keyboard tracking (for search and navigation)
    const handleKeyPress = (event) => {
      if (event.target.tagName.toLowerCase() === 'input' && event.target.type === 'search') {
        trackUserBehavior('search_input', {
          key: event.key,
          field_value: event.target.value
        });
      }
    };

    // Page visibility tracking
    const handleVisibilityChange = () => {
      trackUserBehavior('page_visibility', {
        is_visible: !document.hidden,
        duration: Date.now() - sessionStartTime.current
      });
    };

    // Error tracking
    const handleError = (event) => {
      trackUserBehavior('error', {
        error_type: 'javascript',
        error_message: event.message,
        error_filename: event.filename,
        error_lineno: event.lineno
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('focusin', handleFormInteraction, { passive: true });
    document.addEventListener('input', handleFormInteraction, { passive: true });
    document.addEventListener('keypress', handleKeyPress, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    window.addEventListener('error', handleError, { passive: true });

    // Track page load completion
    const trackPageLoad = () => {
      trackUserBehavior('page_load_complete', {
        load_time: performance.now(),
        page_url: window.location.href,
        user_agent: navigator.userAgent
      });
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad, { passive: true });
    }

    // Track session start
    trackUserBehavior('session_start', {
      session_id: sessionStartTime.current,
      page_url: window.location.href,
      referrer: document.referrer
    });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('focusin', handleFormInteraction);
      document.removeEventListener('input', handleFormInteraction);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('error', handleError);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Track session end
      const sessionDuration = Date.now() - sessionStartTime.current;
      trackUserBehavior('session_end', {
        session_id: sessionStartTime.current,
        duration: sessionDuration,
        page_url: window.location.href
      });
    };
  }, [trackUserBehavior, trackPerformance]);

  // This component doesn't render anything visible
  return null;
};

export default UserBehaviorTracker; 