import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const NewsComponent = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_46095ea89ec6438e38c7c86f181d3432d4d79',
            country: 'us',
            category: 'technology',
            language: 'en'
          }
        });
        setNewsArticles(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor:'#0A0A0C',
      border:' 2px #2C2E2F',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      marginBottom: '15px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor:'#2C2E2F',
      transition: 'background-color 0.3s ease',
    },
    listItemHover: {
      backgroundColor: '#ffffff00',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
      backgroundColor:'#2C2E2F',
      fontWeight: 'bold',
      display: 'block',
    },
    description: {
      color: 'white',
      backgroundColor:'#2C2E2F',
      marginTop: '5px',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 3,
      lineClamp: 3,
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.header}>Latest News</h1>
        <ul style={styles.list}>
          {newsArticles.map((article, index) => (
            <li
              key={index}
              style={styles.listItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.listItem.backgroundColor)}
            >
              <a href={article.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                {article.title}
              </a>
              <p style={styles.description}>{article.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewsComponent;
