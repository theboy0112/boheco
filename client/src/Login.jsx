// import { useState } from "react";
// import { useLocation,useNavigate } from "react-router-dom";

// function Login() {
//   const [accountNumber, setAccountNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (accountNumber.trim() === "") {
//       alert("Please enter an account number.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const transactionUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-latest-bills?q=${accountNumber}`;
//       const accountUserUrl = `http://119.93.33.254:8447/inquiry-api/public/api/get-account-by-account-number?acctNo=${accountNumber}`;

//       const [transactionRes, userRes] = await Promise.all([
//         fetch(transactionUrl),
//         fetch(accountUserUrl),
//       ]);

//       if (!transactionRes.ok || !userRes.ok) {
//         throw new Error("One of the requests failed");
//       }

//       const transactionData = await transactionRes.json();
//       const userInfo = await userRes.json();

//       navigate("/home", {
//         state: {
//           accountNumber,
//           transactionData,
//           userInfo,
//         },
//       });
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Login failed. Check account number.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-details">
//       <h3>BOHECO || ASSIST</h3>
//       <input
//         type="text"
//         placeholder="Input 10-digit Account Number"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//       />
//       <button onClick={handleLogin} disabled={loading}>
//         {loading ? "Loading..." : "Proceed"}
//       </button>
//     </div>
//   );
// }

// export default Login;
