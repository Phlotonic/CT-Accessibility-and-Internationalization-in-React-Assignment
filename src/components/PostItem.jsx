import React from 'react';
import PropTypes from 'prop-types';

const PostItem = React.memo(({ post, handleEdit, handleDelete }) => {
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
    }
  };

  return (
    <div style={styles.postItem}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button 
        style={{...styles.button, ...styles.editButton}}
        onClick={() => handleEdit(post)}
      >
        Edit
      </button>
      <button 
        style={{...styles.button, ...styles.deleteButton}}
        onClick={() => handleDelete(post.id)}
      >
        Delete
      </button>
    </div>
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