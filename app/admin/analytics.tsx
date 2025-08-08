import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, TrendingUp, Users, Eye, Calendar, Download } from 'lucide-react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

interface AnalyticsData {
  totalUsers: number;
  premiumUsers: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  totalCourses: number;
  totalVideos: number;
  totalBlogPosts: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export default function AdminAnalyticsScreen() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    premiumUsers: 0,
    dailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    totalCourses: 0,
    totalVideos: 0,
    totalBlogPosts: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      if (!supabase) {
        // Mock analytics data when Supabase is not configured
        setAnalytics({
          totalUsers: 1247,
          premiumUsers: 342,
          dailyActiveUsers: 156,
          weeklyActiveUsers: 523,
          monthlyActiveUsers: 1089,
          totalCourses: 12,
          totalVideos: 45,
          totalBlogPosts: 23,
          recentActivity: [
            {
              id: '1',
              type: 'user_registration',
              description: 'New user registered: sarah.chen@gmail.com',
              timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            },
            {
              id: '2',
              type: 'premium_subscription',
              description: 'Premium subscription: michael.r@company.com',
              timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            },
            {
              id: '3',
              type: 'course_completion',
              description: 'Course completed: Lean Basics by jennifer.l@startup.io',
              timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            },
          ],
        });
        setLoading(false);
        return;
      }

      // Fetch real analytics data from Supabase
      const [usersResult, coursesResult, videosResult, postsResult] = await Promise.all([
        supabase.from('users').select('id, subscription_type, last_active'),
        supabase.from('courses').select('id'),
        supabase.from('videos').select('id'),
        supabase.from('blog_posts').select('id'),
      ]);

      const users = usersResult.data || [];
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      setAnalytics({
        totalUsers: users.length,
        premiumUsers: users.filter(u => u.subscription_type === 'premium').length,
        dailyActiveUsers: users.filter(u => new Date(u.last_active) > oneDayAgo).length,
        weeklyActiveUsers: users.filter(u => new Date(u.last_active) > oneWeekAgo).length,
        monthlyActiveUsers: users.filter(u => new Date(u.last_active) > oneMonthAgo).length,
        totalCourses: coursesResult.data?.length || 0,
        totalVideos: videosResult.data?.length || 0,
        totalBlogPosts: postsResult.data?.length || 0,
        recentActivity: [], // Would need to implement activity tracking
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#ef4444', '#dc2626']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <Text style={styles.headerSubtitle}>Platform insights and metrics</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Users size={24} color="#8b5cf6" />
              <Text style={styles.metricNumber}>{analytics.totalUsers}</Text>
              <Text style={styles.metricLabel}>Total Users</Text>
            </View>
            <View style={styles.metricCard}>
              <TrendingUp size={24} color="#10b981" />
              <Text style={styles.metricNumber}>{analytics.premiumUsers}</Text>
              <Text style={styles.metricLabel}>Premium Users</Text>
            </View>
            <View style={styles.metricCard}>
              <Eye size={24} color="#06b6d4" />
              <Text style={styles.metricNumber}>{analytics.dailyActiveUsers}</Text>
              <Text style={styles.metricLabel}>Daily Active</Text>
            </View>
            <View style={styles.metricCard}>
              <Calendar size={24} color="#f59e0b" />
              <Text style={styles.metricNumber}>{analytics.weeklyActiveUsers}</Text>
              <Text style={styles.metricLabel}>Weekly Active</Text>
            </View>
          </View>
        </View>

        {/* Content Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Courses</Text>
              <Text style={styles.statValue}>{analytics.totalCourses}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Videos</Text>
              <Text style={styles.statValue}>{analytics.totalVideos}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Blog Posts</Text>
              <Text style={styles.statValue}>{analytics.totalBlogPosts}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Conversion Rate</Text>
              <Text style={styles.statValue}>
                {analytics.totalUsers > 0 
                  ? `${((analytics.premiumUsers / analytics.totalUsers) * 100).toFixed(1)}%`
                  : '0%'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {analytics.recentActivity.length === 0 ? (
              <Text style={styles.noActivityText}>No recent activity to display</Text>
            ) : (
              analytics.recentActivity.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    <Text style={styles.activityTime}>{formatTimeAgo(activity.timestamp)}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Export Data */}
        <TouchableOpacity style={styles.exportButton} activeOpacity={0.8}>
          <LinearGradient
            colors={['#6b7280', '#374151']}
            style={styles.exportGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Download size={20} color="#ffffff" />
            <Text style={styles.exportButtonText}>Export Analytics Data</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  activityContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noActivityText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
    marginRight: 12,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  exportButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 20,
  },
  exportGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});