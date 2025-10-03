import React from 'react';
import footerLogo from '../assets/footerlogo.png';

const Footer = ({ data, onUpdate }) => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer style={{ marginTop: '60px' }}>
      {/* Back to Top Bar */}
      <div 
        onClick={handleBackToTop}
        className="text-center cursor-pointer hover:bg-opacity-90 transition-colors"
        style={{ 
          backgroundColor: '#37475A', 
          padding: '18px 0',
          color: 'white',
          fontFamily: 'Amazon Ember',
          fontSize: '13px',
          fontWeight: '400',
          lineHeight: '19px'
        }}
      >
        Back to top
      </div>

      {/* Navigation Links */}
      <div 
        className="flex justify-center flex-wrap"
        style={{ 
          backgroundColor: '#232F3E',
          fontFamily: 'Amazon Ember',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px',
          color: 'white',
          paddingTop: '38px',
          paddingBottom: '38px',
          gap: '48px'
        }}
      >
        <span>Your Account</span>
        <span>Your Orders</span>
        <span>Help</span>
        <span>Sign Out</span>
      </div>

      {/* Amazon Logo Section */}
      <div 
        className="text-center"
        style={{ 
          backgroundColor: '#232F3E',
          paddingTop: '30px',
          paddingBottom: '30px'
        }}
      >
        <img 
          src={footerLogo} 
          alt="Amazon" 
          className="mx-auto"
          style={{ display: 'inline-block' }}
        />
      </div>

      {/* Legal Links and Copyright */}
      <div 
        className="text-center"
        style={{ 
          backgroundColor: '#131A22',
          color: 'white',
          paddingTop: '30px',
          paddingBottom: '30px'
        }}
      >
        <div 
          className="flex justify-center flex-wrap"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '16px',
            marginBottom: '10px',
            gap: '24px'
          }}
        >
          <span>Privacy Notice</span>
          <span>Conditions of Use</span>
          <span>Interest-Based Ads</span>
          <span>Consumer Health Data Privacy Disclosure</span>
        </div>
        
        <div style={{ 
          fontFamily: 'Amazon Ember',
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
          color: '#DDD'
        }}>
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
};

export default Footer;

