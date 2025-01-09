// src/components/ArticlesContainer.js
import React from "react";
import ArticleCard from "./ArticleCard";
import "./ArticlesContainer.css";

const ArticlesContainer = ({ articles }) => {
  return (
    <div className="articles-container">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          author={article.author}
          date={article.publishedAt}
          image={article.urlToImage}
          url={article.url}
        />
      ))}
    </div>
  );
};

export default ArticlesContainer;
