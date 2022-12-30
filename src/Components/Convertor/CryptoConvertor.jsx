import React, { useState, useEffect, useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card } from "antd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { ExchangeRate } from "./ExchangeRate";
import { searchContext } from "./ContextPrimary";
import { searchContextOne } from "./ContextSecondary";

import "../CSS/CryptoConvertor.css";

export function CryptoConvertor() {
  const { search, setSearch } = useContext(searchContext);
  const { searchOne, setSearchOne } = useContext(searchContextOne);

  const currencies = ["BTC", "ETH", "USDC", "INR", "XRP", "LTC", "ADA"];
  const [primaryCurrency, setPrimaryCurrency] = useState("BTC");
  const [secondaryCurrency, setSecondaryCurrency] = useState("USDC");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [url, setUrl] = useState("https://alpha-vantage.p.rapidapi.com/query");
  const [cryptoLogoPrimary, setCryptoLogoPrimary] = useState([]);
  const [cryptoLogoSecondary, setCryptoLogoSecondary] = useState([]);


  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${primaryCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCryptoLogoPrimary(response.data);
      });
  }, [primaryCurrency]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${secondaryCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCryptoLogoSecondary(response.data);
      });
  }, [secondaryCurrency]);

  const handleConvert = () => {
    console.log("convert")
    const options = {
      method: "GET",
      url: url,
      params: {
        from_currency: "BTC",
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: "USD",
      },
      headers: {
        "X-RapidAPI-Key": "5880e8a812msh9940b0966e5ae28p1931d5jsn669cb51ffb1c",
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        );
      })
      .catch(function (error) {});
  };

  const handleSelectPrimary = (e) => {
    setPrimaryCurrency(e.target.value);
    setSearch(e.target.value);
  };

  const handleSelectSecondary = (e) => {
    setSecondaryCurrency(e.target.value);
    setSearchOne(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  return (

   
    <div className="mainContainer">
      <div className="convertorConatainer">
        <div className="site-card-border-less-wrapper convertorBG">
          <Card
            title="Primary Currency"
            className="primaryCard"
            bordered={true}
            style={{ width: 370, height: 180, backgroundColor: "#00152900",color:"white", border:"1px solid white"}}
          >
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={amount}
              onChange={handleAmount}
              style={{color:"white",border:"1px solid gray",borderRadius:"5px"}}
            />

            <FormControl sx={{ minWidth: 80 ,color:"white" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={primaryCurrency}
                onChange={handleSelectPrimary}
                style={{color:"white",border:"1px solid gray",borderRadius:"5px"}}
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>

          <Card
            title="Secondary Currency"
            bordered={true}
            style={{ width: 370, height: 180, backgroundColor: "#00152900" ,color:"white",border:"1px solid white"}}
          >
            <TextField
              id="outlined-number"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={result}
              disabled={true}
              style={{border:"1px solid gray",borderRadius:"5px"}}
            />

            <FormControl sx={{ minWidth: 80 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={secondaryCurrency}
                onChange={handleSelectSecondary}
                style={{color:"white",border:"1px solid gray",borderRadius:"5px"}}
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>

          <div className="btn-exchange-rate-container">
            <Button
              className="convertBtn"
              variant="contained"
              sx={{width:370, backgroundColor: "#1d3557", color: "#f1faee" }}
              onClick={handleConvert}
              
            >
              Convert
            </Button>
          </div>
        </div>

        <div className="cardConatiner">
          <div>
            {cryptoLogoPrimary.map(
              ({
                symbol,
                image,
                name,
                price_change_24h,
                market_cap_rank,
                last_updated,
              }) => {
                {
                  if (symbol === search.toLowerCase()) {
                    return (
                      <>
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                              m: 3,
                              width: 128,
                              height: 128,
                            },
                          }}
                        >
                          <Paper
                            elevation={5}
                            sx={{
                              minWidth: 400,
                              minHeight: 180,
                              padding: 2,
                              backgroundColor: "#00152900",
                              border:"1px solid white",
                            }}
                          >
                            <div className="cryptoDetails">
                              <div>
                                <img
                                  src={image}
                                  className="cryptoIcon"
                                  alt=""
                                />
                              </div>
                              <div>
                                <p className="keyText">
                                  Name :{" "}
                                  <span className="ValueText">{name}</span>
                                </p>
                                <p className="keyText">
                                  {" "}
                                  Price Change(24h):{" "}
                                  <span className="ValueText">
                                    ${price_change_24h}
                                  </span>
                                </p>
                                <p className="keyText">
                                  Market cap rank :{" "}
                                  <span className="ValueText">
                                    {market_cap_rank}
                                  </span>
                                </p>
                                <p className="keyText">
                                  Last Updated :{" "}
                                  <span className="ValueText">
                                    {last_updated}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Paper>
                        </Box>
                        </div>
                      </>
                    );
                  }
                }
              }
            )}
          </div>
          <div>
            {cryptoLogoSecondary.map(
              ({
                symbol,
                image,
                name,
                price_change_24h,
                market_cap_rank,
                last_updated,
              }) => {
                {
                  if (symbol === searchOne.toLowerCase()) {
                    return (
                      <>
                      <div>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            "& > :not(style)": {
                              m: 3,
                              width: 128,
                              height: 128,
                            },
                          }}
                        >
                          <Paper
                            elevation={5}
                            sx={{
                              minWidth: 400,
                              minHeight: 180,
                              padding: 2,
                              backgroundColor: "#00152900",
                              border:"1px solid white",
                            }}
                          >
                            <div className="cryptoDetails">
                              <div>
                                <img
                                  src={image}
                                  className="cryptoIcon"
                                  alt=""
                                />
                              </div>
                              <div>
                                <p className="keyText">
                                  Name :{" "}
                                  <span className="ValueText">{name}</span>
                                </p>
                                <p className="keyText">
                                  {" "}
                                  Price Change(24h):{" "}
                                  <span className="ValueText">
                                    ${price_change_24h}
                                  </span>
                                </p>
                                <p className="keyText">
                                  Market cap rank :{" "}
                                  <span className="ValueText">
                                    {market_cap_rank}
                                  </span>
                                </p>
                                <p className="keyText">
                                  Last Updated :{" "}
                                  <span className="ValueText">
                                    {last_updated}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Paper>
                        </Box>
                        </div>
                      </>
                    );
                  }
                }
              }
            )}
          </div>
        </div>
        <div>
        </div>
      </div>
      <ExchangeRate
      exchangeRate={exchangeRate}
      primaryCurrency={primaryCurrency}
      secondarycurrency={secondaryCurrency}/>
    </div>
  );
}
