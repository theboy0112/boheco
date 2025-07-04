// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Home() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     if (!state) {
//       navigate("/");
//     }
//   }, [state, navigate]);

//   if (!state) return null;

//   const { accountNumber, transactionData, userInfo } = state;

//   return (
//     <div className="layout-container">
//       <div className="sidebar">
//         <h1>Boheco 1</h1>
//         <img src={boheco} className="boheco-logo" alt="Boheco Logo" />
//         <ul>
//           <li><a>{accountNumber}</a></li>
//           <li><a><img src={name} alt="Name icon" /> {userInfo.ConsumerName}</a></li>
//           <li><a><img src={locationIcon} alt="Location icon" /> {userInfo.ConsumerAddress}</a></li>
//           <li><a>Meter Number: {userInfo.MeterNumber}</a></li>
//           <li><a>Pole Number:</a></li>
//           <li><a><img src={contact} alt="Contact icon" /></a></li>
//           <li><a><img src={email} alt="Email icon" /></a></li>
//           <li><a>Route Code: {userInfo.Route}</a></li>
//         </ul>
//       </div>
//       <div className="content" style={{ width: "90%", maxHeight: "700px", overflowY: "auto" }}>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Billing Month</th>
//               <th>Bill Number</th>
//               <th>Amount Due</th>
//               <th>kWh Used</th>
//               <th>Surcharges</th>
//               <th>Present Reading</th>
//               <th>Previous Reading</th>
//               <th>Total Amount Due</th>
//               <th>Due Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactionData.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{new Date(item.DueDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</td>
//                 <td>{item.BillNumber}</td>
//                 <td>₱{item.NetAmount}</td>
//                 <td>{item.PowerKWH}</td>
//                 <td>₱{item.Surcharges}</td>
//                 <td>{item.PowerPresentReading}</td>
//                 <td>{item.PowerPreviousReading}</td>
//                 <td>₱{(parseFloat(item.NetAmount) + parseFloat(item.Surcharges)).toFixed(2)}</td>
//                 <td>{new Date(item.DueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Home;