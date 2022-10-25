import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { esES } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import Swal from "sweetalert2";
import { alert3 } from "../notifications/alerts";
import instance from "../utils/axiosconf";
import Header from "../components/header";
import Footer from "../components/footer";
import DrawerComponent from "../components/drawer";

export default function Test() {
  const onClickRegistrar = () => {
    //alert3.title="Registrado Correctamente!"
    instance
      .post("/customers", {
        nombre: nombre,
      })
      .then((res1) => {
        console.log(res1);
        var cuotaPost = {
          modalidad: modalidad,
          tipo: tipopago,
          monto: monto,
          fecha: value,
          customerId: res1.data.id,
        };
        console.log(cuotaPost);

        instance
          .post("/cuotas", cuotaPost)
          .then((res2) => {
            console.log(res2);
            Swal.fire(alert3);
          })
          .catch((error) => console.log(error));
        //Swal.fire(alert3)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [tiposPagos, settiposPagos] = React.useState([
    "Mensual",
    "Diario",
    "Semanal",
    "Quincenal",
  ]);

  const [nombre, setNombre] = React.useState("");
  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
    console.log(nombre);
  };

  const [monto, setmonto] = React.useState("50000");
  const handleChangemonto = (event) => {
    setmonto(event.target.value);
    //console.log(monto)
  };
  const [montosDisponibles, setmontosDisponibles] = React.useState([
    50000, 100000, 10000, 70000, 150000, 40000,
  ]);

  const [value, setValue] = React.useState(new Date());
  const handleChange2 = (newValue) => {
    setValue(newValue);
  };

  const [modalidad, setmodalidad] = React.useState("Musculacion");
  const handleChangeModalidad = (event) => {
    console.log(modalidad);
    setmodalidad(event.target.value);
  };

  const [tipopago, settipopago] = React.useState("Mensual");

  const handleChangetipopago = (event) => {
    settipopago(event.target.value);
    console.log(tipopago);
  };

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
              <Typography
                variant="h3"
                color="primary"
                align="center"
                margin={2}
              >
                Registrar Clientes
              </Typography>
              <TextField
                id="outlined-basic1"
                label="Nombre y Apellido"
                variant="outlined"
                value={nombre}
                onChange={handleChangeNombre}
              />

              <FormControl variant="standard">
                <InputLabel id="labelSelect1">Modalidad</InputLabel>
                <Select
                  labelId="labelSelect1"
                  id="selectModalidad"
                  value={modalidad}
                  label="Modalidad"
                  onChange={handleChangeModalidad}
                >
                  <MenuItem value="Musculacion">Musculacion</MenuItem>
                  <MenuItem value="Funcional">Funcional</MenuItem>
                  <MenuItem value="Musculacion y Funcional">
                    Musculacion y Funcional
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard">
                <InputLabel id="labelSelect2">Forma de Pago</InputLabel>
                <Select
                  labelId="labelSelect2"
                  id="selectTipoPago"
                  value={tipopago}
                  label="Forma de Pago"
                  onChange={handleChangetipopago}
                >
                  {tiposPagos.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                  {/* <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Diario">Diario</MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem> */}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel id="labelSelect3">Monto</InputLabel>
                <Select
                  labelId="labelSelect3"
                  id="selectMonto"
                  value={monto}
                  label="Forma de Pago"
                  onChange={handleChangemonto}
                >
                  {montosDisponibles.map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                  {/* <MenuItem value="Mensual">Mensual</MenuItem>
                <MenuItem value="Diario">Diario</MenuItem>
                <MenuItem value="Semanal">Semanal</MenuItem> */}
                </Select>
              </FormControl>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={esLocale}
                localeText={
                  esES.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
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
          <Footer />
        </Box>
      </Box>
    </>
  );
}
