import React, { use, useEffect, useState } from 'react';
import Web3 from 'web3';
import '../styles/HeaderPage.css';
import { useWeb3Context } from '../context/web3Context';

const HeaderPage = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  // const [walletBalance, setWalletBalance] = useState(0); 
  const [data, setData] = useState([]);

    const { setWeb3context, setAccountcontext, balance, setBalance } = useWeb3Context();
    const connectMetaMask = async () => {
        if (window.ethereum) {
          try {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setData(accounts);
            setAccount(accounts[0]);
            await updateBalance(web3Instance, accounts[0]);
          } catch (error) {
            console.error(error);
            alert('Failed to connect MetaMask: ' + error.message);
          }
        } else {
          alert('Please install MetaMask!');
        }
      };
      console.log('Account:', data); // Log địa chỉ ví
     // Cập nhật số dư
  const updateBalance = async (web3Instance, accountAddress) => {
    if (web3Instance && accountAddress) {
      const ethBalance = await web3Instance.eth.getBalance(accountAddress);
      console.log('ETH Balance:', ethBalance); // Log số dư ETH
      const ethBalanceInEth = web3Instance.utils.fromWei(ethBalance, 'ether');
      setBalance(parseFloat(ethBalanceInEth).toFixed(4));
    }
  };



    useEffect(() => {
      setWeb3context(web3);
      setAccountcontext(account);
    }, [web3, account]);

    
    return (
        <div className="header-page">
            <h1>Chuyên đề 4</h1>
            <div className="container">
            <button onClick={connectMetaMask}>Connect MetaMask</button>
        <div className="info">
          {account ? (
            <>
              <p>Connected Account: {account}</p>
              <p>Wallet Balance: {balance} ETH</p>
            </>
          ) : (
            <p>Please connect MetaMask</p>
          )}
        </div>
      </div>
        </div>
    );
}
export default HeaderPage;