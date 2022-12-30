import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "antd";

import "./Coinlist.css";

const contentStyle = {
  display: "flex",
  height: "60px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CoinList = ()=>{
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setData([...response.data]);
      });
  }, []);
  return (
    <div>
      <Carousel autoplay="true" dots="false" >
        {data.map((item,idx) => {
          return (
            <div style={contentStyle} key={idx}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1%",
                }}
              >
                <img src={item.image} width={50} alt="coin-img" />
                <div className="coinList-details">
                  <p>
                    {item.name}({item.symbol})-{item.current_price} INR
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CoinList;
