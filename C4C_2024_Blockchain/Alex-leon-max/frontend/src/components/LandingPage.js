import React, { useState, useEffect } from 'react';
import './styles.css';

function LandingPage() {

  const [showLanding, setShowLanding] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  // State variables for the four animals
  const [rabbit, setRabbit] = useState(0);
  const [fox, setFox] = useState(0);
  const [huskyKing, setHuskyKing] = useState(0);
  const [cat, setCat] = useState(0);

    const handleStartClick = () => {
    setShowGallery(true);
    setShowLanding(false);
  };

  const goBack = () => {
    setShowGallery(false);
    setShowLanding(true);
  };

  const handleAboutClick = () => {
    alert("Leon 12, Max 11, Alex 11.");
  };

  return (
    <div>
      {showLanding && 
        <div className='landing-background'>
          <div className='content'>
            <h1>Welcome to NFT Bank</h1>
            <div className="button-container">
              <button className="start-button" onClick={handleStartClick}>Start</button>
              <button className="about-button" onClick={handleAboutClick}>About the Creator</button>
            </div>
          </div>
        </div>
      }
      {showGallery && 
        <div className='gallery-background'>
          <div className='image-row'>
            <img className='img' src="./hase.webp" alt="NFT 1" />
            <img className='img' src="./fox.webp" alt="NFT 2" />
            <img className='img' src="./husky king 1.jpg" alt="NFT 3" />
            <img className='img' src="./cat.webp" alt="NFT 4" />
          </div>
          <div className='content'>
            <p>Welcome in the collections</p>
            <div className="animal-stats">
              <p>Rabbit: {rabbit}</p>
              <p>Fox: {fox}</p>
              <p>Husky King: {huskyKing}</p>
              <p>Cat: {cat}</p>
            </div>
            <button className="start-button" onClick={goBack}>Zurück</button>
          </div>
        </div>
      }
    </div>
  );
}

export default LandingPage;

