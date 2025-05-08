import React, { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/web3Context";

const TransactionHistory = () => {
  const { web3context, accountcontext } = useWeb3Context();
  const [blockchainTransactions, setBlockchainTransactions] = useState([]);
  const getAllBlockchainTransactions = async () => {
    if (!web3context || !accountcontext) {
      alert("Please connect MetaMask first!");
      return;
    }

    try {
      const latestBlockNumber = await web3context.eth.getBlockNumber();
      const txs = [];

      // Duyệt qua tất cả các block từ 0 đến block mới nhất
      for (let i = 0; i <= latestBlockNumber; i++) {
        const block = await web3context.eth.getBlock(i, true); // true để lấy chi tiết giao dịch
        if (block && block.transactions) {
          block.transactions.forEach((tx) => {
            // Kiểm tra nếu giao dịch liên quan đến tài khoản hiện tại
            if (
              tx.from.toLowerCase() === accountcontext.toLowerCase() ||
              tx.to?.toLowerCase() === accountcontext.toLowerCase()
            ) {
              const amountInEth = web3context.utils.fromWei(tx.value, "ether");
              //   const txSummary = `Tx_Hash: ${tx.hash}, From: ${tx.from}, To: ${tx.to || 'N/A'}, Amount: ${amountInEth} ETH, Block: ${tx.blockNumber}`;
              const txSummary = {
                Tx_Hash: tx.hash,
                From: tx.from,
                To: tx.to || "N/A",
                Amount: amountInEth + " ETH",
                Block: tx.blockNumber,
              };
              txs.push(txSummary);
            }
          });
        }
      }

      if (txs.length === 0) {
        setBlockchainTransactions([
          "No transactions found on the blockchain for this account.",
        ]);
      } else {
        setBlockchainTransactions(txs);
      }
    } catch (error) {
      console.error(error);
      setBlockchainTransactions([
        "Failed to fetch transactions: " + error.message,
      ]);
    }
  };
  useEffect(() => {
    getAllBlockchainTransactions();
  }, [ web3context, accountcontext ]);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>
        Transaction History
      </h1>
      <table
        style={{
          width: "100%",
          textAlign: "left",
          overscrollBehavior: "contain",
          borderCollapse: "collapse",
          marginTop: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", color: "#333" }}>
            <th style={{ padding: "8px", borderBottom: "2px solid #ddd" }}>
              Tx Hash
            </th>
            <th style={{ padding: "8px", borderBottom: "2px solid #ddd" }}>
              FROM
            </th>
            <th style={{ padding: "8px", borderBottom: "2px solid #ddd" }}>
              TO
            </th>
            <th style={{ padding: "8px", borderBottom: "2px solid #ddd" }}>
              AMOUNT
            </th>
            <th style={{ padding: "8px", borderBottom: "2px solid #ddd" }}>
              BLOCK
            </th>
          </tr>
        </thead>
        <tbody>
          {blockchainTransactions.map((transaction, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e8f5e9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#f9f9f9" : "#fff")
              }
            >
              <td
                style={{
                  padding: "8px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overscrollBehavior: "contain",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {transaction.Tx_Hash}
              </td>
              <td
                style={{
                  padding: "8px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overscrollBehavior: "contain",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {transaction.From}
              </td>
              <td
                style={{
                  padding: "8px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overscrollBehavior: "contain",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {transaction.To}
              </td>
              <td
                style={{
                  padding: "8px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overscrollBehavior: "contain",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {transaction.Amount}
              </td>
              <td
                style={{
                  padding: "8px",
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overscrollBehavior: "contain",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {transaction.Block}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
