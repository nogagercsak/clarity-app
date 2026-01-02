import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const FilterStatus = ({ filterData }) => {
  if (!filterData) return null;

  const getStatusColor = () => {
    if (filterData.lifeRemaining > 20) return colors.safe;
    if (filterData.lifeRemaining > 10) return colors.monitor;
    return colors.alert;
  };

  const getStatusText = () => {
    if (filterData.status === 'good') return 'Filter Good';
    if (filterData.status === 'replace-soon') return 'Replace Soon';
    return 'Replace Now';
  };

  const statusColor = getStatusColor();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="filter" size={24} color={colors.primary} />
        <Text style={styles.title}>Filter Status</Text>
      </View>

      {/* Circular progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.percentage}>{Math.round(filterData.lifeRemaining)}%</Text>
          <Text style={styles.percentageLabel}>remaining</Text>
        </View>
      </View>

      {/* Status text */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{filterData.activationCount}</Text>
          <Text style={styles.statLabel}>Activations</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round((180 * filterData.lifeRemaining) / 100)}
          </Text>
          <Text style={styles.statLabel}>Days Left</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  percentage: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  percentageLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
});

export default FilterStatus;
