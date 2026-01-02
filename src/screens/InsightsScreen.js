import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { calculateMonthlyStats } from '../utils/mockData';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const InsightsScreen = () => {
  const { historicalData } = useApp();
  const monthlyStats = calculateMonthlyStats(historicalData);

  // Educational content
  const educationalContent = [
    {
      icon: 'information-circle',
      title: 'What are microplastics?',
      content:
        'Microplastics are tiny plastic particles less than 5mm in size. They come from broken-down plastic products, synthetic clothing fibers, and industrial processes.',
    },
    {
      icon: 'medkit',
      title: 'Health Impact',
      content:
        'Studies suggest microplastics can accumulate in organs and may be linked to inflammation, hormonal disruption, and other health concerns. Research is ongoing.',
    },
    {
      icon: 'water',
      title: 'Sources in Water',
      content:
        'Microplastics enter water supplies through aging infrastructure, plastic bottle breakdown, synthetic clothing washing, and industrial runoff.',
    },
    {
      icon: 'shield-checkmark',
      title: 'Protection',
      content:
        'Clarity detects microplastics in real-time and only activates filtration when needed, ensuring clean water while extending filter life.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* monthly impact stats */}
      <View style={styles.impactCard}>
        <Text style={styles.impactTitle}>Your Monthly Impact</Text>

        <View style={styles.impactStats}>
          <View style={styles.impactStat}>
            <Ionicons name="water" size={40} color={colors.primary} />
            <Text style={styles.impactValue}>{monthlyStats.litersFiltered}L</Text>
            <Text style={styles.impactLabel}>Water Filtered</Text>
          </View>

          <View style={styles.impactStat}>
            <Ionicons name="shield-checkmark" size={40} color={colors.accent} />
            <Text style={styles.impactValue}>{monthlyStats.totalParticles}</Text>
            <Text style={styles.impactLabel}>Particles Removed</Text>
          </View>
        </View>

        <View style={styles.impactMessage}>
          <Ionicons name="heart" size={24} color={colors.alert} />
          <Text style={styles.impactMessageText}>
            You've avoided approximately {monthlyStats.totalParticles} microplastic particles
            this month! That's {Math.round(monthlyStats.totalParticles / 30)} per day on
            average.
          </Text>
        </View>
      </View>

      {/* quality trend */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="trending-up" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Your Water Quality</Text>
        </View>

        <View style={styles.trendContainer}>
          <View style={styles.trendCircle}>
            <Text style={styles.trendScore}>{monthlyStats.avgQualityScore}</Text>
          </View>
          <View style={styles.trendContent}>
            <Text style={styles.trendLabel}>30-Day Average</Text>
            <Text style={styles.trendDescription}>
              {monthlyStats.avgQualityScore >= 90
                ? 'Excellent! Your water quality has been consistently high.'
                : monthlyStats.avgQualityScore >= 75
                  ? 'Good. Minor contamination detected occasionally.'
                  : 'Fair. Consider checking your pipes or local water source.'}
            </Text>
          </View>
        </View>
      </View>

      {/* educational content */}
      <View style={styles.educationSection}>
        <Text style={styles.sectionTitle}>Learn About Microplastics</Text>

        {educationalContent.map((item, index) => (
          <View key={index} style={styles.educationCard}>
            <View style={styles.educationHeader}>
              <Ionicons name={item.icon} size={24} color={colors.primary} />
              <Text style={styles.educationTitle}>{item.title}</Text>
            </View>
            <Text style={styles.educationContent}>{item.content}</Text>
          </View>
        ))}
      </View>

      {/* community impact */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="people" size={24} color={colors.accent} />
          <Text style={styles.cardTitle}>Community Impact</Text>
        </View>

        <Text style={styles.communityText}>
          By sharing your anonymous water quality data, you're contributing to a growing
          database that helps researchers and policymakers identify contamination hotspots and
          drive meaningful change.
        </Text>

        <View style={styles.communityStats}>
          <View style={styles.communityStat}>
            <Text style={styles.communityValue}>1,247</Text>
            <Text style={styles.communityLabel}>Active Devices</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.communityStat}>
            <Text style={styles.communityValue}>15.2M</Text>
            <Text style={styles.communityLabel}>Readings Collected</Text>
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
  impactCard: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.lg,
  },
  impactTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  impactStat: {
    alignItems: 'center',
  },
  impactValue: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary,
    marginTop: spacing.sm,
  },
  impactLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  impactMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  impactMessageText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  card: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  trendCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.accent,
  },
  trendScore: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  trendContent: {
    flex: 1,
  },
  trendLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  trendDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  educationSection: {
    marginBottom: spacing.md,
  },
  educationCard: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  educationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  educationTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  educationContent: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  communityText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.md,
  },
  communityStats: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  communityStat: {
    flex: 1,
    alignItems: 'center',
  },
  communityValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  communityLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
});

export default InsightsScreen;
