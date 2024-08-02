import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import '../Styles/Crypto.css'; // Import CSS file for custom styling
import Navbar from '../Navbar';

function formatTimestamp(timestamp) {
  if (timestamp.toString().length === 10) {
    timestamp *= 1000; // Convert seconds to milliseconds
  }
  const date = new Date(timestamp);
  const options = { hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('en-US', options);
}

function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
}

function Crypto() {
  const [priceData, setPriceData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [position, setPosition] = useState(null);
  const [orderType, setOrderType] = useState(null); // 'buy' or 'sell'
  const [currentPrice, setCurrentPrice] = useState(null);
  const [coinsList, setCoinsList] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coins',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h',
          'tiers[0]': '1',
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '5',
          offset: '0'
        },
        headers: {
          'X-RapidAPI-Key': 'd32cfa6792mshe93314b0e40a130p1d3ef8jsndfd05eaa83e4',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setCoinsList(response.data.data.coins);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();

    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history',
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h'
        },
        headers: {
          'X-RapidAPI-Key': 'd32cfa6792mshe93314b0e40a130p1d3ef8jsndfd05eaa83e4',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setPriceData(response.data);
        setCurrentPrice(parseFloat(response.data.data.history[response.data.data.history.length - 1].price));
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Fetch latest price data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBuy = async () => {
    if (orderType === 'buy' && !position) {
      alert('A buy order already exists. Complete it before placing a sell order.');
      return;
    }

    if (priceData) {
      const timestamp = getCurrentTimestamp();

      if (orderType === 'sell' && position) {
        const profitOrLoss = (position.price - currentPrice).toFixed(2);
        const closedOrder = {
          type: 'buy',
          price: currentPrice,
          profitOrLoss,
          timestamp
        };
        try {
          await axios.post('http://localhost:5000/closedpositions', closedOrder);
          setOrders([...orders, `Close Sell: Buy at ${currentPrice.toFixed(2)} for P/L: ${profitOrLoss} at ${timestamp}`]);
          setPosition(null);
          setOrderType(null);
        } catch (error) {
          console.error('Error in logging closed position:', error);
          alert('Failed to log closed position');
        }
      } else {
        try {
          await axios.post('http://localhost:5000/buyorder', { currentPrice });
          setOrders([...orders, `Buy at ${currentPrice.toFixed(2)} at ${timestamp}`]);
          setPosition({ type: 'buy', price: currentPrice, timestamp });
          setOrderType('buy');
        } catch (error) {
          console.error('Error in placing order:', error);
          alert('Failed to place an order');
        }
      }
    }
  };

  const handleSell = async () => {
    if (orderType === 'sell' && !position) {
      alert('A sell order already exists. Complete it before placing a buy order.');
      return;
    }

    if (priceData) {
      const timestamp = getCurrentTimestamp();

      if (orderType === 'buy' && position) {
        const profitOrLoss = (currentPrice - position.price).toFixed(2);
        const closedOrder = {
          type: 'sell',
          price: currentPrice,
          profitOrLoss,
          timestamp
        };
        try {
          await axios.post('http://localhost:5000/closedpositions', closedOrder);
          setOrders([...orders, `Close Position at ${currentPrice.toFixed(2)} for P/L: ${profitOrLoss} at ${timestamp} `]);
          setPosition(null);
          setOrderType(null);
        } catch (error) {
          console.error('Error in logging closed position:', error);
          alert('Failed to log closed position');
        }
      } else {
        try {
          await axios.post('http://localhost:5000/sellorder', { currentPrice });
          setOrders([...orders, `Sell at ${currentPrice.toFixed(2)} at ${timestamp}`]);
          setPosition({ type: 'sell', price: currentPrice, timestamp });
          setOrderType('sell');
        } catch (error) {
          console.error('Error in placing order:', error);
          alert('Failed to place an order');
        }
      }
    }
  };

  const calculateProfitOrLoss = () => {
    if (position && currentPrice) {
      return position.type === 'buy' 
        ? (currentPrice - position.price).toFixed(2)
        : (position.price - currentPrice).toFixed(2);
    }
    return null;
  };

  const currentProfitOrLoss = calculateProfitOrLoss();

  return (
    <>
      <div className='Main'>
        <Navbar />
        <div style={{ marginLeft: '40px' }}>
          <text style={{ color: 'white', fontFamily: 'fantasy', fontSize: 50 }}>Crypto</text>
        </div>
        <div className="dashboard-container">
          <div className="chart-container">
            {priceData && (
              <ReactApexChart
                options={{
                  chart: {
                    type: 'line',
                    height: '400px',
                    toolbar: { show: false }
                  },
                  title: {
                    text: 'Bitcoin',
                    align: 'center',
                    style: {
                      fontSize: '34px',
                      fontFamily: 'fantasy',
                      color: 'black'
                    }
                  },
                  xaxis: {
                    categories: priceData.data.history.map(item => formatTimestamp(item.timestamp)).reverse(),
                    labels: { style: { fontSize: '32px' } }
                  },
                  yaxis: {
                    labels: {
                      formatter: val => `$${parseFloat(val).toFixed(2)}`,
                      style: { fontSize: '12px' }
                    }
                  }
                }}
                series={[{
                  name: 'Bitcoin Price',
                  data: priceData.data.history.map(item => item.price).reverse(),
                }]}
                type="line"
                height={350}
              />
            )}
            <div className="buttons-container">
              <button className="buy-button" onClick={handleBuy}>Buy</button>
              <button className="sell-button" onClick={handleSell}>Sell</button>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', display: 'flex', top: '20%', right: '10%' }}>
          <div className='Stocks-list' style={{ position: 'absolute', display: 'flex', top: '5%', right: '30%', borderRadius: '20px' }}>
            <text style={{ color: 'white', fontFamily: 'Fugaz One, sans-serif', fontSize: 25, fontWeight: 200 }}>UPCOMING STOCKS LIST</text>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', top: '20%', right: '55%' }}>
              {coinsList.map((coin, index) => (
                <div key={index} style={{ fontFamily: 'Signika Negative, sans-serif', fontSize: 30, fontWeight: 100, color: 'white' }}>{coin.name}</div>
              ))}
            </div>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', top: '20%', right: '8%' }}>
              {coinsList.map((coin, index) => (
                <div key={index} style={{ fontFamily: 'Signika Negative, sans-serif', fontSize: 30, fontWeight: 100, color: 'white' }}>${parseInt(coin.price)}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='Order-Container'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 30, fontWeight: 200, color: 'white' }}>Orders Placed:</div>
              {orders.map((order, index) => (
                <p key={index} style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 20, fontWeight: 400, color: 'white' }}>{order}</p>
              ))}
            </div>
          </div>
          <div className='Position-Container'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 30, fontWeight: 200, color: 'white' }}>Position:</div>
              {position && (
                <p style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 24, fontWeight: 600, color: currentProfitOrLoss >= 0 ? 'green' : 'red' }}>
                  {`Position: ${position.type === 'buy' ? 'Bought' : 'Sold'} at ${position.price.toFixed(2)}. ${position.type === 'buy' ? 'Current Profit/Loss' : 'Expected Profit/Loss'}: ${currentProfitOrLoss}`}
                </p>
              )}
              <div style={{ fontFamily: 'Josefin Sans, sans-serif', fontSize: 20, fontWeight: 100, color: currentProfitOrLoss >= 0 ? 'green' : 'red', marginTop: '10px' }}>
                {`P&L: ${currentProfitOrLoss}`}
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: 'white', marginTop: '1%', marginLeft: '30px' }}>
          <div style={{ fontFamily: 'Signika Negative, sans-serif', fontSize: 30 }}>Market Timings:</div>
          <div className='Para'> Crypto markets are always open (24/7).</div>
          <div className='Para'>It has been suggested that the best time to trade cryptocurrencies is from 8am to 4pm. </div>
          <div className='Para'>This is the time when the most volatility occurs, particularly in American markets, so there is the most potential to make money at this point.</div>
        </div>
      </div>
    </>
  );
}

export default Crypto;
