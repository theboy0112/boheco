import { useState } from "react";
import "./App.css";
import boheco from "./assets/boheco.png";
import "animate.css";
import location from "./assets/location.png";
import name from "./assets/name.png";
import contact from "./assets/contact.png";
import email from "./assets/email.png";

import light from "./assets/light.png";

function App() {
  const [accountNumber, setAccountNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [transactionDataResult, setTransactionDataResult] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const cleanedAccountNumber = accountNumber.trim();

    const transactionUrl = `/.netlify/functions/proxy?endpoint=get-latest-bills&q=${cleanedAccountNumber}`;
    const accountUserUrl = `/.netlify/functions/proxy?endpoint=get-account-by-account-number&acctNo=${cleanedAccountNumber}`;

    try {
      const [transactionRes, userRes] = await Promise.all([
        fetch(transactionUrl),
        fetch(accountUserUrl),
      ]);

      if (!transactionRes.ok || !userRes.ok) {
        throw new Error("One of the requests failed");
      }

      const transactionData = await transactionRes.json();
      const userInfo = await userRes.json();

      if (userInfo.error || transactionData.error) {
        throw new Error(userInfo.error || transactionData.error);
      }

      setUserData(userInfo);
      setTransactionDataResult(transactionData);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("❌ Error fetching data:", err.message);
      setUserData(null);
      setTransactionDataResult([]);
      alert("⛔ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (accountNumber.trim() === "") {
      alert(" ⚠️Please enter an account number.");

      return;
    }
    fetchData();
  };
  console.log(transactionDataResult);
  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-details">
          <h3>BOHECO</h3>
          <h3>Serving You to Light and Delight</h3>
          <input
            type="text"
            placeholder="Input 10-digit Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Please Wait...." : "Proceed"}
          </button>
        </div>
      ) : (
        <div className="layout-container">
          <div className="sidebar">
            <h1>BOHECO 1</h1>
            <img src={boheco} className="boheco-logo" />
            <ul>
              <li>
                <a>{accountNumber}</a>
              </li>
              <li>
                <a>
                  <img src={name} /> {userData.ConsumerName}
                </a>
              </li>
              <li>
                <a>
                  <img src={location} /> {userData.ConsumerAddress}
                </a>
              </li>
              <li>
                <a>Meter Number: {userData.MeterNumber}</a>
              </li>
              <li>
                <a>
                  <img src={contact} />{" "}
                  {userData.ContactNumber == null
                    ? "null"
                    : userData.ContactNumber}
                </a>
              </li>
              <li>
                <a>
                  <img src={email} />
                  {userData.Email == null ? "null" : userData.Email}
                </a>
              </li>
              <li>
                <a>Route Code: {userData.Route}</a>
              </li>
              <li>
                <button
                  onClick={() =>
                    (window.location.href = "https://boheco1.com/")
                  }
                >
                  Visit our official Page
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://boheco1.com/index.php/about-us/")
                  }
                >
                  About us
                </button>
              </li>
            </ul>
          </div>
          <div className="bill-history">
            <img src={light} /> BOHECO UNO BILLING SYSTEM <img src={light} />
          </div>
          <div
            className="content"
            style={{
              width: "100%",
              maxHeight: "690px",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <div className="content">
              <table className="table">
                <thead>
                  <tr>
                    <th>Billing Month</th>
                    <th>Payment Status</th>
                    <th>Bill Number</th>
                    <th>Amount Due</th>
                    <th>kWh Used</th>
                    <th>Surcharges</th>
                    <th>Total Amount Due</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionDataResult.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        {new Date(item.DueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </td>
                      <td
                        style={{
                          color: item.NetAmountPaid == null ? "red" : "green",
                        }}
                      >
                        {item.NetAmountPaid == null ? "✖" : "✔"}
                      </td>
                      <td>{item.BillNumber}</td>

                      <td>₱{item.NetAmount}</td>
                      <td>{item.PowerKWH}</td>
                      <td>
                        ₱
                        {item.NetAmountPaid != null
                          ? "0.00"
                          : parseFloat(item.Surcharges).toFixed(2)}
                      </td>

                      <td>
                        {"₱" +
                          (
                            parseFloat(item.NetAmount) +
                            (item.NetAmountPaid == null
                              ? parseFloat(item.Surcharges)
                              : 0)
                          ).toFixed(2)}
                      </td>
                      <td>
                        {new Date(item.DueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              color: "black",
              fontSize: "13px",
              fontStyle: "italic",
              marginTop: "1px",
            }}
          >
            {" "}
            © 2025 Bohol I Electric Cooperative, Inc. All Rights Reserved.
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
