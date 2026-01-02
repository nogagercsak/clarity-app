import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import WaterQualityScore from '../components/WaterQualityScore';
import QuickStats from '../components/QuickStats';
import FilterStatus from '../components/FilterStatus';
import { colors, spacing } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { currentReading, filterData, dailyStats, isLoading } = useApp();

  const handleViewDetails = () => {
    navigation.navigate('History');
  };

  if (isLoading || !currentReading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading water quality data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* water quality score */}
      <WaterQualityScore
        score={currentReading.qualityScore}
        particleCount={currentReading.particleCount}
        isFiltering={currentReading.isFiltering}
      />

      {/* quick stats */}
      <QuickStats dailyStats={dailyStats} onViewDetails={handleViewDetails} />

      {/* filter status */}
      <FilterStatus filterData={filterData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
});