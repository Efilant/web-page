'use client';

import { useEffect } from 'react';

export default function VisitTracker() {
  useEffect(() => {
    void fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname }),
    });
  }, []);

  return null;
}
