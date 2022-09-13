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
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Stack from '@mui/material/Stack';
import { DataGrid, esES as esEsData } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {esES as esEsDate} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { startOfToday, addDays, isAfter, parseISO } from 'date-fns'
import { darken, lighten } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import {alert3, alert4, alert5} from '../notifications/alerts'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import instance from '../utils/axiosconf'


const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.1) : lighten(color, 0.1);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const renderDetailsButton = (params) => {
  const [modalidad, setModalidad] = React.useState('Funcional');
  const handleChangeModalidad = (event) => {
    setModalidad(event.target.value);
  };
  const [tipopago, settipopago] = React.useState('Mensual');
  const handleChangetipopago = (event) => {
    settipopago(event.target.value);
  };


  const handleChange2 = (newValue) => {
    setValue(newValue);
  };

  const [monto, setMonto] = React.useState(100000);
  const handleChangeMonto = event => {
    setMonto(event.target.value);
    console.log(monto)
  };

  const [fecha, setfecha] = React.useState(new Date());
  const handleChangefecha = event => {
    setfecha(event.target.value);
    //console.log(fecha)
  };

  const [open, setOpen] = React.useState(false);
  const [open2, setopen2] = React.useState(false);



  const handleClose = () => {
    //console.log(instance.defaults.headers.common)
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    //console.log(instance.defaults.headers.common)
    setopen2(false);
  };
  const handleOpen2 = () => {
    setopen2(true);
  };

  const updateCuota = ()=>{


      var cuotaPut = {
        modalidad:params.row.modalidad,
        tipo:params.row.tipo,
        monto:params.row.monto,
        fecha:params.row.fecha,
        customerId: params.row.customerId
       }
       console.log(cuotaPut)
  
      instance.put('/cuotas/'+ params.row.id, cuotaPut
      ).then(res2=>{
        console.log(res2)
        Swal.fire(alert5).then(setOpen(false)).then(window.location.reload())
      }).catch(error => console.log(error))
    
    
  }


  const guardarCuota = ()=>{
    var cuotaPost = {
        modalidad:params.row.modalidad,
        tipo:params.row.tipo,
        monto:params.row.monto,
        fecha:params.row.fecha,
        customerId: params.row.customerId
     }
     console.log(cuotaPost)

    instance.post('/cuotas', cuotaPost
    ).then(res2=>{
      console.log(res2)
      Swal.fire(alert3).then(setopen2(false)).then(window.location.reload())
    }).catch(error => console.log(error))
  }


  

  return (
      <div>
          <Button
              id={params.row.id + "button"}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={handleOpen} //open modal
          >
              
              <EditIcon/>
          </Button>

          <Button
              id={params.row.id + "button2"}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={handleOpen2} //open modal
          >
              Cobrar
              <AttachMoneyIcon/>
          </Button>

          <Dialog
            open={open2}
            onClose={handleClose2}
            aria-labelledby="alert-dialog-title2"
            aria-describedby="alert-dialog-description2"
          >
            <DialogTitle id="alert-dialog-title2">
              {"¿Desea Cobrar?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description2">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2}>Cancelar</Button>
              <Button onClick={guardarCuota} autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿Desea Editar?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={updateCuota} autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
          
          {/*
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                  Pago de Cuota
                </Typography>
                <Typography id="modal-modal-title2" variant="h8" component="h4" align='left'>
                  Nombre : {params.row.nombre}
                </Typography>
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
                    <MenuItem value={'Musculacion'}>Musculacion</MenuItem>
                    <MenuItem value={'Funcional'}>Funcional</MenuItem>
                    <MenuItem value={'Musculacion y Funcional'}>Musculacion y Funcional</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" >
                  <InputLabel id="labelSelect2">
                    Forma de Pago
                  </InputLabel>
                  <Select
                    labelId="labelSelect2"
                    id="selecttipopago"
                    value={tipopago}
                    label="Forma de Pago"
                    onChange={handleChangetipopago}
                  >
                    <MenuItem value={'Mensual'}>Mensual</MenuItem>
                    <MenuItem value={'Diario'}>Diario</MenuItem>
                    <MenuItem value={'Semanal'}>Semanal</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard">
                  <TextField 
                  id="outlined-basic3" 
                  label="Monto" 
                  variant="outlined" 
                  type="number"
                  value={monto}
                  onChange={handleChangeMonto}/>
                </FormControl>
                <LocalizationProvider 
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                  localeText={esEsDate.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                  <DesktopDatePicker
                      label="Fecha"
                      inputFormat="dd/MM/yyyy"
                      value={value}
                      onChange={handleChange2}
                      renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                

                  
                
                <Button onClick={guardarCuota} variant="contained" color="primary">
                  Guardar
                </Button>
              </Stack>
              
            </Box>
        </Modal>
          
          */}
          
      </div>
  )
}


//const rows=[];
// Make a request for a user with a given ID

