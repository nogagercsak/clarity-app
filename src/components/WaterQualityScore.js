import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../constants/theme';

const WaterQualityScore = ({ score, particleCount, isFiltering }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Get status based on score
  const getStatus = () => {
    if (score >= 90) return { text: 'Safe', color: colors.safe, icon: 'checkmark-circle' };
    if (score >= 75) return { text: 'Monitor', color: colors.monitor, icon: 'alert-circle' };
    return { text: 'Filtering', color: colors.filtering, icon: 'shield-checkmark' };
  };

  const status = getStatus();

  // Pulse animation when filtering or contamination detected
  useEffect(() => {
    if (isFiltering || particleCount > 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isFiltering, particleCount, pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Animated water droplet */}
      <Animated.View
        style={[
          styles.droplet,
          {
            backgroundColor: status.color,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Ionicons name="water" size={80} color={colors.secondary} />
      </Animated.View>

      {/* Quality Score */}
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.scoreLabel}>Water Quality Score</Text>

      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
        <Ionicons name={status.icon} size={20} color={colors.secondary} />
        <Text style={styles.statusText}>{status.text}</Text>
      </View>

      {/* Particle Count */}
      {particleCount > 0 && (
        <Text style={styles.particleCount}>
          {particleCount} microplastic particle{particleCount !== 1 ? 's' : ''} detected today
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  droplet: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  score: {
    fontSize: typography.fontSize.score,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  scoreLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  statusText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  particleCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default WaterQualityScore;
