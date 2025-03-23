import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.js';
import '../Styles/Wishlist.css'; // Ensure this CSS file contains styles for the table

function Transactions() {
  const [closedPositions, setClosedPositions] = useState([]);

  useEffect(() => {
    // Function to fetch closed positions
    const fetchClosedPositions = async () => {
      try {
        const response = await axios.get('https://krypto-uo36.onrender.com/closedpositions'); // Update with your actual endpoint
        setClosedPositions(response.data);
      } catch (error) {
        console.error('Error fetching closed positions:', error);
      }
    };

    // Fetch closed positions
    fetchClosedPositions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="transactions-container">
        <div className="orders">
          <h2 className='closed-positions'>Closed Positions</h2>
          {closedPositions.length > 0 ? (
            <table className="closed-positions-table">
              <thead>
                <tr>
                  <th>CryptoCurrency</th>
                  <th>Price</th>
                  <th>Profit or Loss</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {closedPositions.map((position, index) => (
                  <tr key={index}>
                    <td>Bitcoin</td>
                    <td>${position.price.toFixed(2)}</td>
                    <td>{position.profitOrLoss}</td>
                    <td>{position.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No closed positions available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Transactions;
