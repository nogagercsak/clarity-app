// Mock data generation for Clarity app

// Helper to generate random number in range
const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Helper to generate random integer in range
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max));

// Generate quality score based on particle count (0-100, higher is better)
const calculateQualityScore = (particleCount) => {
  if (particleCount === 0) return 100;
  if (particleCount < 5) return randomIntInRange(90, 99);
  if (particleCount < 15) return randomIntInRange(75, 89);
  if (particleCount < 30) return randomIntInRange(60, 74);
  if (particleCount < 50) return randomIntInRange(40, 59);
  return randomIntInRange(20, 39);
};

// Generate particle breakdown
const generateParticleBreakdown = (totalCount) => {
  if (totalCount === 0) {
    return { small: 0, medium: 0, large: 0 };
  }

  // Small particles are most common (60-70%)
  const small = Math.floor(totalCount * randomInRange(0.6, 0.7));
  // Medium particles (20-30%)
  const medium = Math.floor(totalCount * randomInRange(0.2, 0.3));
  // Large particles (remaining)
  const large = totalCount - small - medium;

  return { small, medium, large: Math.max(0, large) };
};

// Generate a single water quality reading
export const generateWaterQualityReading = (timestamp, isContaminationEvent = false) => {
  let particleCount;

  if (isContaminationEvent) {
    // Contamination event - higher particle count
    particleCount = randomIntInRange(30, 80);
  } else {
    // Normal reading - mostly safe with occasional low contamination
    const rand = Math.random();
    if (rand < 0.7) {
      // 70% chance of clean water
      particleCount = randomIntInRange(0, 5);
    } else if (rand < 0.9) {
      // 20% chance of low contamination
      particleCount = randomIntInRange(5, 15);
    } else {
      // 10% chance of moderate contamination
      particleCount = randomIntInRange(15, 30);
    }
  }

  const qualityScore = calculateQualityScore(particleCount);
  const particleBreakdown = generateParticleBreakdown(particleCount);
  const ppmLevel = (particleCount * randomInRange(0.8, 1.2)).toFixed(2);

  return {
    timestamp: timestamp.toISOString(),
    qualityScore,
    particleCount,
    particleBreakdown,
    ppmLevel: parseFloat(ppmLevel),
    isFiltering: qualityScore < 75,
  };
};

// Generate historical data for the last N days
export const generateHistoricalData = (days = 30) => {
  const data = [];
  const now = new Date();

  // Generate readings every 2 hours
  const readingsPerDay = 12;
  const totalReadings = days * readingsPerDay;

  for (let i = totalReadings - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 2 * 60 * 60 * 1000);

    // Create occasional contamination events (5% chance)
    const isContaminationEvent = Math.random() < 0.05;

    data.push(generateWaterQualityReading(timestamp, isContaminationEvent));
  }

  return data;
};

// Get current water quality (most recent reading)
export const getCurrentWaterQuality = () => {
  const historicalData = generateHistoricalData(1);
  return historicalData[historicalData.length - 1];
};

// Generate filter data
export const generateFilterData = (installDateDaysAgo = 45) => {
  const installDate = new Date();
  installDate.setDate(installDate.getDate() - installDateDaysAgo);

  // Filter life is typically 6 months (180 days)
  const filterLifeDays = 180;
  const daysUsed = installDateDaysAgo;
  const lifeRemaining = Math.max(0, Math.min(100, ((filterLifeDays - daysUsed) / filterLifeDays) * 100));

  // Activation count - rough estimate based on contamination events
  const activationCount = Math.floor(daysUsed * 0.3); // ~30% of days have filtration events

  return {
    filterId: 'filter-001',
    deviceId: 'device-clarity-001',
    installDate: installDate.toISOString(),
    lifeRemaining: parseFloat(lifeRemaining.toFixed(1)),
    activationCount,
    status: lifeRemaining > 20 ? 'good' : lifeRemaining > 10 ? 'replace-soon' : 'replace-now',
  };
};

// Calculate daily statistics
export const calculateDailyStats = (readings) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayReadings = readings.filter((r) => {
    const readingDate = new Date(r.timestamp);
    readingDate.setHours(0, 0, 0, 0);
    return readingDate.getTime() === today.getTime();
  });

  const totalParticles = todayReadings.reduce((sum, r) => sum + r.particleCount, 0);
  const avgQualityScore = todayReadings.length
    ? Math.round(todayReadings.reduce((sum, r) => sum + r.qualityScore, 0) / todayReadings.length)
    : 100;

  return {
    totalParticles,
    avgQualityScore,
    readingsCount: todayReadings.length,
  };
};

// Calculate weekly statistics
export const calculateWeeklyStats = (readings) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weekReadings = readings.filter((r) => new Date(r.timestamp) >= weekAgo);

  const totalParticles = weekReadings.reduce((sum, r) => sum + r.particleCount, 0);
  const avgQualityScore = weekReadings.length
    ? Math.round(weekReadings.reduce((sum, r) => sum + r.qualityScore, 0) / weekReadings.length)
    : 100;

  return {
    totalParticles,
    avgQualityScore,
    readingsCount: weekReadings.length,
  };
};

// Calculate monthly statistics
export const calculateMonthlyStats = (readings) => {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const monthReadings = readings.filter((r) => new Date(r.timestamp) >= monthAgo);

  const totalParticles = monthReadings.reduce((sum, r) => sum + r.particleCount, 0);
  const avgQualityScore = monthReadings.length
    ? Math.round(monthReadings.reduce((sum, r) => sum + r.qualityScore, 0) / monthReadings.length)
    : 100;

  // Calculate liters filtered (rough estimate)
  const litersFiltered = monthReadings.filter((r) => r.isFiltering).length * 2; // ~2 liters per filtration event

  return {
    totalParticles,
    avgQualityScore,
    readingsCount: monthReadings.length,
    litersFiltered,
  };
};

// Mock user data
export const mockUserData = {
  userId: null, // Guest user initially
  householdSize: null,
  location: {
    city: 'San Francisco',
    zip: '94102',
    anonymizedLatLong: { lat: 37.7749, long: -122.4194 },
  },
  preferences: {
    notifications: true,
    dataSharing: false,
  },
  createdAt: null,
  devicePairedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
};

// Mock device data
export const mockDeviceData = {
  deviceId: 'device-clarity-001',
  userId: null,
  isActive: true,
  lastCalibration: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  wifiStatus: 'connected',
  firmwareVersion: '1.2.0',
};
