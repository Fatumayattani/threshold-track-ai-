import React from 'react';
import { Trash2 } from 'lucide-react';
import type { PriceAlert } from '../types/gemini';

interface AlertListProps {
  alerts: PriceAlert[];
  onDeleteAlert: (id: string) => void;
  onToggleAlert: (id: string) => void;
}

export function AlertList({ alerts, onDeleteAlert, onToggleAlert }: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No alerts set. Add one above to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={alert.active}
              onChange={() => onToggleAlert(alert.id)}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div>
              <h3 className="font-medium">
                {alert.symbol.toUpperCase()} {alert.type === 'above' ? '≥' : '≤'} ${alert.threshold.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">
                Alert when price goes {alert.type} ${alert.threshold.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => onDeleteAlert(alert.id)}
            className="text-red-500 hover:text-red-600 p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}