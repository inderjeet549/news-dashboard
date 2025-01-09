import React, { useState, useEffect } from "react";
import { loginWithGoogle, logout } from "../services/firebase";
import { fetchArticlesFromAPI } from "../services/newsApi";
import { CSVLink } from "react-csv";
import "./Dashboard.css"; // Add relevant CSS for better styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load articles when the component mounts or search query changes
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticlesFromAPI(searchQuery);
        const filteredData = data.filter(
          (article) =>
            !article.title.includes("[Removed]") && !article.content.includes("[Removed]")
        );
        setArticles(filteredData);
      } catch (err) {
        setError("Failed to fetch articles. Please check your query or API key.");
      }
    };

    loadArticles();
  }, [searchQuery]);

  const handleLogin = async () => {
    const userData = await loginWithGoogle();
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Handle author filter change
  const handleAuthorFilterChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  // Handle date filter change
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const filteredArticles = articles.filter((article) => {
    const isAuthorMatch =
      authorFilter === "" || article.author?.toLowerCase().includes(authorFilter.toLowerCase());
    const isDateMatch =
      dateFilter === "" ||
      new Date(article.publishedAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();
    return isAuthorMatch && isDateMatch;
  });

  return (
    <div className={`dashboard ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header>
        <h1>News Dashboard</h1>
      </header>

      {/* User authentication */}
      {user ? (
        <div className="user-info">
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for articles"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Filters */}
      <div>
        <input
          type="text"
          placeholder="Filter by author"
          value={authorFilter}
          onChange={handleAuthorFilterChange}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>

      {/* Switch to Dark Mode & Export to CSV */}
      <div className="actions">
        <button onClick={toggleDarkMode}>
          Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <CSVLink data={filteredArticles} filename={"articles.csv"}>
          <button>Export to CSV</button>
        </CSVLink>
      </div>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Articles section */}
      <div className="articles">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="article-card">
              <img src={article.urlToImage} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.author || "Unknown Author"}</p>
              <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
