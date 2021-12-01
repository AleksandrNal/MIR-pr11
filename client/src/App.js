import React, { useEffect, useState, useCallback } from "react";
const axios = require("axios");

function App() {
  const [news, setNews] = useState([]);

  const getNews = useCallback(async () => {
    const res = await axios.post("/api/getNews");
    setNews(res.data);
  }, []);

  useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <div className="App">
      {news.map((item) => {
        return (
          <div style={{ margin: "1rem" }}>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "1rem" }}>
                {new Date(item.pubDate).toLocaleTimeString()}
              </p>
              <h3>{item.title}</h3>
            </div>
            <div style={{ display: "flex" }}>
              <img
                style={{ maxHeight: 100, width: "auto" }}
                src={item.enclosure.url}
              />
              <p style={{ marginLeft: "1rem" }}>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
