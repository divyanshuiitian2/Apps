// Local data storage for offline functionality
let localBlogPosts: any[] = [
  {
    id: '1',
    title: 'Getting Started with Lean Six Sigma',
    content: 'Lean Six Sigma is a powerful methodology that combines the waste reduction principles of Lean with the quality improvement focus of Six Sigma. This comprehensive approach helps organizations eliminate inefficiencies while maintaining high-quality standards.\n\nIn this post, we\'ll explore the fundamental concepts that make Lean Six Sigma so effective in modern business environments. Whether you\'re new to process improvement or looking to enhance your existing knowledge, understanding these core principles is essential for success.\n\nThe journey begins with recognizing that every process has room for improvement. By identifying and eliminating waste while reducing variation, organizations can achieve remarkable results in both efficiency and quality.',
    excerpt: 'Discover the fundamental principles of Lean Six Sigma and how this powerful methodology can transform your organization\'s efficiency and quality standards.',
    author: 'Divyanshu Singh',
    is_published: true,
    featured_image_url: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['lean', 'six sigma', 'process improvement', 'quality'],
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'The Power of Kaizen in Daily Operations',
    content: 'Kaizen, meaning "continuous improvement" in Japanese, is more than just a business philosophy—it\'s a way of thinking that can revolutionize how your organization operates. This approach focuses on making small, incremental changes that compound over time to create significant improvements.\n\nThe beauty of Kaizen lies in its simplicity and accessibility. Unlike major restructuring initiatives that require substantial resources and time, Kaizen improvements can be implemented by anyone, at any level of the organization. This democratization of improvement creates a culture where everyone is empowered to contribute to organizational success.\n\nImplementing Kaizen successfully requires commitment from leadership and engagement from all team members. When done correctly, it creates a self-sustaining cycle of improvement that drives long-term success.',
    excerpt: 'Learn how Kaizen\'s continuous improvement philosophy can create lasting positive change in your organization through small, incremental improvements.',
    author: 'Rinesh Kumar',
    is_published: true,
    featured_image_url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['kaizen', 'continuous improvement', 'culture', 'operations'],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Digital Transformation Through Lean Principles',
    content: 'In today\'s rapidly evolving digital landscape, organizations must adapt quickly while maintaining operational excellence. Lean principles provide a robust framework for navigating digital transformation initiatives successfully.\n\nDigital transformation isn\'t just about implementing new technology—it\'s about reimagining how work gets done. Lean principles help organizations focus on value creation while eliminating digital waste such as redundant systems, unnecessary approvals, and inefficient workflows.\n\nBy applying Lean thinking to digital initiatives, organizations can ensure that technology investments deliver real value rather than simply digitizing existing inefficiencies. This approach leads to more successful transformations and better return on investment.',
    excerpt: 'Explore how Lean principles can guide successful digital transformation initiatives while maintaining focus on value creation and waste elimination.',
    author: 'Harsha Patel',
    is_published: false,
    featured_image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['digital transformation', 'lean', 'technology', 'innovation'],
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: null,
  },
];

let localCourses: any[] = [
  {
    id: '1',
    title: 'Lean Basics',
    description: 'Fundamental principles of Lean methodology',
    duration: '2 hours',
    lessons_count: 8,
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thumbnail_url: null,
    order_index: 1,
  },
  {
    id: '2',
    title: 'Six Sigma Belt Overview',
    description: 'Understanding the Six Sigma belt system',
    duration: '3 hours',
    lessons_count: 12,
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thumbnail_url: null,
    order_index: 2,
  },
  {
    id: '3',
    title: 'DMAIC Process',
    description: 'Define, Measure, Analyze, Improve, Control',
    duration: '4 hours',
    lessons_count: 16,
    is_premium: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thumbnail_url: null,
    order_index: 3,
  },
];

