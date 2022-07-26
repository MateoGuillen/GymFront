
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function Swalert() {

    const onChange = () => {
      console.log("asd")
    }

    const [count, setCount] = useState(0);
    const [data, setData] = useState("holaASDF");

    const test = e =>{
      setData({
        ...data,
        [e.target.name] : e.target.value
      })
    }

    
    return <div>

    <p> value : {data} </p>
    <button onClick={() => setCount("cont")}>
        Click me
    </button>
    <TextField onChange={test} id="filled-basic" label="Filled" variant="filled" />
    </div>
  }
  
  export default Swalert