import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, Calendar, User, Tag } from 'lucide-react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/database';
import { getLocalBlogPosts, subscribeToDataChanges } from '@/lib/localData';

export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to data changes for real-time updates
    const unsubscribe = subscribeToDataChanges(() => {
      fetchPosts();
    });
    
    return unsubscribe;
  }, []);

  const fetchPosts = async () => {
    try {
      if (!supabase) {
        // Use local data when Supabase is not configured
        const localPosts = getLocalBlogPosts();
        setPosts(localPosts.filter(post => post.is_published));
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Fallback to local data
      const localPosts = getLocalBlogPosts();
      setPosts(localPosts.filter(post => post.is_published));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#ef4444', '#dc2626']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.headerTitle}>News & Blog</Text>
        <Text style={styles.headerSubtitle}>Latest insights and updates</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.length === 0 ? (
          <View style={styles.emptyState}>
            <FileText size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptySubtitle}>Check back soon for the latest updates</Text>
          </View>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => router.push(`/blog/${post.id}`)}
              activeOpacity={0.7}>
              
              {/* Featured Image */}
              {post.featured_image_url && (
                <Image
                  source={{ uri: post.featured_image_url }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postExcerpt} numberOfLines={3}>
                  {post.excerpt}
                </Text>

                <View style={styles.postMeta}>
                  <View style={styles.metaItem}>
                    <User size={14} color="#6b7280" />
                    <Text style={styles.metaText}>{post.author}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color="#6b7280" />
                    <Text style={styles.metaText}>
                      {formatDate(post.published_at || post.created_at)}
                    </Text>
                  </View>
                </View>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Tag size={10} color="#8b5cf6" />
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                    {post.tags.length > 3 && (
                      <Text style={styles.moreTagsText}>+{post.tags.length - 3} more</Text>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  postContent: {
    padding: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  postMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  moreTagsText: {
    fontSize: 10,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});