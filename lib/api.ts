import { supabase } from './supabase';
import { 
  addLocalBlogPost, 
  updateLocalBlogPost, 
  deleteLocalBlogPost,
  addLocalCourse,
  updateLocalCourse,
  deleteLocalCourse,
  addLocalVideo,
  updateLocalVideo,
  deleteLocalVideo,
  addLocalCourseVideo,
  updateLocalCourseVideo,
  deleteLocalCourseVideo,
  refreshLocalData
} from './localData';

// Blog Posts API
export const blogPostsAPI = {
  async create(postData: any) {
    if (!supabase) {
      addLocalBlogPost({
        ...postData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: postData.is_published ? new Date().toISOString() : null,
      });
      refreshLocalData();
      return { success: true };
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        ...postData,
        published_at: postData.is_published ? new Date().toISOString() : null,
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      const success = updateLocalBlogPost(id, {
        ...updates,
        updated_at: new Date().toISOString(),
        published_at: updates.is_published ? new Date().toISOString() : null,
      });
      refreshLocalData();
      return { success };
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
        published_at: updates.is_published ? new Date().toISOString() : null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async delete(id: string) {
    if (!supabase) {
      const success = deleteLocalBlogPost(id);
      refreshLocalData();
      return { success };
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getAll() {
    if (!supabase) {
      return { data: [], success: true };
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], success: true };
  },

  async getPublished() {
    if (!supabase) {
      return { data: [], success: true };
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], success: true };
  }
};

// Courses API
export const coursesAPI = {
  async create(courseData: any) {
    if (!supabase) {
      addLocalCourse({
        ...courseData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      refreshLocalData();
      return { success: true };
    }

    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      const success = updateLocalCourse(id, {
        ...updates,
        updated_at: new Date().toISOString(),
      });
      refreshLocalData();
      return { success };
    }

    const { data, error } = await supabase
      .from('courses')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async delete(id: string) {
    if (!supabase) {
      const success = deleteLocalCourse(id);
      refreshLocalData();
      return { success };
    }

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getAll() {
    if (!supabase) {
      return { data: [], success: true };
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order_index');

    if (error) throw error;
    return { data: data || [], success: true };
  }
};

// Videos API
export const videosAPI = {
  async create(videoData: any) {
    if (!supabase) {
      addLocalVideo({
        ...videoData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        views_count: 0,
        rating: 0.0,
      });
      refreshLocalData();
      return { success: true };
    }

    const { data, error } = await supabase
      .from('videos')
      .insert([videoData])
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      const success = updateLocalVideo(id, {
        ...updates,
        updated_at: new Date().toISOString(),
      });
      refreshLocalData();
      return { success };
    }

    const { data, error } = await supabase
      .from('videos')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async delete(id: string) {
    if (!supabase) {
      const success = deleteLocalVideo(id);
      refreshLocalData();
      return { success };
    }

    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getAll() {
    if (!supabase) {
      return { data: [], success: true };
    }

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], success: true };
  }
};

// Course Videos API
export const courseVideosAPI = {
  async create(videoData: any) {
    if (!supabase) {
      addLocalCourseVideo({
        ...videoData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      refreshLocalData();
      return { success: true };
    }

    const { data, error } = await supabase
      .from('course_videos')
      .insert([videoData])
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async update(id: string, updates: any) {
    if (!supabase) {
      const success = updateLocalCourseVideo(id, {
        ...updates,
        updated_at: new Date().toISOString(),
      });
      refreshLocalData();
      return { success };
    }

    const { data, error } = await supabase
      .from('course_videos')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  },

  async delete(id: string) {
    if (!supabase) {
      const success = deleteLocalCourseVideo(id);
      refreshLocalData();
      return { success };
    }

    const { error } = await supabase
      .from('course_videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getByCourse(courseId: string) {
    if (!supabase) {
      return { data: [], success: true };
    }

    const { data, error } = await supabase
      .from('course_videos')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');

    if (error) throw error;
    return { data: data || [], success: true };
  }
};

// Generic API helper for error handling
export const handleAPIError = (error: any, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`Failed to ${operation}: ${error.message || 'Unknown error'}`);
};