import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  generateHistoricalData,
  generateFilterData,
  mockUserData,
  mockDeviceData,
  calculateDailyStats,
  generateWaterQualityReading,
} from '../utils/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize with mock data
  const [historicalData, setHistoricalData] = useState([]);
  const [currentReading, setCurrentReading] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [userData, setUserData] = useState(mockUserData);
  const [deviceData, setDeviceData] = useState(mockDeviceData);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = () => {
      const historical = generateHistoricalData(30);
      setHistoricalData(historical);
      setCurrentReading(historical[historical.length - 1]);
      setFilterData(generateFilterData(45));
      setIsLoading(false);
    };

    // Simulate loading delay
    setTimeout(initializeData, 500);
  }, []);

  // Simulate live data updates every 2 minutes
  useEffect(() => {
    if (!currentReading) return;

    const interval = setInterval(() => {
      const newReading = generateWaterQualityReading(new Date());
      setCurrentReading(newReading);
      setHistoricalData((prev) => [...prev, newReading]);
    }, 2 * 60 * 1000); // Every 2 minutes

    return () => clearInterval(interval);
  }, [currentReading]);

  // Calculate stats
  const dailyStats = historicalData.length ? calculateDailyStats(historicalData) : null;

  // User actions
  const createAccount = (email, householdSize) => {
    setUserData({
      ...userData,
      userId: `user-${Date.now()}`,
      email,
      householdSize,
      createdAt: new Date().toISOString(),
    });
  };

  const updatePreferences = (preferences) => {
    setUserData({
      ...userData,
      preferences: { ...userData.preferences, ...preferences },
    });
  };

  const replaceFilter = () => {
    setFilterData(generateFilterData(0)); // New filter
  };

  const value = {
    // Data
    historicalData,
    currentReading,
    filterData,
    userData,
    deviceData,
    dailyStats,
    isLoading,

    // Actions
    createAccount,
    updatePreferences,
    replaceFilter,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
