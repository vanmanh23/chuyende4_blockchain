import React, { createContext, useContext, useState } from 'react';

// Create the Web3Context
const Web3Context = createContext();

// Create a provider component
export const Web3Provider = ({ children }) => {
    const [web3context, setWeb3context] = useState(null);
    const [accountcontext, setAccountcontext] = useState('');
    const [balance, setBalance] = useState(0); // Số dư ví
    const [subjectName, setSubjectName] = useState(''); // Tên môn học
    return (
        <Web3Context.Provider value={{ web3context, setWeb3context, accountcontext, setAccountcontext, balance, setBalance, subjectName, setSubjectName }}>
            {children}
        </Web3Context.Provider>
    );
};

// Custom hook to use the Web3Context
export const useWeb3Context = () => {
    return useContext(Web3Context);
};