import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import instance from "../utils/axiosconf";
import { Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router'




export default function Header() {
  React.useEffect(() => {
    validtokenjwt();
  }, []);
  const router = useRouter()

  const validtokenjwt = () => {
    instance.get("/validtoken").then((res) => {
      console.log(res.data);
      if (res.data.login === false) {
        //window.location.href = "/login"
        router.push('/login')
      } else {
        console.log("Logueado con Exito, JWT valido");
        setusername(res.data.username);
      }
    });
  };

  const logout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
  };
  
 
  const [username, setusername] = React.useState();

  const handleChangeusername = (newusername) => {
    setusername(newusername);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/*Inside the IconButton, we 
           can render various icons*/}

        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src="https://i.ibb.co/BBjBxrj/stan-Icon-1.png"
            width="65"
            height="65"
          />
        </Box>
        {/* The Typography component applies 
           default font weights and sizes */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Standford Gym
        </Typography>
        
        <Stack>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Usuario : {username}
        </Typography>
        
        
        </Stack>
        
      </Toolbar>
    </AppBar>
  );
}
