'use client';

import { useState } from 'react';
import { LucideArrowRight } from 'lucide-react';

type Props = {
  initialConnected: boolean;
  onToggle?: (newState: boolean) => void;
}

export function StripeToggleButton({ initialConnected, onToggle }: Props) {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/toggle-stripe', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        const newConnectionState = !!data.stripeConnectId;
        setIsConnected(newConnectionState);
        
        // Call the parent callback to update parent state
        onToggle?.(newConnectionState);
      }
    } catch (err) {
      console.error('Toggle error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors ${
        isConnected
          ? 'bg-muted hover:bg-muted/80 text-foreground'
          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
      }`}
    >
      {loading ? 'Loading...' : isConnected ? 'Disconnect' : 'Connect with Stripe'}
      <LucideArrowRight size={16} />
    </button>
  );
}