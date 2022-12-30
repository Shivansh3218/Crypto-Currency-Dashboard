import React from "react";
import { useState, useEffect, useContext } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

import { SearchContext } from "../Contexts/searchContext";

import "../CSS/MainPage.css";

export default function CurrencyChart() {
  const [data, setdata] = useState([]);

  const { search, setSearch } = useContext(SearchContext);
  const [currency, setCurrency] = useState("usd");

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  
  };

  useEffect(() => {
    async function getdata() {
      const response = await axios.get( `https://api.coingecko.com/api/v3/coins/${search}/market_chart?vs_currency=${currency}&days=10&interval=daily`);
      setdata(response.data.prices);
    }

    getdata();
  }, [search, currency]);

  let objectData = data.map(function (x) {
    var a = new Date(x[0] * 1000);
    var date = a.getDate();
    return {
      day: date,
      value: x[1],
    };
  });

  objectData.sort((a, b) => {
    return a.day - b.day;
  });
  let currencyArray = [
    { 0: "eur", 1: "Euro" },
    { 0: "usd", 1: "Dollar" },
    { 0: "inr", 1: "Rupee" },
    { 0: "jpy", 1: "Yen" },
    { 0: "gbp", 1: "British Pound" },
  ];

  return (
    <div className="CurrencyChart">
      <h1 className="headingOfChart">
        The below chart shows currency price of past month
      </h1>
      <div className="currencyChartHeading">
        <InputLabel id="demo-simple-select-label">Select Currency </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          style={{
            height: "1.6rem",
            marginLeft: "0.5rem",
            color: "white",
            border: "1px solid green",
          }}
          onChange={handleCurrency}
        >
          {currencyArray.map((currency) => {
            return <MenuItem value={currency[0]}>{currency[1]}</MenuItem>;
          })}
        </Select>
      </div>

      <AreaChart
        width={650}
        height={350}
        data={objectData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="day" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#457B9D" fill="#A8DADC" />
      </AreaChart>
    </div>
  );
}
