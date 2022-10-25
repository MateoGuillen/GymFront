import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Stack from "@mui/material/Stack";
import { DataGrid, esES as esEsData } from "@mui/x-data-grid";
import { startOfToday, isAfter, parseISO } from "date-fns";
import { darken, lighten } from "@mui/material/styles";
import Swal from "sweetalert2";
import { alert3, alert5 } from "../notifications/alerts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import instance from "../utils/axiosconf";
import Header from "../components/header";
import Footer from "../components/footer";
import DrawerComponent from "../components/drawer";
import FunctionsIcon from '@mui/icons-material/Functions';

const renderDetailsButton = (params) => {
  const [modalidad, setModalidad] = React.useState("Funcional");
  const handleChangeModalidad = (event) => {
    setModalidad(event.target.value);
  };
  const [tipopago, settipopago] = React.useState("Mensual");
  const handleChangetipopago = (event) => {
    settipopago(event.target.value);
  };

  const handleChange2 = (newValue) => {
    setValue(newValue);
  };

  const [monto, setMonto] = React.useState(100000);
  const handleChangeMonto = (event) => {
    setMonto(event.target.value);
    //console.log(monto);
  };

  const [fecha, setfecha] = React.useState(new Date());
  const handleChangefecha = (event) => {
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

  const updateCuota = () => {
    var cuotaPut = {
      modalidad: params.row.modalidad,
      tipo: params.row.tipo,
      monto: params.row.monto,
      fecha: params.row.fecha,
      customerId: params.row.customerId,
    };
    console.log(cuotaPut);

    instance
      .put("/cuotas/" + params.row.id, cuotaPut)
      .then((res2) => {
        console.log(res2);
        Swal.fire(alert5).then(setOpen(false)).then(window.location.reload());
      })
      .catch((error) => console.log(error));
  };

  const guardarCuota = () => {
    var cuotaPost = {
      modalidad: params.row.modalidad,
      tipo: params.row.tipo,
      monto: params.row.monto,
      fecha: params.row.fecha,
      customerId: params.row.customerId,
    };
    //console.log(cuotaPost);

    instance
      .post("/cuotas", cuotaPost)
      .then((res2) => {
        //console.log(res2);
        Swal.fire(alert3).then(setopen2(false)).then(window.location.reload());
      })
      .catch((error) => console.log(error));
  };

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
        <EditIcon />
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
        <AttachMoneyIcon />
      </Button>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title2"
        aria-describedby="alert-dialog-description2"
      >
        <DialogTitle id="alert-dialog-title2">{"¿Desea Cobrar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description2"></DialogContentText>
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
        <DialogTitle id="alert-dialog-title">{"¿Desea Editar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={updateCuota} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.1) : lighten(color, 0.1);

const drawerWidth = 240;

export default function Test() {
  const [rows, setrows] = React.useState([]);
  const [total, settotal] = React.useState("");

  React.useEffect(() => {
    refreshRowList();
  }, []);

  function refreshRowList() {
    const cuotaAPI = instance
      .get("/cuotas/hoy")
      .then((res) => {
        //console.log(res)

        res.data.forEach((row, index) => {
          res.data[index].fecha = parseISO(res.data[index].fecha);
          res.data[index].fechaProximoPago = parseISO(
            res.data[index].fechaProximoPago
          );

          //console.log(res.data[index].fechaProximoPago)

          if (
            isAfter(res.data[index].fechaProximoPago, startOfToday()) ||
            res.data[index].tipo == "Diario"
          ) {
            res.data[index].pagado = true;
          } else {
            res.data[index].pagado = false;
          }
        });
        settotal(res.data.pop().montoTotal);
        setrows(res.data);
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
     { field: 'nombre', headerName: 'Nombre y Apellido', width: 260, headerAlign: 'center'},
   /*  {
       field: 'telefono',
       headerName: 'Telefono',
       type: 'number',
       width: 180,
     },*/
   
     { field: 'modalidad', headerName: 'Modalidad', width: 200},
     {field: 'tipo',headerName: 'Forma de Pago', width: 150},
     { field: 'fecha', headerName: 'Fecha', width: 100, type: 'date' },
     { field: 'monto', headerName: 'Monto', width: 120},
     { field: 'fechaProximoPago', headerName: 'Fecha de Proximo Pago', width: 230, type: 'date' },
     //{ field: 'pagado', headerName: 'Pagado', width: 100 ,type: 'boolean'},
     //{ field: 'opciones', headerName: 'Opciones', width: 200},
    /* {
       field: 'col6',
       headerName: 'Opciones',
       width: 150,
       renderCell: renderDetailsButton, // render a component in columns, renderDetailsButton is the component
       disableClickEventBubbling: true,
   },*/
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <DrawerComponent />

        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          <br></br>
          <br></br>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
             
              <Typography variant="h4" color="primary" align="center" margin={2}>
            Total Diario <FunctionsIcon/> {total}
        </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              height: 400,
              width: "100%",
              p: 1
            }}
          >
            <Stack spacing={5}>
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                  localeText={esEsData.components.MuiDataGrid.defaultProps.localeText}
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20,30,40]}
                  getRowClassName={(params) => `super-app-theme--${params.row.pagado}`}s

                  

                  //checkboxSelection
                />
            </div>
            </Stack>
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
