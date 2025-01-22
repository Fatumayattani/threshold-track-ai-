import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { AlertForm } from './components/AlertForm';
import { AlertList } from './components/AlertList';
import { fetchPrice, checkPriceAlert } from './utils/gemini-api';
import type { PriceAlert } from './types/gemini';

function App() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const symbols = new Set(alerts.map(alert => alert.symbol));
    const checkPrices = async () => {
      for (const symbol of symbols) {
        try {
          const price = await fetchPrice(symbol);
          setPrices(prev => ({ ...prev, [symbol]: price }));

          // Check alerts for this symbol
          alerts
            .filter(alert => alert.active && alert.symbol === symbol)
            .forEach(alert => {
              if (checkPriceAlert(price, alert)) {
                const direction = alert.type === 'above' ? 'above' : 'below';
                toast.custom((t) => (
                  <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <AlertTriangle className="h-10 w-10 text-yellow-500" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Price Alert: {alert.symbol.toUpperCase()}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Current price (${price.toLocaleString()}) is {direction} your threshold of ${alert.threshold.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              }
            });
        } catch (error) {
          console.error(`Error fetching price for ${symbol}:`, error);
        }
      }
    };

    const interval = setInterval(checkPrices, 10000); // Check every 10 seconds
    checkPrices(); // Initial check

    return () => clearInterval(interval);
  }, [alerts]);

  const handleAddAlert = (newAlert: Omit<PriceAlert, 'id'>) => {
    const alert: PriceAlert = {
      ...newAlert,
      id: crypto.randomUUID(),
    };
    setAlerts(prev => [...prev, alert]);
    toast.success('Alert added successfully');
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast.success('Alert deleted');
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Threshold Track
        </h1>
        
        <AlertForm onAddAlert={handleAddAlert} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Alerts</h2>
          <AlertList 
            alerts={alerts}
            onDeleteAlert={handleDeleteAlert}
            onToggleAlert={handleToggleAlert}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Prices</h2>
          <div className="space-y-2">
            {Object.entries(prices).map(([symbol, price]) => (
              <div key={symbol} className="flex justify-between items-center">
                <span className="font-medium">{symbol.toUpperCase()}</span>
                <span>${price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;