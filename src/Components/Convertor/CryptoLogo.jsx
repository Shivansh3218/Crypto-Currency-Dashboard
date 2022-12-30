import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { searchContext } from "./ContextPrimary";

export function CryptoLogo() {
  const { search, setSearch } = useContext(searchContext);

  const [cryptoLogo, setCryptoLogo] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCryptoLogo(response.data);
    }
    getData();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}
