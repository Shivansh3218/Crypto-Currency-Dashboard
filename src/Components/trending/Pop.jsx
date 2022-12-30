import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Modal } from "antd";

import Interval from "./Interval";

function Pop({ dataClick, dataShow, modal2Open, setModal2Open, data,setInterval }) {
    
  let objectData = dataShow?.map(function (x) {
    var a = new Date(x[0] * 1000);
    var date = a.getDate();
    return {
      day: date,
      price: x[1],
    };
  });
  objectData.sort((a, b) => {
    return a.day - b.day;
  });

  const handleCancel=()=>{
    setModal2Open(false)
  }

  

  return (
    <Modal
      centered
      open={modal2Open}
      footer={null}
      onCancel={handleCancel}
    >
        
      {data?.map((item) => {
        return (
         item.item.id === dataClick && (
            <div>
              <img src={item.item.small} alt="bit-coin-img" />{" "}
              <span>
                {item.item.name}({item.item.symbol})
              </span>
              ____
              <span>{item.item.price_btc.toFixed(15)} BTC</span>
            </div>
          )
        );
      })}

      <Interval setInterval={setInterval}/>
     
      
      <AreaChart
        width={430}
        height={350}
        data={objectData}
        margin={{ top: 100, right: 10, left: 30, bottom: 0 }}
      >
       
        <Legend />
        <XAxis dataKey="day" />
        <YAxis dataKey="price" />
        
        <Tooltip />

        <Area
          type="monotone"
          dataKey="price"
          stroke="#457B9D"
          fill="#457B9D"
          fillOpacity={0.5}
        />
      </AreaChart>
    </Modal>
  );
}

export default Pop;
