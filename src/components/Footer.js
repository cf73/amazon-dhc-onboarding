import React from 'react';
import amazonLogo from '../assets/amazonlogo1.png';

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
        className="flex justify-center gap-12"
        style={{ 
          backgroundColor: '#232F3E',
          fontFamily: 'Amazon Ember',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px',
          color: 'white',
          paddingTop: '38px',
          paddingBottom: '38px'
        }}
      >
        <input
          type="text"
          value={data?.link1 || 'Your Account'}
          onChange={(e) => onUpdate({ ...data, link1: e.target.value })}
          className="bg-transparent border-none outline-none text-white text-center"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            width: '120px'
          }}
          placeholder="Link 1"
        />
        <input
          type="text"
          value={data?.link2 || 'Your Orders'}
          onChange={(e) => onUpdate({ ...data, link2: e.target.value })}
          className="bg-transparent border-none outline-none text-white text-center"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            width: '120px'
          }}
          placeholder="Link 2"
        />
        <input
          type="text"
          value={data?.link3 || 'Help'}
          onChange={(e) => onUpdate({ ...data, link3: e.target.value })}
          className="bg-transparent border-none outline-none text-white text-center"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            width: '120px'
          }}
          placeholder="Link 3"
        />
        <input
          type="text"
          value={data?.link4 || 'Sign Out'}
          onChange={(e) => onUpdate({ ...data, link4: e.target.value })}
          className="bg-transparent border-none outline-none text-white text-center"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            width: '120px'
          }}
          placeholder="Link 4"
        />
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
          src={amazonLogo} 
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
          className="flex justify-center gap-6 flex-wrap"
          style={{ 
            fontFamily: 'Amazon Ember',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '16px',
            marginBottom: '10px'
          }}
        >
          <input
            type="text"
            value={data?.legalLink1 || 'Privacy Notice'}
            onChange={(e) => onUpdate({ ...data, legalLink1: e.target.value })}
            className="bg-transparent border-none outline-none text-white text-center"
            style={{ 
              fontFamily: 'Amazon Ember',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              width: '100px'
            }}
            placeholder="Legal Link 1"
          />
          <input
            type="text"
            value={data?.legalLink2 || 'Conditions of Use'}
            onChange={(e) => onUpdate({ ...data, legalLink2: e.target.value })}
            className="bg-transparent border-none outline-none text-white text-center"
            style={{ 
              fontFamily: 'Amazon Ember',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              width: '130px'
            }}
            placeholder="Legal Link 2"
          />
          <input
            type="text"
            value={data?.legalLink3 || 'Interest-Based Ads'}
            onChange={(e) => onUpdate({ ...data, legalLink3: e.target.value })}
            className="bg-transparent border-none outline-none text-white text-center"
            style={{ 
              fontFamily: 'Amazon Ember',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              width: '140px'
            }}
            placeholder="Legal Link 3"
          />
          <input
            type="text"
            value={data?.legalLink4 || 'Consumer Health Data Privacy Disclosure'}
            onChange={(e) => onUpdate({ ...data, legalLink4: e.target.value })}
            className="bg-transparent border-none outline-none text-white text-center"
            style={{ 
              fontFamily: 'Amazon Ember',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              width: '280px'
            }}
            placeholder="Legal Link 4"
          />
        </div>
        
        <div style={{ 
          fontFamily: 'Amazon Ember',
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '16px',
          color: '#DDD'
        }}>
          <input
            type="text"
            value={data?.copyright || '© 1996-2025, Amazon.com, Inc. or its affiliates'}
            onChange={(e) => onUpdate({ ...data, copyright: e.target.value })}
            className="bg-transparent border-none outline-none text-center"
            style={{ 
              fontFamily: 'Amazon Ember',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '16px',
              color: '#DDD',
              width: '400px'
            }}
            placeholder="© Copyright text"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

