import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import {esES } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import Swal from 'sweetalert2'
import {alert2,alert3} from '../notifications/alerts'
import AssessmentIcon from '@mui/icons-material/Assessment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const axios = require('axios');



const drawerWidth = 240;
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  //const tiposPagos = ['Mensual', 'Diario', 'Semanal']


export default function ClippedDrawer() {

  const sw = () =>{
    alert3.title="Registrado Correctamente!"
    Swal.fire(alert3)
  }

  const onClickRegistrar = (event)=>{
    //alert3.title="Registrado Correctamente!"
    axios.post('http://localhost:8080/api/customers', 
    {
      nombre:nombre
    }
    )
    .then( (res1) =>{
      console.log(res1);
      var cuotaPost = {
        modalidad:modalidad,
        tipo:tipopago,
        monto:monto,
        fecha:value,
        customerId: res1.data.id
       }
       console.log(cuotaPost)

      axios.post('http://localhost:8080/api/cuotas', cuotaPost
      ).then(res2=>{
        console.log(res2)
        Swal.fire(alert3)
      }).catch(error => console.log(error))
      //Swal.fire(alert3)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  
  const [tiposPagos, settiposPagos] = React.useState([
    "Mensual",
    "Diario",
    "Semanal"
  ]);


  const [nombre, setNombre] = React.useState('');
  const handleChangeNombre = (event) =>{
    setNombre(event.target.value)
    console.log(nombre)
  }

  const [monto, setmonto] = React.useState('100000');
  const handleChangemonto = (event) =>{
    setmonto(event.target.value)
    console.log(monto)
  }

  const [value, setValue] = React.useState(new Date());
  const handleChange2 = (newValue) => {
    setValue(newValue);
  };

  const [modalidad, setmodalidad] = React.useState('Musculacion');
  const handleChangeModalidad = (event) => {
    console.log(modalidad);
    setmodalidad(event.target.value);
  };
  

  const [tipopago, settipopago] = React.useState('Mensual');

  const handleChangetipopago = (event) => {
    settipopago(event.target.value);
    console.log(tipopago);
    
  };

  

    const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Stack direction="row" spacing={1}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
          <img src="https://i.ibb.co/BBjBxrj/stan-Icon-1.png"
                        width="65" 
                        height="65" />
            </Box>
              
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div" align="center">
            Standford Gym
            </Typography>
          </Box>         
      </Stack>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
            {['Cuotas', 'Registrar Clientes', 'Reporte Diario'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component="a" href={index == 0 && "/pagos" || index == 1 && "/clientes" || index == 2 && "/reportediario"}>
                  <ListItemIcon>
                    {index == 0 && <PointOfSaleIcon color="primary" /> || index == 1 && <PersonAddAlt1Icon color="primary" /> || index == 2 && <AssessmentIcon color="primary"/>}
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Toolbar />

        


       <Box display="flex"
            justifyContent="center"
            alignItems="center"
            
        >
          <Stack spacing={2}>
            <Typography variant="h3" color="primary" align="center">
          Registrar Clientes
        </Typography>
          <TextField id="outlined-basic1" label="Nombre y Apellido" variant="outlined"
              value={nombre}
              onChange={handleChangeNombre} />

            <FormControl variant="standard" >
              <InputLabel id="labelSelect1">
                Modalidad
              </InputLabel>
              <Select
              labelId="labelSelect1"
                id="selectModalidad"
                value={modalidad}
                label="Modalidad"
                onChange={handleChangeModalidad}
              
              >
                
                <MenuItem value="Musculacion">Musculacion</MenuItem>
                <MenuItem value="Funcional">Funcional</MenuItem>
                <MenuItem value="Musculacion y Funcional">Musculacion y Funcional</MenuItem>
              </Select>


            </FormControl>
            <FormControl variant="standard" >
            <InputLabel id="labelSelect2">
                Forma de Pago
              </InputLabel>
              <Select
                labelId="labelSelect2"
                id="selectTipoPago"
                value={tipopago}
                label="Forma de Pago"
                onChange={handleChangetipopago}
              >
                {tiposPagos.map((value, index) => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
                {/* <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Diario">Diario</MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem> */}
              </Select>

            </FormControl>
            

              <TextField id="outlined-basic1" label="Monto" variant="outlined"
                value={monto}
                onChange={handleChangemonto} />
             

            <LocalizationProvider 
              dateAdapter={AdapterDateFns}
              adapterLocale={esLocale}
              localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DesktopDatePicker
                  label="Fecha"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange2}
                  renderInput={(params) => <TextField {...params} />}
                />
           </LocalizationProvider>

          <Button 
            variant="contained" 
            color="primary"
            onClick={onClickRegistrar}
          >
            Registrar
          </Button>
         </Stack>
       </Box>
      

       

        

      </Box>

    </Box>
  );
}


