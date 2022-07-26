import React, {useState} from 'react'
import Swal from 'sweetalert2'
import {alert2,alert3} from '../notifications/alerts'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default () => {
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

const submitValue = () => {
    const frmdetails = {
        'First Name' : fName,
        'Last Name' : lName,
    }
    //title of alert
    alert3.title=`${fName} ${lName} Logueado con Exito!` 

    Swal.fire(alert3)

    console.log(frmdetails)
}

const sw = () =>{
    Swal.fire(alert3)
}

const onChange = e =>{
    setlName(e.target.value)
}
const onChange2 = e =>{
    setfName(e.target.value)
}

const handleChange3 = (event) => {
    setAge(event.target.value);
  };

const numbers = ["hola",1,2,"asdad","Adada"]
const list = numbers.map( (number) =>
    <li key={number.toString()}>  {number} </li>
)

const items= [10,20,30,40,50]
const menuItem = items.map((item)=>
    <MenuItem key={item.toString()} value={item}>Age:{item}</MenuItem>
)


return(
    <>

    <hr/>
    

    {/* <input type="text" placeholder="First Name" onChange={e => setfName(e.target.value)} />
    <input type="text" placeholder="Last Name" onChange={e => setlName(e.target.value)} /> */}
    <TextField onChange={onChange2} id="fname" label="Fname" variant="filled" />
    <TextField onChange={onChange} id="lname" label="Lname" variant="filled" color='success'/>
    <Button onClick={submitValue} variant="contained" endIcon={<SendIcon />} color="success">
        Send
    </Button>
    <p> Fname : {fName} </p>
    <p> Lname : {lName} </p>

    <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Age *"
          onChange={handleChange3}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItem}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      <p> Selected(Value): {age} </p>
      <ul>{list}</ul>

    </>
    )
}
