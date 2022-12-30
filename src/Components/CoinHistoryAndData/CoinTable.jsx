import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TablePagination,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,  
  TableRow,
} from "@mui/material";
import { Typography } from "antd";

import "../CSS/MainPage.css";

export default function CoinTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    async function getdata() {
      var response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin%2C%2bitcoin&category=cryptocurrency&order=market_cap_desc&per_page=100&page=1&sparkline=false `
      );
      setCoinData([...response.data]);
    }
    getdata();
  }, []);

  const tableCellArray = [
    "Currency Name",
    "Symbol",
    "Market Rank",
    "Current Price",
    "Price Change in last 24h",
  ];

  return (
    <>
      <Typography
        variant="h1"
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          marginTop: "1rem",
        }}
        gutterBottom
      >
        The Most Popular Crypto Currencies🔥
      </Typography>
      {!(coinData.length === 0) ? (
        <Paper sx={{ width: "100%" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              style={{ backgroundColor: "rgb(0, 21, 41)", color: "white" }}
            >
              <TableHead>
                <TableRow>
                  {tableCellArray.map((cell) => {
                    return (
                      <TableCell style={{ color: "white" }} align="center">
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {coinData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    ({
                      image,
                      current_price,
                      price_change_24h,
                      market_cap_rank,
                      name,
                    }) => (
                      <TableRow
                        style={{ color: "white" }}
                        key={name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >

                        <TableCell
                          style={{ color: "white" }}
                          component="th"
                          scope="row"
                        >
                          {name}
                        </TableCell>
                        <TableCell align="center">
                          <img
                            style={{ width: "5rem", height: "5rem" }}
                            src={image}
                            alt=""
                          />
                        </TableCell>
                        
                        <TableCell style={{ color: "white" }} align="center">
                          Rank No . {market_cap_rank}
                        </TableCell>

                        <TableCell style={{ color: "white" }} align="center">
                          {current_price}
                        </TableCell>
                        {price_change_24h < 0 ? (
                          <TableCell style={{ color: "red" }} align="center">
                            {price_change_24h.toFixed(1)} $
                          </TableCell>
                        ) : (
                          <TableCell
                            style={{ color: "chartreuse" }}
                            align="center"
                          >
                            + {price_change_24h.toFixed(1)} $
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
            }}
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={25}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : null}
    </>
  );
}
