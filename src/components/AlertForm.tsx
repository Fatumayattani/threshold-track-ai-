import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import type { PriceAlert } from '../types/gemini';

interface AlertFormProps {
  onAddAlert: (alert: Omit<PriceAlert, 'id'>) => void;
}

export function AlertForm({ onAddAlert }: AlertFormProps) {
  const [symbol, setSymbol] = useState('btcusd');
  const [threshold, setThreshold] = useState('');
  const [type, setType] = useState<'above' | 'below'>('above');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !threshold) return;

    onAddAlert({
      symbol: symbol.toLowerCase(),
      threshold: parseFloat(threshold),
      type,
      active: true,
    });

    setThreshold('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
            Symbol
          </label>
          <select
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <optgroup label="Major Cryptocurrencies">
              <option value="btcusd">BTC/USD - Bitcoin</option>
              <option value="ethusd">ETH/USD - Ethereum</option>
              <option value="solusd">SOL/USD - Solana</option>
              <option value="icpusd">ICP/USD - Internet Computer</option>
            </optgroup>
            <optgroup label="Layer 2 & Ecosystems">
              <option value="maticusd">MATIC/USD - Polygon</option>
              <option value="arbusdt">ARB/USD - Arbitrum</option>
              <option value="opusd">OP/USD - Optimism</option>
              <option value="baseusd">BASE/USD - Base</option>
            </optgroup>
            <optgroup label="DeFi Tokens">
              <option value="aaveusd">AAVE/USD - Aave</option>
              <option value="uniusd">UNI/USD - Uniswap</option>
              <option value="mkrusd">MKR/USD - Maker</option>
              <option value="snxusd">SNX/USD - Synthetix</option>
            </optgroup>
            <optgroup label="Other Popular Coins">
              <option value="dogeusd">DOGE/USD - Dogecoin</option>
              <option value="ltcusd">LTC/USD - Litecoin</option>
              <option value="linkusd">LINK/USD - Chainlink</option>
              <option value="atomusd">ATOM/USD - Cosmos</option>
              <option value="avaxusd">AVAX/USD - Avalanche</option>
              <option value="ftmusd">FTM/USD - Fantom</option>
              <option value="nearusd">NEAR/USD - NEAR Protocol</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
            Price Threshold (USD)
          </label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alert Type</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="above"
                checked={type === 'above'}
                onChange={(e) => setType(e.target.value as 'above')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Above</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="below"
                checked={type === 'below'}
                onChange={(e) => setType(e.target.value as 'below')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Below</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Bell size={20} />
          Add Alert
        </button>
      </div>
    </form>
  );
}