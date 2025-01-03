import { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, comment });
    setName('');
    setComment('');
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'black',
      borderRadius: '4px'
    },
    input: {
      padding: '0.5rem',
      fontSize: '1rem'
    },
    textarea: {
      padding: '0.5rem',
      fontSize: '1rem',
      minHeight: '100px'
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
    <form onSubmit={handleSubmit} style={styles.form} aria-label="Comment Form">
      <label>
        <span>Name</span>
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </label>
      <label>
        <span>Comment</span>
        <textarea
          style={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          required
        />
      </label>
      <button type="submit" style={styles.button}>
        Submit Comment
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CommentForm;