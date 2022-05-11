import React, { useState } from "react";
import { Link } from 'react-router-dom';
import * as execute from '../contract/execute';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import WalletAddress from '../components/WalletAddress';

const Guide = () => {
  const connectedWallet = useConnectedWallet();

  const[player, setPlayer] = useState('');
  const[amount, setAmount] = useState('');

  const rewardPlayer = async () => {
    if (connectedWallet && connectedWallet.network.name === 'testnet') {
      const tx = await execute.send(connectedWallet, player, amount);
      console.log(tx);
      // Once the transaction is confirmed, we let the user know and navigate to the leaderboard
      alert('Player rewarded!');
    }
  };

  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>⚔ UST Defenders ⚔️</h1>
            <p>Do Kwon calls for arms! Protect UST from depegging.</p>
          </div>
        </Link>
        <WalletAddress/>
      </header>

      <div className="score-board-container">
        <h3>Admin Panel</h3>
        
        <div>
          <input type="text" placeholder="Player Address" onChange={e => setPlayer(e.target.value)} />
          <input type="text" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
          <button onClick={rewardPlayer}>Submit</button>
        </div>
      </div>
    </main>
  );
};

export default Guide;