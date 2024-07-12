import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <div style={styles.footer} className="d-flex justify-content-around align-items-center">
      <Link to="/" style={styles.iconLink}>
        <i className="fas fa-home" style={styles.icon}></i>
      </Link>
      <Link to="/transaction" style={styles.iconLink}>
        <i className="fas fa-exchange-alt" style={styles.icon}></i>
      </Link>
    </div>
  );
};

const styles = {
  footer: {
    margin: 'auto',
    bottom: 1,
    width: '80%',
    height: '60px',
    background: 'rgba(0, 0, 0)',
    borderRadius: 25,
    backdropFilter: 'blur(30px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyItems: 'center',
    zIndex: 1000,
  },
  iconLink: {
    textDecoration: 'none',
    color: '#481E14',
  },
  icon: {
    fontSize: '24px',
  },
};

export default Footer;
