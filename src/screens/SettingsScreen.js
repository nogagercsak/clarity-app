import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../constants/theme';

const SettingsScreen = () => {
  const { userData, deviceData, updatePreferences } = useApp();

  const handleToggleNotifications = (value) => {
    updatePreferences({ notifications: value });
  };

  const handleToggleDataSharing = (value) => {
    updatePreferences({ dataSharing: value });
  };

  const SettingRow = ({ icon, label, onPress, rightElement }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colors.primary} />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={20} color={colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          {userData.userId ? (
            <>
              <SettingRow icon="person" label="Profile" onPress={() => {}} />
              <View style={styles.divider} />
              <SettingRow icon="mail" label={userData.email || 'Email'} />
              <View style={styles.divider} />
              <SettingRow
                icon="people"
                label={`Household Size: ${userData.householdSize || 'Not set'}`}
                onPress={() => {}}
              />
            </>
          ) : (
            <View style={styles.guestMode}>
              <Ionicons name="person-circle-outline" size={48} color={colors.textLight} />
              <Text style={styles.guestTitle}>Guest Mode</Text>
              <Text style={styles.guestDescription}>
                Create an account to unlock advanced features, sync across devices, and contribute to
                community insights.
              </Text>
              <TouchableOpacity style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Device Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device</Text>
        <View style={styles.card}>
          <View style={styles.deviceInfo}>
            <Ionicons name="hardware-chip" size={24} color={colors.primary} />
            <View style={styles.deviceDetails}>
              <Text style={styles.deviceLabel}>Device ID</Text>
              <Text style={styles.deviceValue}>{deviceData.deviceId}</Text>
            </View>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: deviceData.isActive ? colors.safe : colors.alert },
              ]}
            />
          </View>

          <View style={styles.divider} />

          <SettingRow
            icon="wifi"
            label="WiFi"
            rightElement={
              <Text style={styles.statusText}>
                {deviceData.wifiStatus === 'connected' ? 'Connected' : 'Disconnected'}
              </Text>
            }
          />

          <View style={styles.divider} />

          <SettingRow
            icon="build"
            label="Calibration"
            rightElement={
              <Text style={styles.statusText}>
                {new Date(deviceData.lastCalibration).toLocaleDateString()}
              </Text>
            }
          />

          <View style={styles.divider} />

          <SettingRow
            icon="code"
            label="Firmware"
            rightElement={<Text style={styles.statusText}>{deviceData.firmwareVersion}</Text>}
          />
        </View>
      </View>

      {/* preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color={colors.primary} />
              <View>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingSubtext}>
                  Get alerted when contamination is detected
                </Text>
              </View>
            </View>
            <Switch
              value={userData.preferences?.notifications}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.disabled, true: colors.accent }}
              thumbColor={colors.secondary}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="analytics" size={24} color={colors.primary} />
              <View>
                <Text style={styles.settingLabel}>Anonymous Data Sharing</Text>
                <Text style={styles.settingSubtext}>
                  Help researchers identify contamination hotspots
                </Text>
              </View>
            </View>
            <Switch
              value={userData.preferences?.dataSharing}
              onValueChange={handleToggleDataSharing}
              trackColor={{ false: colors.disabled, true: colors.accent }}
              thumbColor={colors.secondary}
            />
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <SettingRow icon="shield-checkmark" label="Privacy Policy" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingRow icon="document-text" label="Terms of Service" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingRow icon="help-circle" label="Help & Support" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingRow
            icon="information-circle"
            label="Version"
            rightElement={<Text style={styles.statusText}>1.0.0</Text>}
          />
        </View>
      </View>

      {/* Sign Out (if logged in) */}
      {userData.userId && (
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with care for cleaner water</Text>
        <Text style={styles.footerText}>Clarity © 2025</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
    textTransform: 'uppercase',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  settingSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 24 + spacing.md,
  },
  statusText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  guestMode: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  guestTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  guestDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.lg,
  },
  createAccountButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  createAccountText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  deviceValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  signOutButton: {
    backgroundColor: colors.alert,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
});

export default SettingsScreen;
