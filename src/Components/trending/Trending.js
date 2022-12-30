import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

import TrendItems from "./TrendItems";

import "./Trending.css";

const Trending = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => {
        setData([...response.data.coins]);
       
       
      });
  }, []);

  return (
    <div className="trending">
      <div className="trend_chart">
        <h2>Market Rank Vs Coins</h2>
        <div className="area_chart">
          <AreaChart
            width={650}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item.name" />
            <YAxis dataKey="item.market_cap_rank" reversed="true" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="item.market_cap_rank"
              stroke="#457B9D"
              fill="#A8DADC"
            />
          </AreaChart>
        </div>

        <h2>Coins Actively Trading</h2>
        <div className="radar_Chart">
          <RadarChart
            cx={300}
            cy={250}
            outerRadius={150}
            width={500}
            height={500}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="item.name"
              style={{ fill: "#A8DADC", fillOpacity: "0.5" }}
            />
            <PolarRadiusAxis />
            <Radar
              dataKey="item.price_btc"
              stroke="black"
              fill="black"
              fillOpacity={0.6}
            />
          </RadarChart>
        </div>
      </div>
      <div className="trend_block">
        <TrendItems data={data} />
      </div>
    </div>
  );
};

export default Trending;
