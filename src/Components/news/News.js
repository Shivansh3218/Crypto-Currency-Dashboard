import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";

import "./News.css";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsdata.io/api/1/news?apikey=pub_13335842c8779f276e2b71e88dfb18e77379d&q=crypto"
      )
      .then((response) => {
        setData([...response.data.results]);
      });
  }, []);
  return (
    <Carousel autoplay="true" dotPosition="right" className="caroosel_left">
      {data.map((item, idx) => {
        return (
          <div className="contentStyle" key={idx}>
            <a href={item.link} target="blank">
              <h1 className="news_header">{item.title}</h1>
            </a>
            <img
              className="image-headline"
              src={item.image_url}
              alt="Unavailable"
              width={"360px"}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default News;
