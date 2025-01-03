import { useState } from 'react';
import { useCreatePost } from '../hooks/usePostMutations';
import { useTranslation } from 'react-i18next';

const CreatePost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const createPostMutation = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body });
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    input: {
      padding: '0.5rem',
      fontSize: '1rem'
    },
    textarea: {
      padding: '0.5rem',
      fontSize: '1rem',
      minHeight: '150px'
    },
    button: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <main style={styles.container}>
      <h2>{t('createPost')}</h2>
      <form onSubmit={handleSubmit} style={styles.form} aria-label="Create Post Form">
        <label>
          <span>{t('postTitle')}</span>
          <input
            style={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('postTitle')}
            required
          />
        </label>
        <label>
          <span>{t('postContent')}</span>
          <textarea
            style={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t('postContent')}
            required
          />
        </label>
        <button 
          type="submit" 
          style={styles.button}
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? t('creating') : t('create')}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;