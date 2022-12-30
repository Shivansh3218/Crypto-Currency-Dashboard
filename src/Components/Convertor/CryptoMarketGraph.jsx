import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

import "../CSS/CryptoConvertor.css"


export function CryptoMarketGraph() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    axios
      .get("cryptoMarketGraph.json")
      .then((response) => {
        setMyData(response.data);
      });
  }, []);

  return (
      <div className="barChart">
        <BarChart width={550} height={400} data={myData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="market_cap_rank" fill="#83c5be" />
          <Tooltip />
        </BarChart>
        <h1 style={{textAlign:"center",color:"white"}}>The Bar Chart shows the current Market Capital Rank</h1>
      </div>
  );
}
