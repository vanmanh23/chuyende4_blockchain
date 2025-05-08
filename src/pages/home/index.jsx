import React, { useEffect, useState } from "react";
import { courses } from "../../utils/courses";
import CourseCard from "../../components/CourseCard";
import { useWeb3Context } from "../../context/web3Context";

export default function HomePage() {
  const [data, setData] = useState([]);
  const { subjectName, web3context, accountcontext, setBalance } = useWeb3Context();
  const recipientAddress = ""; // Địa chỉ ví người nhận


  const transfer = async (transferPrice) => {
    console.log("Transfer function called");
    if (!web3context || !accountcontext) {
      alert('Please connect MetaMask first!');
      return;
    }

    const amount = parseFloat(transferPrice);
    // const amount = parseFloat(transferAmount);
    if (!web3context.utils.isAddress(recipientAddress)) {
      // setTransferResult('Invalid recipient address!');
      console.log('Invalid recipient address!');
      return;
    }
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount to transfer.');
      // setTransferResult('Please enter a valid amount to transfer.');
      return;
    }

    try {
      const amountInWei = web3context.utils.toWei(amount.toString(), 'ether');
      const tx = await web3context.eth.sendTransaction({
        from: accountcontext,
        to: recipientAddress,
        value: amountInWei,
      });
      updateBalance(web3context, accountcontext);
      alert(`Transfer successful! Tx Hash: ${tx.transactionHash}`);
    } catch (error) {
      console.error(error);
      // setTransferResult(`Transfer failed: ${error.message}`);
    }
  };
  const updateBalance = async (web3Instance, accountAddress) => {
    if (web3Instance && accountAddress) {
      const ethBalance = await web3Instance.eth.getBalance(accountAddress);
      console.log('ETH Balance:', ethBalance); // Log số dư ETH
      const ethBalanceInEth = web3Instance.utils.fromWei(ethBalance, 'ether');
      setBalance(parseFloat(ethBalanceInEth).toFixed(4));
    }
  };
  
  useEffect(() => {
    if (subjectName === "all") {
      setData(courses);
      return;
    }
    const khoahoc = courses.filter((course) => course.subject === subjectName);
    setData(khoahoc);
  }, [subjectName]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {data.map((course, index) => (
        <CourseCard
          key={index}
          image={course.imgUrl}
          title={course.name}
          price={course.price}
          buyHandle={() => transfer(course.price)}
        />
      ))}
    </div>
  );
}
