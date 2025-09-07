import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, TrendingUp, Globe } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
  { code: 'ILS', name: 'Israeli Shekel', flag: '🇮🇱' },
  { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'BGN', name: 'Bulgarian Lev', flag: '🇧🇬' },
  { code: 'HRK', name: 'Croatian Kuna', flag: '🇭🇷' },
  { code: 'ISK', name: 'Icelandic Krona', flag: '🇮🇸' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', flag: '🇺🇦' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲' },
  { code: 'JOD', name: 'Jordanian Dinar', flag: '🇯🇴' },
  { code: 'LBP', name: 'Lebanese Pound', flag: '🇱🇧' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰' },
  { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' },
  { code: 'MMK', name: 'Myanmar Kyat', flag: '🇲🇲' },
  { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭' },
  { code: 'LAK', name: 'Laotian Kip', flag: '🇱🇦' },
  { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵' },
  { code: 'AFN', name: 'Afghan Afghani', flag: '🇦🇫' },
  { code: 'IRR', name: 'Iranian Rial', flag: '🇮🇷' },
  { code: 'IQD', name: 'Iraqi Dinar', flag: '🇮🇶' },
  { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾' },
  { code: 'YER', name: 'Yemeni Rial', flag: '🇾🇪' },
  { code: 'GEL', name: 'Georgian Lari', flag: '🇬🇪' },
  { code: 'AMD', name: 'Armenian Dram', flag: '🇦🇲' },
  { code: 'AZN', name: 'Azerbaijani Manat', flag: '🇦🇿' },
  { code: 'KZT', name: 'Kazakhstani Tenge', flag: '🇰🇿' },
  { code: 'UZS', name: 'Uzbekistani Som', flag: '🇺🇿' },
  { code: 'KGS', name: 'Kyrgystani Som', flag: '🇰🇬' },
  { code: 'TJS', name: 'Tajikistani Somoni', flag: '🇹🇯' },
  { code: 'TMT', name: 'Turkmenistani Manat', flag: '🇹🇲' },
  { code: 'MNT', name: 'Mongolian Tugrik', flag: '🇲🇳' },
  { code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
  { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
  { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' },
  { code: 'BIF', name: 'Burundian Franc', flag: '🇧🇮' },
  { code: 'DJF', name: 'Djiboutian Franc', flag: '🇩🇯' },
  { code: 'SOS', name: 'Somali Shilling', flag: '🇸🇴' },
  { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'XOF', name: 'West African Franc', flag: '🌍' },
  { code: 'XAF', name: 'Central African Franc', flag: '🌍' },
  { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦' },
  { code: 'TND', name: 'Tunisian Dinar', flag: '🇹🇳' },
  { code: 'DZD', name: 'Algerian Dinar', flag: '🇩🇿' },
  { code: 'LYD', name: 'Libyan Dinar', flag: '🇱🇾' },
  { code: 'SDG', name: 'Sudanese Pound', flag: '🇸🇩' },
  { code: 'MUR', name: 'Mauritian Rupee', flag: '🇲🇺' },
  { code: 'SCR', name: 'Seychellois Rupee', flag: '🇸🇨' },
  { code: 'MGA', name: 'Malagasy Ariary', flag: '🇲🇬' },
  { code: 'KMF', name: 'Comorian Franc', flag: '🇰🇲' },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
  { code: 'BOB', name: 'Bolivian Boliviano', flag: '🇧🇴' },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪' },
  { code: 'UYU', name: 'Uruguayan Peso', flag: '🇺🇾' },
  { code: 'PYG', name: 'Paraguayan Guarani', flag: '🇵🇾' },
  { code: 'VEF', name: 'Venezuelan Bolívar', flag: '🇻🇪' },
  { code: 'GYD', name: 'Guyanese Dollar', flag: '🇬🇾' },
  { code: 'SRD', name: 'Surinamese Dollar', flag: '🇸🇷' },
  { code: 'AWG', name: 'Aruban Florin', flag: '🇦🇼' },
  { code: 'BBD', name: 'Barbadian Dollar', flag: '🇧🇧' },
  { code: 'BMD', name: 'Bermudian Dollar', flag: '🇧🇲' },
  { code: 'BSD', name: 'Bahamian Dollar', flag: '🇧🇸' },
  { code: 'BZD', name: 'Belize Dollar', flag: '🇧🇿' },
  { code: 'KYD', name: 'Cayman Islands Dollar', flag: '🇰🇾' },
  { code: 'XCD', name: 'East Caribbean Dollar', flag: '🌴' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', flag: '🇬🇹' },
  { code: 'HNL', name: 'Honduran Lempira', flag: '🇭🇳' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', flag: '🇳🇮' },
  { code: 'CRC', name: 'Costa Rican Colón', flag: '🇨🇷' },
  { code: 'PAB', name: 'Panamanian Balboa', flag: '🇵🇦' },
  { code: 'JMD', name: 'Jamaican Dollar', flag: '🇯🇲' },
  { code: 'HTG', name: 'Haitian Gourde', flag: '🇭🇹' },
  { code: 'DOP', name: 'Dominican Peso', flag: '🇩🇴' },
  { code: 'CUP', name: 'Cuban Peso', flag: '🇨🇺' },
  { code: 'TTD', name: 'Trinidad Dollar', flag: '🇹🇹' },
  { code: 'FJD', name: 'Fijian Dollar', flag: '🇫🇯' },
  { code: 'PGK', name: 'Papua New Guinea Kina', flag: '🇵🇬' },
  { code: 'SBD', name: 'Solomon Islands Dollar', flag: '🇸🇧' },
  { code: 'VUV', name: 'Vanuatu Vatu', flag: '🇻🇺' },
  { code: 'WST', name: 'Samoan Tala', flag: '🇼🇸' },
  { code: 'TOP', name: 'Tongan Paʻanga', flag: '🇹🇴' },
];

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchExchangeRates = async (baseCurrency: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Error fetching exchange rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates(fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    if (exchangeRates[toCurrency] && amount) {
      const result = parseFloat(amount) * exchangeRates[toCurrency];
      setConvertedAmount(result.toFixed(4));
    }
  }, [amount, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const getSelectedCurrency = (code: string) => {
    return currencies.find(currency => currency.code === code) || currencies[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Currency Converter</h1>
              <p className="text-sm text-gray-600">Real-time exchange rates for 100+ currencies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Amount Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-semibold text-gray-900 bg-gray-50 border-0 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              placeholder="Enter amount"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* From Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="relative">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border-0 rounded-xl p-4 pr-12 text-lg font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors cursor-pointer"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="relative">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border-0 rounded-xl p-4 pr-12 text-lg font-medium text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors cursor-pointer"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSwapCurrencies}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors group"
              disabled={loading}
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Converted Amount</span>
              </div>
              {loading && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="text-sm opacity-90">
                {amount} {getSelectedCurrency(fromCurrency).flag} {fromCurrency}
              </div>
              <div className="text-3xl font-bold">
                {loading ? '...' : convertedAmount} {getSelectedCurrency(toCurrency).flag} {toCurrency}
              </div>
              {exchangeRates[toCurrency] && (
                <div className="text-sm opacity-90">
                  1 {fromCurrency} = {exchangeRates[toCurrency].toFixed(4)} {toCurrency}
                </div>
              )}
            </div>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="text-center text-sm text-gray-500">
              Last updated: {lastUpdated}
            </div>
          )}
        </div>

        {/* Popular Currencies */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Exchange Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['USD', 'EUR', 'GBP', 'JPY'].map((currency) => {
              const rate = exchangeRates[currency];
              const currencyData = getSelectedCurrency(currency);
              return (
                <div
                  key={currency}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setToCurrency(currency)}
                >
                  <div className="text-sm text-gray-600">
                    {currencyData.flag} {currency}
                  </div>
                  <div className="font-semibold text-gray-900">
                    {rate ? rate.toFixed(4) : '...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;