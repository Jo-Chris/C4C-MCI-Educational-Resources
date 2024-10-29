import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './styles.css'; // Importiere die CSS-Datei



// Importiere die benötigten Komponenten
import { NoWalletDetected } from './NoWalletDetected';
import LandingPage from "./LandingPage"

  

// Überprüfe den Coin-Wert alle 2 Sekunden (2000 Millisekunden)

// Sepolia Netzwerk ID
const SEPOLIA_NETWORK_ID = 11155111;
const ADMIN_ADDRESS = '0x8328614A58BD49bDEAeb0a917885EDe4b077Da03'; // Deine Adresse

// Definiere die Dapp-Komponente
const Dapp = () => {
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [provider, setProvider] = useState(null);
  const [transactionError, setTransactionError] = useState(null);
  const [txBeingSent, setTxBeingSent] = useState(null);
  const [coins, setCoins] = useState(500);
  const [notification, setNotification] = useState(null); // Für Benachrichtigungen
  const [showStartScreen, setShowStartScreen] = useState(true); // Steuert die Anzeige des Startbildschirms
  const [showGalleryScreen, setShowGalleryScreen] = useState(false); //Gallerie
  const [showShopScreen, setShowShopScreen] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      console.log("MetaMask gefunden");
    } else {
      console.log("MetaMask nicht gefunden");
    }

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connectMetaMask = async () => {
    console.log("Connected to Metamask");
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
          throw new Error("Keine Konten gefunden");
        }
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);
        console.log("setting addr: ", accounts[0]);
        setSelectedAddress(accounts[0]);

        const network = await ethersProvider.getNetwork();
        if (network.chainId !== SEPOLIA_NETWORK_ID) {
          alert("Bitte wechsle zum Sepolia Testnetzwerk in MetaMask.");
        }

        fetchBalance(selectedAddress);
      } catch (error) {
        console.error("Fehler bei der Verbindung zu MetaMask:", error);
        alert("Fehler beim Verbinden mit MetaMask: " + error.message);
      }
    } else {
      alert("MetaMask ist nicht installiert oder wird nicht erkannt!");
    }
  };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setSelectedAddress(undefined);
      setBalance(0);
      setCoins(500);
    } else {
      setSelectedAddress(accounts[0]);
    }
  };

  const buyCoins = async (amount) => {
    if (!provider || !selectedAddress) return;

    let priceInWei;
    switch(amount) {
      case 10:
        priceInWei = ethers.utils.parseEther('0.0009'); // 0.0009 Sepolia ETH
        break;
      case 100:
        priceInWei = ethers.utils.parseEther('0.009'); // 0.009 Sepolia ETH
        break;
      case 1000:
        priceInWei = ethers.utils.parseEther('0.09'); // 0.09 Sepolia ETH
        break;
      default:
        priceInWei = ethers.utils.parseEther('0.0009');
    }

    try {
      const tx = await provider.getSigner().sendTransaction({
        to: ADMIN_ADDRESS,
        value: priceInWei
      });
      setTxBeingSent(tx.hash);
      await tx.wait();

      setCoins(coins + amount);
      showNotification('Erfolg! Du hast ' + amount + ' Coins gekauft.');
    } catch (error) {
      setTransactionError(error);
      console.error("Fehler beim Kauf von Coins:", error);
      showNotification('Fehler beim Kauf von Coins.');
    } finally {
      setTxBeingSent(null);
    }
  };

  const buyArtwork = async () => {
    if (!provider || !selectedAddress) return;

    const artworkPriceInCoins = 50;

    if (coins < artworkPriceInCoins) {
      showNotification('Zu wenig Coins für den Kauf des Kunstwerks.');
      return;
    }

    setCoins(coins - artworkPriceInCoins);
    showNotification('Bild in deiner Galerie!');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000); // Meldung nach 2 Sekunden ausblenden
  };


  const resetBackState = () => {
    setShowStartScreen(true);

    setShowShopScreen(false);
    setShowGalleryScreen(false)
  }

  const handleStartButtonClick = (buttonType) => {
    setShowStartScreen(false);

    if (buttonType === 'shop') {
      setShowShopScreen(true);
    }

    if(buttonType === "gallery") {
      setShowGalleryScreen(true)
    }
  };

  const addSepoliaNetwork = async () => {
    const SEPOLIA_NETWORK_PARAMS = {
      chainId: '0x1A2B3C4D', // Hexadecimal representation of Sepolia Network ID
      chainName: 'Sepolia Test Network',
      nativeCurrency: {
        name: 'Sepolia ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
    };
  
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [SEPOLIA_NETWORK_PARAMS],
      });
      console.log('Sepolia network added.');
    } catch (error) {
      console.error('Error adding Sepolia network:', error);
      showNotification('Error adding Sepolia network.');
    }
  };



  const fetchBalance = async (addr) => {
    // Validate the address
  
    console.log("Fetching Balance!");
  
    // Correct the URL if there was a mistake (check for unnecessary spaces)
    const ethersProvider = new ethers.providers.JsonRpcProvider("https://endpoints.omniatech.io/v1/eth/sepolia/public");
  
    try {
      // Get the network
      const network = await ethersProvider.getNetwork();
      console.log("Network is: ", network);
  
      // Check if the network is Sepolia
      if (network.chainId !== SEPOLIA_NETWORK_ID) {
        await addSepoliaNetwork();
        return;
      }
  
      // Get the balance
      console.log("Getting balance...");
      const balanceInWei = await ethersProvider.getBalance("0x8328614a58bd49bdeaeb0a917885ede4b077da03");
      console.log("Balance is", balanceInWei.toString());
      console.log("Balance in ETH", ethers.utils.formatEther(balanceInWei));
  
      // Set the balance formatted to 4 decimal places
      setBalance(Number(ethers.utils.formatEther(balanceInWei)).toFixed(4));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
  


  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  if (!selectedAddress) {
    return (
      <div className="start-screen">
        <div className="start-buttons">
          {
            selectedAddress && (
              <>
                <button className="start-button" onClick={() => handleStartButtonClick('shop')}>Shop</button>
                <button className="start-button" onClick={() => handleStartButtonClick('gallery')}>Gallery</button>
              </>
            )
          }
          { !selectedAddress &&  <button className="connect-button" onClick={connectMetaMask}>Mit MetaMask verbinden</button> }

            <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">


  { showStartScreen && (

<div className="start-screen">
<div className="start-buttons">
  <div className='account-information'>
    <p>Address {selectedAddress}</p>
    <p>Balance {balance} ETH </p>     
  </div>
  <div> 
    <p className='game-name'> Nft Simulator </p>  
  </div>
  <div className='button-container'>
    <button className="start-button" onClick={() => handleStartButtonClick('shop')}>Shop</button>
    <button className="start-button" onClick={() => handleStartButtonClick('gallery')}>Gallery</button>
    
  </div>
  { !selectedAddress &&  <button className="connect-button" onClick={connectMetaMask}>Mit MetaMask verbinden</button> }
  </div>
</div>
 )}
{ showShopScreen && (
        <div className="container">
          <button className="back-button" onClick={() => resetBackState()}>Back</button>
          <div className="coin-display">Coins: {coins}</div>
          <div id="buttons-container">
            <div className="button-column">
              <button
                className="buy-button"
                onClick={() => buyCoins(10)}
                disabled={!selectedAddress}
              >
                10 Coins für 0.00001 Sepolia ETH
              </button>
              <button
                className="buy-button"
                onClick={() => buyCoins(100)}
                disabled={!selectedAddress}
              >
                100 Coins für 0.0001 Sepolia ETH
              </button>
              <button
                className="buy-button"
                onClick={() => buyCoins(1000)}
                disabled={!selectedAddress}
              >
                10000 Coins für 0.01 Sepolia ETH
              </button>
              <button
                id="artwork-button"
                className="buy-button"
                onClick={buyArtwork}
                disabled={!selectedAddress}

              >
                Kunstwerk kaufen für 50 Coins
              </button>
            </div>
          </div>
          {notification && (
            <div className={`notification show`}>
              {notification}
            </div>
          )}
          <button
            className="connect-button"
            onClick={() => alert('Du bist schon mit deinem MetaMask Wallet verbunden.')}
          >
            Connect with MetaMask
          </button>
        </div>
      ) }
    {showGalleryScreen && (
      <div> 
        <button className="back-button" onClick={() => resetBackState()}>Back</button>
        <LandingPage/>
      </div>
    )}
    </div>
  );
};

export default Dapp;
