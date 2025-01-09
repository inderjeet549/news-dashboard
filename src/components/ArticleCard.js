// src/components/ArticleCard.js
import React from "react";
import "./ArticleCard.css";

const ArticleCard = ({ title, author, date, image, url }) => {
  return (
    <div className="article-card">
      {image && <img src={image} alt={title} />}
      <h2>{title}</h2>
      <p>
        <strong>Author:</strong> {author || "Unknown"}
      </p>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
