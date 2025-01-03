import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import { useTranslation } from 'react-i18next';

const PostItem = React.memo(({ post, handleEdit, handleDelete }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  const styles = {
    postItem: {
      padding: '1rem',
      backgroundColor: 'black',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    button: {
      padding: '0.5rem 1rem',
      marginRight: '0.5rem',
      fontSize: '0.875rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    editButton: {
      backgroundColor: '#2196F3',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white'
    },
    commentList: {
      listStyle: 'none',
      padding: 0,
      marginTop: '1rem'
    },
    commentItem: {
      padding: '0.5rem',
      backgroundColor: 'gray',
      borderRadius: '4px',
      marginBottom: '0.5rem'
    }
  };

  return (
    <article style={styles.postItem} aria-labelledby={`post-title-${post.id}`}>
      <h3 id={`post-title-${post.id}`}>{post.title}</h3>
      <p>{post.body}</p>
      <button 
        style={{...styles.button, ...styles.editButton}}
        onClick={() => handleEdit(post)}
      >
        {t('edit')}
      </button>
      <button 
        style={{...styles.button, ...styles.deleteButton}}
        onClick={() => handleDelete(post.id)}
      >
        {t('delete')}
      </button>
      <CommentForm onSubmit={handleCommentSubmit} />
      <ul style={styles.commentList} aria-label="List of Comments">
        {comments.map((comment, index) => (
          <li key={index} style={styles.commentItem}>
            <strong>{comment.name}</strong>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </article>
  );
});

PostItem.displayName = 'PostItem';

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default PostItem;