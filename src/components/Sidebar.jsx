import { Link } from "react-router";
import { useWeb3Context } from "../context/web3Context";

export const Sidebar = () => {
  const { setSubjectName } = useWeb3Context();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        gap: "20px",
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <li style={{ listStyle: "none" }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => setSubjectName("all")}
          >
            Trang chủ
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/math"
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => setSubjectName("toan")}
          >
            Toán
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/english"
            style={{ textDecoration: "none" }}
            onClick={() => setSubjectName("tienganh")}
          >
            Tiếng Anh
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link to="/vatly" style={{ textDecoration: "none" }} onClick={() => setSubjectName("vatly")}>
            Vật lý
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/science"
            style={{ textDecoration: "none" }}
            onClick={() => setSubjectName("hoahoc")}
          >
            Hóa học
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/literature"
            style={{ textDecoration: "none" }}
            onClick={() => setSubjectName("van")}
          >
            Văn Học
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link
            to="/history-transaction"
            style={{ textDecoration: "none" }}
          >
            Lịch sử giao dịch
          </Link>
        </li>
      </ul>
    </div>
  );
};
