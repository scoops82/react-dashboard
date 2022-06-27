import React, { useState, useEffect } from "react";

function News({ userLocation }) {
  const [newsCallStatus, setNewsCallStatus] = useState({
    loading: false,
    loaded: false,
    error: null,
  });

  const [articles, setArticles] = useState([]);

  const [articleIdx, setArticleIdx] = useState(0);

  const userCountry = userLocation.country;
  const newsApiKey = "672d23db8d8e1e3f239fbadd885571c7";

  const createApiEndpoint = () => {
    return `https://gnews.io/api/v4/top-headlines?&country=${userCountry}&lang=en&topic=world&max=10&token=${newsApiKey}`;
  };

  const apiEndpoint = createApiEndpoint();

  useEffect(() => {
    const fetchData = async () => {
      setNewsCallStatus({ ...newsCallStatus, loading: true });

      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        formatNews(data);
      } catch (err) {
        setNewsCallStatus({ ...newsCallStatus, error: err });
        console.log("Error in News.jsx fetchData(): ", err);
      }
    };
    fetchData();
  }, [apiEndpoint]);

  const formatNews = (dataObj) => {
    const newsArr = dataObj.articles;
    setArticles(newsArr);
  };

  const limitArticleDisplay = (howManyArticles) => {
    const articlesToDisplay = articles.slice(
      articleIdx,
      articleIdx + howManyArticles
    );
    return articlesToDisplay;
  };

  if (articles.length === 0) {
    return (
      <div id="news-area">
        <h2>World News</h2>
        <p>Loading News...</p>
      </div>
    );
  }
  return (
    <div id="news-area">
      <h2>World News</h2>
      <div class="button-row">
        <button
          className="news-button "
          onClick={() =>
            setArticleIdx(
              articleIdx === 0 ? articles.length - 1 : articleIdx - 1
            )
          }
        >
          &#10094;
        </button>
        <p>
          {articleIdx + 1} of {articles.length}
        </p>
        <button
          className="news-button"
          onClick={() =>
            setArticleIdx(
              articleIdx === articles.length - 1 ? 0 : articleIdx + 1
            )
          }
        >
          &#10095;
        </button>
      </div>
      <ul>
        {limitArticleDisplay(1).map((article, i) => (
          <li key={i}>
            <h3>{article.title}</h3>
            <img src={article.image} />
            <p>{article.description}</p>

            <p>
              <a href={article.url}>Read more</a>
            </p>
            <p>
              from <a href={article.source.url}>{article.source.name}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
