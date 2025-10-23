import React, { useEffect } from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import '../components/styles/footer.css';

function Footer() {
  useEffect(() => {
    // Load the LinkedIn badge script dynamically
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="footer">
        <hr className="footer-devider" />
        <div className="footer-top">
          <div className="footer-top-left">
            <Link to="/">
              <img className="logo" src={logo} alt="MovieHub Logo" />
            </Link>
            <h2>MovieHub</h2>
          </div>
          <div className="footer-top-right">
            <div>Terms</div>
            <div>Privacy</div>
            <div>Help</div>
          </div>
        </div>

        <div className="footer-bottom">
          <h4>© 2025 MovieHub. All rights reserved.</h4>
        </div>

        {/* Hidden LinkedIn Badge (SEO backlink) */}
        <div
          className="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="medium"
          data-theme="light"
          data-type="VERTICAL"
          data-vanity="thilinadil"
          data-version="v1"
          style={{
            display: 'none', // completely invisible to users
            visibility: 'hidden',
            opacity: 0,
            width: '0px',
            height: '0px',
            overflow: 'hidden',
          }}
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://lk.linkedin.com/in/thilinadil?trk=profile-badge"
          >
            Thilina Dilshan
          </a>
        </div>

        {/* Backup invisible text link (for crawlers) */}
        <a
          href="https://lk.linkedin.com/in/thilinadil"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'none',
            visibility: 'hidden',
            opacity: 0,
          }}
        >
          Thilina Dilshan on LinkedIn
        </a>
      </div>
    </>
  );
}

export default Footer;
