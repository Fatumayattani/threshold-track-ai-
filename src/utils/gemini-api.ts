const GEMINI_API_BASE = 'https://api.gemini.com/v1';

export async function fetchPrice(symbol: string): Promise<number> {
  try {
    const response = await fetch(`${GEMINI_API_BASE}/pubticker/${symbol}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return parseFloat(data.last);
  } catch (error) {
    console.error('Error fetching price:', error);
    throw error;
  }
}

export function checkPriceAlert(currentPrice: number, alert: { threshold: number; type: 'above' | 'below' }): boolean {
  return alert.type === 'above' 
    ? currentPrice >= alert.threshold 
    : currentPrice <= alert.threshold;
}