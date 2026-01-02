import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const DevicePairingScreen = ({ onPairingComplete }) => {
  const [step, setStep] = useState(1); // 1: Welcome, 2: WiFi Setup, 3: Connecting, 4: Success
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulate device pairing process
  const handleStartPairing = () => {
    setStep(2);
  };

  const handleWiFiSetup = () => {
    setStep(3);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setStep(4);
    }, 3000);
  };

  const handleComplete = () => {
    if (onPairingComplete) {
      onPairingComplete();
    }
  };

  // Step 1: Welcome
  if (step === 1) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons name="water" size={100} color={colors.primary} />
          <Text style={styles.title}>Welcome to Clarity</Text>
          <Text style={styles.description}>
            Let's get your Clarity device set up and start monitoring your water quality in
            real-time.
          </Text>

          <View style={styles.steps}>
            <View style={styles.stepItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
              <Text style={styles.stepText}>Attach device to your faucet</Text>
            </View>
            <View style={styles.stepItem}>
              <Ionicons name="wifi" size={24} color={colors.accent} />
              <Text style={styles.stepText}>Connect to WiFi</Text>
            </View>
            <View style={styles.stepItem}>
              <Ionicons name="analytics" size={24} color={colors.accent} />
              <Text style={styles.stepText}>Start monitoring</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleStartPairing}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 2: WiFi Setup
  if (step === 2) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons name="wifi" size={100} color={colors.primary} />
          <Text style={styles.title}>Connect to WiFi</Text>
          <Text style={styles.description}>
            Make sure your Clarity device is powered on and the LED is blinking blue.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Setup Instructions:</Text>
            <Text style={styles.infoText}>1. Press and hold the WiFi button on your device</Text>
            <Text style={styles.infoText}>2. Wait for the LED to blink rapidly</Text>
            <Text style={styles.infoText}>3. Release the button</Text>
            <Text style={styles.infoText}>4. Tap "Connect" below</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleWiFiSetup}>
          <Text style={styles.primaryButtonText}>Connect to WiFi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Step 3: Connecting
  if (step === 3) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.title, { marginTop: spacing.xl }]}>Connecting...</Text>
          <Text style={styles.description}>
            Please wait while we connect your Clarity device to your WiFi network.
          </Text>
        </View>
      </View>
    );
  }

  // Step 4: Success
  if (step === 4) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons name="checkmark-circle" size={100} color={colors.safe} />
          <Text style={styles.title}>All Set!</Text>
          <Text style={styles.description}>
            Your Clarity device is connected and ready to monitor your water quality.
          </Text>

          <View style={styles.successCard}>
            <View style={styles.successItem}>
              <Ionicons name="water" size={32} color={colors.primary} />
              <Text style={styles.successText}>Device Connected</Text>
            </View>
            <View style={styles.successItem}>
              <Ionicons name="shield-checkmark" size={32} color={colors.accent} />
              <Text style={styles.successText}>Protection Active</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleComplete}>
          <Text style={styles.primaryButtonText}>Start Monitoring</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  steps: {
    width: '100%',
    gap: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    ...shadows.sm,
  },
  stepText: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    width: '100%',
    ...shadows.md,
  },
  infoTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  successCard: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  successItem: {
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    flex: 1,
    ...shadows.md,
  },
  successText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
});

export default DevicePairingScreen;
