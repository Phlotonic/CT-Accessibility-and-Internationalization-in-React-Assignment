import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost, deletePost } from "../api";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (old) => {
        return old ? [newPost, ...old] : [newPost];
      });
      navigate('/posts');
    }
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (old) => {
        return old?.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    }
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedPostId) => {
      queryClient.setQueryData(['posts'], (old) => {
        return old?.filter(post => post.id !== deletedPostId);
      });
    }
  });
};