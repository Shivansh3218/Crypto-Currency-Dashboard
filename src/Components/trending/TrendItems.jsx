import React, { useState, useEffect } from "react";
import axios from "axios";

import Pop from "./Pop";

function TrendItems({ data }) {
  const [dataShow, setDataShow] = useState([]);
  const [dataClick, setdataClick] = useState();
  const [interval, setInterval] = useState(10);
  const [modal2Open, setModal2Open] = useState(false);

  

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${dataClick}/market_chart?vs_currency=inr&days=${interval}&interval=daily`
      )
      .then((res) => setDataShow([...res.data.prices]));
  }, [dataClick, interval]);

  const handleClick = (item) => {
    setdataClick(item);
    setModal2Open(true);
  };


  return (
    <div>
      <h2 className="recommends">coinSmartly Recommends</h2>
    <div className="trendmap_block" >
    {data.map((item, idx) => {
        return (
          <div
            className="trend_block_item"
            key={idx}
            onClick={(e) => handleClick(item.item.id)}
          >
            <img src={item.item.small} alt="bit-coin-img" />
            <div>
              <p>
                {item.item.name}({item.item.symbol})
              </p>
              <p>{item.item.price_btc.toFixed(15)} BTC</p>
            </div>
          </div>
        );
      })}
    </div>
      
      <Pop
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        dataShow={dataShow}
        dataClick={dataClick}
        data={data}
        setInterval={setInterval}
      />
    </div>
  );
}

export default TrendItems;