let localCourseVideos: any[] = [
  {
    id: '1',
    course_id: '1',
    title: 'Introduction to Lean Thinking',
    description: 'Overview of Lean principles and philosophy',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '12:30',
    order_index: 0,
    is_preview: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    course_id: '1',
    title: 'Identifying Waste in Processes',
    description: 'Learn to spot the 8 types of waste in any process',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '15:45',
    order_index: 1,
    is_preview: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let localVideos: any[] = [
  {
    id: '1',
    title: 'Introduction to Lean Methodology',
    description: 'Basic introduction to Lean principles',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'courses',
    duration: '15:30',
    views_count: 2300,
    rating: 4.8,
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thumbnail_url: null,
  },
  {
    id: '2',
    title: 'Client Success Story - Manufacturing',
    description: 'Real-world implementation case study',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'testimonials',
    duration: '8:45',
    views_count: 1800,
    rating: 4.9,
    is_premium: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    thumbnail_url: null,
  },
];

// Subscription mechanism for data changes
type DataChangeListener = () => void;
let dataChangeListeners: DataChangeListener[] = [];

export const subscribeToDataChanges = (listener: DataChangeListener) => {
  dataChangeListeners.push(listener);
  return () => {
    dataChangeListeners = dataChangeListeners.filter(l => l !== listener);
  };
};

export const refreshLocalData = () => {
  dataChangeListeners.forEach(listener => listener());
};

// Blog Posts
export const getLocalBlogPosts = () => localBlogPosts;

export const addLocalBlogPost = (post: any) => {
  // Ensure the post has a unique ID
  if (!post.id) {
    post.id = crypto.randomUUID();
  }
  post.created_at = post.created_at || new Date().toISOString();
  post.updated_at = new Date().toISOString();
  localBlogPosts.push(post);
  refreshLocalData();
};

export const updateLocalBlogPost = (id: string, updates: any) => {
  const index = localBlogPosts.findIndex(post => post.id === id);
  if (index !== -1) {
    localBlogPosts[index] = { 
      ...localBlogPosts[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    refreshLocalData();
    return true;
  }
  return false;
};

export const deleteLocalBlogPost = (id: string) => {
  const index = localBlogPosts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  localBlogPosts.splice(index, 1);
  refreshLocalData();
  return true;
};

// Courses
export const getLocalCourses = () => localCourses;

export const addLocalCourse = (course: any) => {
  // Ensure the course has a unique ID
  if (!course.id) {
    course.id = crypto.randomUUID();
  }
  course.created_at = course.created_at || new Date().toISOString();
  course.updated_at = new Date().toISOString();
  localCourses.push(course);
  refreshLocalData();
};

export const updateLocalCourse = (id: string, updates: any) => {
  const index = localCourses.findIndex(course => course.id === id);
  if (index !== -1) {
    localCourses[index] = { 
      ...localCourses[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    refreshLocalData();
    return true;
  }
  return false;
};

export const deleteLocalCourse = (id: string) => {
  const index = localCourses.findIndex(course => course.id === id);
  if (index === -1) return false;
  
  localCourses.splice(index, 1);
  refreshLocalData();
  return true;
};

// Course Videos
export const getLocalCourseVideos = (courseId?: string) => {
  if (courseId) {
    return localCourseVideos.filter(video => video.course_id === courseId);
  }
  return localCourseVideos;
};

export const addLocalCourseVideo = (video: any) => {
  // Ensure the course video has a unique ID
  if (!video.id) {
    video.id = crypto.randomUUID();
  }
  video.created_at = video.created_at || new Date().toISOString();
  video.updated_at = new Date().toISOString();
  localCourseVideos.push(video);
  refreshLocalData();
};

export const updateLocalCourseVideo = (id: string, updates: any) => {
  const index = localCourseVideos.findIndex(video => video.id === id);
  if (index !== -1) {
    localCourseVideos[index] = { 
      ...localCourseVideos[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    refreshLocalData();
    return true;
  }
  return false;
};

export const deleteLocalCourseVideo = (id: string) => {
  const index = localCourseVideos.findIndex(video => video.id === id);
  if (index === -1) return false;
  
  localCourseVideos.splice(index, 1);
  refreshLocalData(); // Trigger refresh for all subscribers
  return true;
};

// General Videos
export const getLocalVideos = () => localVideos;

export const addLocalVideo = (video: any) => {
  // Ensure the video has a unique ID
  if (!video.id) {
    video.id = crypto.randomUUID();
  }
  video.created_at = video.created_at || new Date().toISOString();
  video.updated_at = new Date().toISOString();
  localVideos.push(video);
  refreshLocalData();
};

export const updateLocalVideo = (id: string, updates: any) => {
  const index = localVideos.findIndex(video => video.id === id);
  if (index !== -1) {
    localVideos[index] = { 
      ...localVideos[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    refreshLocalData();
    return true;
  }
  return false;
};

export const deleteLocalVideo = (id: string) => {
  const index = localVideos.findIndex(video => video.id === id);
  if (index === -1) return false;
  
  localVideos.splice(index, 1);
  refreshLocalData();
  return true;
};