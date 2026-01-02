import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const FilterScreen = () => {
  const { filterData, replaceFilter } = useApp();

  if (!filterData) return null;

  const getStatusColor = () => {
    if (filterData.lifeRemaining > 20) return colors.safe;
    if (filterData.lifeRemaining > 10) return colors.monitor;
    return colors.alert;
  };

  const getStatusText = () => {
    if (filterData.status === 'good') return 'Filter is in good condition';
    if (filterData.status === 'replace-soon')
      return 'Filter should be replaced within 2 weeks';
    return 'Filter needs immediate replacement';
  };

  const handleOrderReplacement = () => {
    // Placeholder - would link to e-commerce site
    Linking.openURL('https://clarity-device.com/filters');
  };

  const handleReplaceFilter = () => {
    // Simulate filter replacement
    replaceFilter();
  };

  const installDate = new Date(filterData.installDate);
  const daysUsed = Math.floor((Date.now() - installDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.round((180 * filterData.lifeRemaining) / 100);

  return (
    <ScrollView style={styles.container}>
      {/* Status Overview */}
      <View style={styles.statusCard}>
        <View style={styles.progressCircle}>
          <Text style={[styles.percentage, { color: getStatusColor() }]}>
            {Math.round(filterData.lifeRemaining)}%
          </Text>
          <Text style={styles.percentageLabel}>remaining</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Ionicons name="filter" size={20} color={colors.secondary} />
          <Text style={styles.statusBadgeText}>{getStatusText()}</Text>
        </View>
      </View>

      {/* Performance Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Performance Statistics</Text>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={24} color={colors.primary} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{daysUsed}</Text>
              <Text style={styles.statLabel}>Days Used</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color={colors.accent} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{daysRemaining}</Text>
              <Text style={styles.statLabel}>Days Remaining</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Ionicons name="sync" size={24} color={colors.monitor} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{filterData.activationCount}</Text>
              <Text style={styles.statLabel}>Total Activations</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="shield-checkmark" size={24} color={colors.safe} />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>
                {Math.round(filterData.activationCount * 2)}L
              </Text>
              <Text style={styles.statLabel}>Water Filtered</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Installation Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Installation Details</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Installed On</Text>
          <Text style={styles.infoValue}>
            {installDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Filter ID</Text>
          <Text style={styles.infoValue}>{filterData.filterId}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Expected Lifespan</Text>
          <Text style={styles.infoValue}>6 months (180 days)</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsCard}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleOrderReplacement}>
          <Ionicons name="cart" size={20} color={colors.secondary} />
          <Text style={styles.primaryButtonText}>Order Replacement Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleReplaceFilter}>
          <Ionicons name="reload" size={20} color={colors.primary} />
          <Text style={styles.secondaryButtonText}>I Replaced My Filter</Text>
        </TouchableOpacity>
      </View>

      {/* FAQs */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Frequently Asked Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How do I replace the filter?</Text>
          <Text style={styles.faqAnswer}>
            1. Turn off water supply{'\n'}
            2. Unscrew the old filter cartridge{'\n'}
            3. Insert the new filter and screw clockwise{'\n'}
            4. Turn on water and run for 30 seconds{'\n'}
            5. Tap "I Replaced My Filter" above
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Why does filter life vary?</Text>
          <Text style={styles.faqAnswer}>
            Filter life depends on water usage and contamination levels. Clarity only activates
            filtration when microplastics are detected, extending filter life by up to 10x
            compared to always-on filters.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>What if I need help?</Text>
          <Text style={styles.faqAnswer}>
            Contact our support team at support@clarity-device.com or call 1-800-CLARITY.
          </Text>
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
  statusCard: {
    backgroundColor: colors.cardBackground,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginBottom: spacing.lg,
  },
  percentage: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
  },
  percentageLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  statusBadgeText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  card: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  actionsCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  secondaryButton: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  faqItem: {
    marginBottom: spacing.md,
  },
  faqQuestion: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  faqAnswer: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
});

export default FilterScreen;