/*

const rows = [
  { id: 1, lastName: 'Snow', nombre: 'Jon', telefono: 35 ,modalidad:'Musculacion', fecha: new Date(2022,5,5), tipoPago: 'Mensual'},
  { id: 2, lastName: 'Lannister', nombre: 'Cersei', telefono: 42,modalidad:'Musculacion' , fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Diario'},
  { id: 3, lastName: 'Lannister', nombre: 'Jaime', telefono: 45,modalidad:'Musculacion' , fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 4, lastName: 'Stark', nombre: 'Arya', telefono: 16,modalidad:'Musculacion' , fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 5, lastName: 'Targaryen', nombre: 'Daenerys', telefono: 544,modalidad:'Funcional' , fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 6, lastName: 'Melisandre', nombre: 'Juan', telefono: 150 ,modalidad:'Funcional', fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 7, lastName: 'Clifford', nombre: 'Ferrara', telefono: 44 ,modalidad:'Funcional', fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 8, lastName: 'Frances', nombre: 'Rossini', telefono: 36 ,modalidad:'Musculacion y Funcional', fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Mensual'},
  { id: 9, lastName: 'Roxie', nombre: 'Harvey', telefono: 65 ,modalidad:'Musculacion y Funcional', fecha:addDays(startOfToday(), Math.floor(Math.random() * 32)), tipoPago: 'Semanal'},
];

*/




//https://mui.com/x/react-data-grid/style/#styling-rows

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

export default function ClippedDrawer() {

  const [hoveredRow, setHoveredRow] = React.useState(null);

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };


  const [rows, setrows] = React.useState([])

  React.useEffect(() => {
    refreshRowList();
  }, [])

  function refreshRowList() {
    instance.get('/cuotas/test')
      .then((res) =>{
        
        res.data.forEach((row,index) => {
          //rowsDate[index].id = addDays(row.fecha, 30);
         /* if(rows[index].tipoPago == 'Mensual'){
            rows[index].fechaProximoPago = addDays(row.fecha, 30);
          }else if(rows[index].tipoPago == 'Semanal'){
            rows[index].fechaProximoPago = addDays(row.fecha, 7);
          }*/

          //convert string to Date
          res.data[index].fecha = parseISO(res.data[index].fecha)
          res.data[index].fechaProximoPago = parseISO(res.data[index].fechaProximoPago)

          console.log(res.data[index].fechaProximoPago)
          console.log(res.data[index])

          
          if( isAfter( res.data[index].fechaProximoPago ,startOfToday( ) )){
            res.data[index].pagado = true;
          }else{
            res.data[index].pagado = false;
          }
        });

        setrows(res.data)
      } )
      .catch(err => console.log(err))
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
     { field: 'nombre', headerName: 'Nombre y Apellido', width: 260, headerAlign: 'center', editable: true},
   /*  {
       field: 'telefono',
       headerName: 'Telefono',
       type: 'number',
       width: 180,
     },*/
   
     { field: 'modalidad', headerName: 'Modalidad', width: 200, editable: true,
          type: 'singleSelect',
          valueOptions: ['Musculacion', 'Funcional', 'Musculacion y Funcional']
     },
     {field: 'tipo',headerName: 'Forma de Pago', width: 150, editable: true,
        type: 'singleSelect',
        valueOptions: ['Mensual', 'Diario', 'Semanal', 'Quincenal']},
     { field: 'fecha', headerName: 'Fecha', width: 100, type: 'date' , editable: true},
     { field: 'monto', headerName: 'Monto', width: 120, editable: true,
    
       type: 'singleSelect',
        valueOptions: [50000, 10000, 100000, 150000, 40000,70000]},
     //{ field: 'fechaProximoPago', headerName: 'Fecha de Proximo Pago', width: 230, type: 'date' },
     //{ field: 'pagado', headerName: 'Pagado', width: 100 ,type: 'boolean'},
     //{ field: 'opciones', headerName: 'Opciones', width: 200},
     {
       field: 'col6',
       headerName: 'Opciones',
       width: 250,
       renderCell: renderDetailsButton, // render a component in columns, renderDetailsButton is the component
       disableClickEventBubbling: true,
   },
    /* {
       field: 'fullName',
       headerName: 'Full name',
       description: 'This column has a value getter and is not sortable.',
       sortable: false,
       width: 180,
       valueGetter: (params) =>
         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
     },
     */
   ];

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
                    {index == 0 && <PointOfSaleIcon color="primary" /> || index == 1 && <PersonAddAlt1Icon color="primary"/> || index == 2 && <AssessmentIcon color="primary"/>}
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
      <br></br><br></br>
        <Typography id="tituloPrincipal" variant="h3" color="primary" align="center">
            Cuotas
        </Typography>

        <Box
          sx={{
            height: 400,
            width: '100%',
            '& .super-app-theme--true': {
              bgcolor: (theme) =>
                //getBackgroundColor(theme.palette.success.main, theme.palette.mode),
                '#5C9166',
              '&:hover': {
                bgcolor: (theme) =>
                  getHoverBackgroundColor(
                '#ff9800',
                '#ff9800',
                  ),
              },
            },
            '& .super-app-theme--false': {
              bgcolor: (theme) =>
                '#FC6060  ',
                //getBackgroundColor(theme.palette.error.main, theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) =>
                  getHoverBackgroundColor('#ff9800', '#ff9800'),
              },
            },
          }}
        >
            <Stack spacing={5}>
              <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                  experimentalFeatures={{ newEditingApi: true }}
                  localeText={esEsData.components.MuiDataGrid.defaultProps.localeText}
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20,30,40]}
                  getRowClassName={(params) => `super-app-theme--${params.row.pagado}`}
                  //checkboxSelection
                />
            </div>
            </Stack>

        </Box>
      </Box>
      
    </Box>
  );
}
