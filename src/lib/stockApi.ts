export interface TimeSeriesData {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

export interface StockApiResponse {
  "Meta Data"?: {
    "2. Symbol": string;
  };
  "Time Series (Daily)"?: TimeSeriesData;
  Note?: string;
  "Error Message"?: string;
}

export const fetchStockData = async (symbol: string, apiKey: string): Promise<StockApiResponse> => {
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(apiUrl);
  return response.json();
};

export const parseStockData = (timeSeries: TimeSeriesData, days: number = 30) => {
  const dates = Object.keys(timeSeries).slice(0, days);
  const prices = dates.map((date) => parseFloat(timeSeries[date]["4. close"]));
  const volumes = dates.map((date) => parseFloat(timeSeries[date]["5. volume"]));
  const highs = dates.map((date) => parseFloat(timeSeries[date]["2. high"]));
  const lows = dates.map((date) => parseFloat(timeSeries[date]["3. low"]));
  const opens = dates.map((date) => parseFloat(timeSeries[date]["1. open"]));

  return { dates, prices, volumes, highs, lows, opens };
};
