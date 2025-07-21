'use client';

import React from 'react';
import { useState } from 'react';
import { Settings, User, Shield, Bell, Play, Monitor, Download } from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const settingSections: SettingSection[] = [
  { id: 'account', title: 'Account', description: 'Manage your profile and preferences', icon: User },
  { id: 'privacy', title: 'Privacy & Security', description: 'Control your privacy settings', icon: Shield },
  { id: 'notifications', title: 'Notifications', description: 'Configure notification preferences', icon: Bell },
  { id: 'playback', title: 'Playback', description: 'Video and audio settings', icon: Play },
  { id: 'quality', title: 'Quality & Performance', description: 'Streaming quality and performance', icon: Monitor },
  { id: 'downloads', title: 'Downloads', description: 'Offline content settings', icon: Download }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    email: 'user@example.com',
    username: 'streamuser',
    language: 'en',
    timezone: 'UTC',
    
    // Privacy settings
    profileVisibility: 'public',
    watchHistory: true,
    recommendations: true,
    dataCollection: true,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    newContentAlerts: true,
    marketingEmails: false,
    
    // Playback settings
    autoplay: true,
    autoplayNext: true,
    subtitles: 'off',
    audioLanguage: 'en',
    playbackSpeed: 1,
    
    // Quality settings
    streamingQuality: 'auto',
    downloadQuality: 'high',
    bandwidthLimit: 'unlimited',
    hardwareAcceleration: true,
    
    // Download settings
    downloadLocation: 'default',
    downloadLimit: 'unlimited',
    downloadOverWifi: true,
    autoDeleteDownloads: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => handleSettingChange('username', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Privacy Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Watch History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Save your viewing history</p>
            </div>
            <button
              onClick={() => handleSettingChange('watchHistory', !settings.watchHistory)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.watchHistory ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.watchHistory ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Personalized Recommendations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use your data for recommendations</p>
            </div>
            <button
              onClick={() => handleSettingChange('recommendations', !settings.recommendations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.recommendations ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.recommendations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Data Collection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow data collection for analytics</p>
            </div>
            <button
              onClick={() => handleSettingChange('dataCollection', !settings.dataCollection)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataCollection ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.dataCollection ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications</p>
            </div>
            <button
              onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">New Content Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new releases</p>
            </div>
            <button
              onClick={() => handleSettingChange('newContentAlerts', !settings.newContentAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.newContentAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.newContentAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotional emails</p>
            </div>
            <button
              onClick={() => handleSettingChange('marketingEmails', !settings.marketingEmails)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaybackSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Playback Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Autoplay</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically play videos</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoplay', !settings.autoplay)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoplay ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoplay ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Autoplay Next Episode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically play next episode</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoplayNext', !settings.autoplayNext)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoplayNext ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoplayNext ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitles
              </label>
              <select
                value={settings.subtitles}
                onChange={(e) => handleSettingChange('subtitles', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="off">Off</option>
                <option value="on">On</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Audio Language
              </label>
              <select
                value={settings.audioLanguage}
                onChange={(e) => handleSettingChange('audioLanguage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Playback Speed
            </label>
            <select
              value={settings.playbackSpeed}
              onChange={(e) => handleSettingChange('playbackSpeed', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x (Normal)</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQualitySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quality & Performance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Streaming Quality
            </label>
            <select
              value={settings.streamingQuality}
              onChange={(e) => handleSettingChange('streamingQuality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="auto">Auto (Recommended)</option>
              <option value="low">Low (480p)</option>
              <option value="medium">Medium (720p)</option>
              <option value="high">High (1080p)</option>
              <option value="ultra">Ultra (4K)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Download Quality
            </label>
            <select
              value={settings.downloadQuality}
              onChange={(e) => handleSettingChange('downloadQuality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low (480p)</option>
              <option value="medium">Medium (720p)</option>
              <option value="high">High (1080p)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bandwidth Limit
            </label>
            <select
              value={settings.bandwidthLimit}
              onChange={(e) => handleSettingChange('bandwidthLimit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="unlimited">Unlimited</option>
              <option value="1gb">1 GB/hour</option>
              <option value="2gb">2 GB/hour</option>
              <option value="5gb">5 GB/hour</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Hardware Acceleration</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use GPU for video decoding</p>
            </div>
            <button
              onClick={() => handleSettingChange('hardwareAcceleration', !settings.hardwareAcceleration)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.hardwareAcceleration ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.hardwareAcceleration ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDownloadSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Download Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Download Location
            </label>
            <select
              value={settings.downloadLocation}
              onChange={(e) => handleSettingChange('downloadLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">Default</option>
              <option value="custom">Custom Location</option>
              <option value="sd">SD Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Download Limit
            </label>
            <select
              value={settings.downloadLimit}
              onChange={(e) => handleSettingChange('downloadLimit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="unlimited">Unlimited</option>
              <option value="5gb">5 GB</option>
              <option value="10gb">10 GB</option>
              <option value="20gb">20 GB</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Download Over WiFi Only</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Only download when connected to WiFi</p>
            </div>
            <button
              onClick={() => handleSettingChange('downloadOverWifi', !settings.downloadOverWifi)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.downloadOverWifi ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.downloadOverWifi ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto-Delete Downloads</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically delete watched downloads</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoDeleteDownloads', !settings.autoDeleteDownloads)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoDeleteDownloads ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoDeleteDownloads ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Customize your streaming experience
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs opacity-75">{section.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* Render tab content based on activeTab */}
              {activeTab === 'account' && renderAccountSettings()}
              {activeTab === 'privacy' && renderPrivacySettings()}
              {activeTab === 'notifications' && renderNotificationSettings()}
              {activeTab === 'playback' && renderPlaybackSettings()}
              {activeTab === 'quality' && renderQualitySettings()}
              {activeTab === 'downloads' && renderDownloadSettings()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

