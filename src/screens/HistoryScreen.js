import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { useApp } from '../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const HistoryScreen = () => {
  const { historicalData } = useApp();
  const [timeRange, setTimeRange] = useState('week'); 

  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date();
    let cutoffDate;

    switch (timeRange) {
      case 'day':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(0);
    }

    return historicalData
      .filter((reading) => new Date(reading.timestamp) >= cutoffDate)
      .map((reading) => ({
        x: new Date(reading.timestamp),
        y: reading.qualityScore,
      }));
  };

  const chartData = getFilteredData();

  // Calculate stats for the selected period
  const getStats = () => {
    const data = historicalData.filter((reading) => {
      const now = new Date();
      let cutoffDate;

      switch (timeRange) {
        case 'day':
          cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          return true;
      }

      return new Date(reading.timestamp) >= cutoffDate;
    });

    const avgScore = data.length
      ? Math.round(data.reduce((sum, r) => sum + r.qualityScore, 0) / data.length)
      : 0;

    const totalParticles = data.reduce((sum, r) => sum + r.particleCount, 0);

    const { small, medium, large } = data.reduce(
      (acc, r) => ({
        small: acc.small + r.particleBreakdown.small,
        medium: acc.medium + r.particleBreakdown.medium,
        large: acc.large + r.particleBreakdown.large,
      }),
      { small: 0, medium: 0, large: 0 }
    );

    return { avgScore, totalParticles, small, medium, large };
  };

  const stats = getStats();

  return (
    <ScrollView style={styles.container}>
      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={[styles.timeRangeButton, timeRange === 'day' && styles.timeRangeButtonActive]}
          onPress={() => setTimeRange('day')}
        >
          <Text
            style={[styles.timeRangeText, timeRange === 'day' && styles.timeRangeTextActive]}
          >
            Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeRangeButton, timeRange === 'week' && styles.timeRangeButtonActive]}
          onPress={() => setTimeRange('week')}
        >
          <Text
            style={[styles.timeRangeText, timeRange === 'week' && styles.timeRangeTextActive]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeRangeButton, timeRange === 'month' && styles.timeRangeButtonActive]}
          onPress={() => setTimeRange('month')}
        >
          <Text
            style={[styles.timeRangeText, timeRange === 'month' && styles.timeRangeTextActive]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Water Quality Over Time</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={250}
          padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
        >
          <VictoryAxis
            dependentAxis
            label="Quality Score"
            style={{
              axisLabel: { fontSize: 12, padding: 35 },
              tickLabels: { fontSize: 10 },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 10, angle: -45 },
            }}
          />
          <VictoryLine
            data={chartData}
            style={{
              data: { stroke: colors.primary, strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Period Summary</Text>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Quality Score</Text>
          <Text style={styles.statValue}>{stats.avgScore}</Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Particles Detected</Text>
          <Text style={styles.statValue}>{stats.totalParticles}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.breakdownTitle}>Particle Size Breakdown</Text>

        <View style={styles.particleBreakdown}>
          <View style={styles.particleItem}>
            <View style={[styles.particleDot, styles.particleSmall]} />
            <Text style={styles.particleLabel}>Small</Text>
            <Text style={styles.particleValue}>{stats.small}</Text>
          </View>

          <View style={styles.particleItem}>
            <View style={[styles.particleDot, styles.particleMedium]} />
            <Text style={styles.particleLabel}>Medium</Text>
            <Text style={styles.particleValue}>{stats.medium}</Text>
          </View>

          <View style={styles.particleItem}>
            <View style={[styles.particleDot, styles.particleLarge]} />
            <Text style={styles.particleLabel}>Large</Text>
            <Text style={styles.particleValue}>{stats.large}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeRangeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeRangeText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  timeRangeTextActive: {
    color: colors.secondary,
  },
  chartCard: {
    backgroundColor: colors.cardBackground,
    margin: spacing.md,
    marginTop: 0,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  chartTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statsCard: {
    backgroundColor: colors.cardBackground,
    margin: spacing.md,
    marginTop: 0,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  statsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  breakdownTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  particleBreakdown: {
    gap: spacing.sm,
  },
  particleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  particleDot: {
    borderRadius: 10,
  },
  particleSmall: {
    width: 8,
    height: 8,
    backgroundColor: colors.accent,
  },
  particleMedium: {
    width: 12,
    height: 12,
    backgroundColor: colors.monitor,
  },
  particleLarge: {
    width: 16,
    height: 16,
    backgroundColor: colors.alert,
  },
  particleLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    flex: 1,
  },
  particleValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
});

export default HistoryScreen;
