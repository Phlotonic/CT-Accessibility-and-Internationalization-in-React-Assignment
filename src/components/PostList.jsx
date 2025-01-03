import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api';
import { useUpdatePost, useDeletePost } from '../hooks/usePostMutations';
import EditPostForm from './EditPostForm';
import PostItem from './PostItem';
import { useTranslation } from 'react-i18next';

const PostList = () => {
  const { t } = useTranslation();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleUpdate = (post) => {
    updatePostMutation.mutate({
      ...post,
      title: editedTitle,
      body: editedBody
    });
    setEditingPost(null);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditedTitle('');
    setEditedBody('');
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts;
  }, [posts]);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    postList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  };

  if (isLoading) return <div>Loading posts...</div>;

  return (
    <main style={styles.container}>
      <h1>{t('posts')}</h1>
      <ul style={styles.postList} aria-label="List of Posts">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            {editingPost === post.id ? (
              <EditPostForm
                post={post}
                editedTitle={editedTitle}
                editedBody={editedBody}
                setEditedTitle={setEditedTitle}
                setEditedBody={setEditedBody}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
              />
            ) : (
              <PostItem
                post={post}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PostList;