import React from "react";
import { Card, Col, Row } from "antd";
import { Typography } from "@mui/material";
import {} from "antd";

import "../CSS/MainPage.css";

const { Meta } = Card;

const About = () => (
  <div className="about_main">
    <Typography
      variant="h3"
      color="white"
      textAlign="center"
      paddingTop="2rem"
      gutterBottom
    >
      About Project
    </Typography>
    <Typography
      variant="p"
      color="white"
      fontSize="1.5rem"
      textAlign="center"
      paddingTop="2rem"
      gutterBottom
    >
      <p>
        {" "}
        The primary function of dashboard is to track cryptocurrencies and coins
        and monitor their historical prices and current values so that you can
        manage crypto related financial plans accordingly.
      </p>

      <p>
        This Project effectively uses the core concepts of react including
        hooks, routes , axios and react libraries - Material UI , React- Charts
        and Ant Design .Which collectively enables us to view the currencies
        history data , exchange rates, Trending etc.{" "}
      </p>
    </Typography>

    </div>
    
);

export default About;
