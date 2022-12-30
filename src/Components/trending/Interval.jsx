import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Interval({ setInterval }) {

  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
    setInterval(event.target.value);
  };
  
  return (
    <div className="average_interval">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Average Interval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Average Interval"
          onChange={handleChange}
        >
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Interval;
