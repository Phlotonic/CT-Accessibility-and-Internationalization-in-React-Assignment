import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '1rem',
      marginBottom: '2rem'
    },
    list: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    link: {
      color: 'white',
      textDecoration: 'none'
    },
    languageSwitcher: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '1rem'
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
    <nav style={styles.nav} aria-label="Main Navigation">
      <ul style={styles.list}>
        <li>
          <Link to="/" style={styles.link}>{t('home')}</Link>
        </li>
        <li>
          <Link to="/posts" style={styles.link}>{t('posts')}</Link>
        </li>
        <li>
          <Link to="/create" style={styles.link}>{t('createPost')}</Link>
        </li>
        <div style={styles.languageSwitcher}>
          <button style={styles.button} onClick={() => changeLanguage('en')}>EN</button>
          <button style={styles.button} onClick={() => changeLanguage('es')}>ES</button>
          <button style={styles.button} onClick={() => changeLanguage('fr')}>FR</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;