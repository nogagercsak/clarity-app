import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const AccountPrompt = ({ visible, onDismiss, onCreateAccount }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Ionicons name="shield-checkmark" size={64} color={colors.accent} />

          <Text style={styles.title}>Unlock Full Features</Text>
          <Text style={styles.description}>
            Create a free account to unlock advanced insights, sync across devices, and help
            researchers identify contamination hotspots.
          </Text>

          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              <Text style={styles.benefitText}>Detailed analytics & trends</Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              <Text style={styles.benefitText}>Export your data</Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              <Text style={styles.benefitText}>Community insights</Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              <Text style={styles.benefitText}>Multiple device support</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={onCreateAccount}>
            <Text style={styles.primaryButtonText}>Create Free Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissButtonText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modal: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    ...shadows.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.lg,
  },
  benefits: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  benefitText: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  dismissButton: {
    paddingVertical: spacing.sm,
  },
  dismissButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
});

export default AccountPrompt;
