import React from "react";

import "../CSS/ExchangeRate.css";

export function ExchangeRate({
  exchangeRate,
  primaryCurrency,
  secondarycurrency,
}) {
  return (
    <>
      <div className="exchangeRateContainer">
        <div className="result">
          <h2 className="exchangeRateText">
            {" "}
            <img
              src="https://insmac.org/uploads/posts/2017-08/1503479787_exchange-rates.png"
              alt=""
              className="exchangeRateLogo"
            />{" "}
            Exchange Rate : &nbsp;
          </h2>
          <h2 className="fromTo">
            From {primaryCurrency} to {secondarycurrency} :{" "}
          </h2>
          <h1 className="exchangeRateValue">&nbsp;{exchangeRate}</h1>
          <div className="currencyChangeRate"></div>
        </div>
      </div>
    </>
  );
}
