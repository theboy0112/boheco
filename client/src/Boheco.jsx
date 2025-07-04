// import { useState } from "react";
// import "./App.css";
// import boheco from "./assets/boheco.png";
// import "animate.css";

// function App() {
//   const [accountNumber, setAccountNumber] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [transactionDataResult, setTransactionDataResult] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     const transactionUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${accountNumber}`;
//     const accountUserUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${accountNumber}`;

//     try {
//       const [transactionRes, userRes] = await Promise.all([
//         fetch(transactionUrl),
//         fetch(accountUserUrl),
//       ]);

//       if (!transactionRes.ok || !userRes.ok) {
//         throw new Error("One of the requests failed");
//       }

//       const transactionData = await transactionRes.json();
//       const userInfo = await userRes.json();

//       setUserData(userInfo);
//       setTransactionDataResult(transactionData);
//       setIsLoggedIn(true);
//     } catch (err) {
//       console.error("Error fetching data:", err.message);
//       setUserData(null);
//       setTransactionDataResult([]);
//       alert("Failed to fetch data. Check account number.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleLogin = () => {
//     if (accountNumber.trim() === "") {
//       alert("Please enter an account number.");
//       return;
//     }
//     fetchData();
//   };
//   console.log(transactionDataResult);
//   return (
//     <div className="">
//       <div></div>
//       {!isLoggedIn ? (
//         <div className="login-details">
//           <h3>BOHECO || ASSIST</h3>
//           <input
//             type="text"
//             placeholder="Input 10-digit Account Number"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             style={{
//               color: "black",
//               background: "transparent",
//               padding: "10px",
//               width: "80%",
//               marginBottom: "10px",
//             }}
//           />
//           <button
//             style={{ color: "red" }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Proceed"}
//           </button>
//         </div>
//       ) : (
//         <>
//           <div style={{ color: "black" }} className="account-details">
//             <ul>
//               <li>
//                 <a>{accountNumber}</a>
//               </li>
//               <li>
//                 <a>{userData.ConsumerName}</a>
//               </li>
//               <li>
//                 <a>{userData.ConsumerAddress}</a>
//               </li>
//               <li>
//                 <a>Meter Number: {userData.MeterNumber}</a>
//               </li>
//               <li>
//                 <a>Route Code:&nbsp;{userData.Route}</a>
//               </li>
//             </ul>

//             <button
//               onClick={() => setIsLoggedIn(false)}
//               style={{ marginTop: "20px" }}
//             >
//               Logout
//             </button>
//           </div>
//           <div
//             className="ledger"
//             style={{
//               width: "800px",
//               maxHeight: "500px",
//               overflowY: "auto",
//               marginTop: "20px",
//               background: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//             }}
//           >
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Billing Month</th>
//                   <th>Bill Number</th>
//                   <th>Amount Due</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactionDataResult.map((item, idx) => (
//                   <tr key={idx}>
//                     <td>{item.DueDate}</td>
//                     <td>{item.BillNumber}</td>
//                     <td>{item.NetAmount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* <h3>Account Info</h3>
//     <pre>{JSON.stringify(userData, null, 2)}</pre> */}
//           {/* <h3>Transaction Info</h3>
//     <pre>{JSON.stringify(transactionDataResult, null, 2)}</pre> */}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
