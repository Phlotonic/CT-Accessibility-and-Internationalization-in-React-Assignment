import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const createPost = async (newPost) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, {
    ...newPost,
    userId: 1,
    id: Date.now() // Ensure unique ID for new posts
  });
  return { ...response.data, id: Date.now() }; // Use the same ID we created
};

export const updatePost = async (updatedPost) => {
  // If the post ID is greater than 100, it's a temporary post
  if (updatedPost.id > 100) {
    // Return the updated post without making API call
    return updatedPost;
  }
  // Otherwise, make the PUT request for existing posts
  const response = await axios.put(
    `${API_BASE_URL}/posts/${updatedPost.id}`,
    updatedPost
  );
  return response.data;
};

export const deletePost = async (postId) => {
  await axios.delete(`${API_BASE_URL}/posts/${postId}`);
  return postId;
};