import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { DataGrid, esES as esEsData } from "@mui/x-data-grid";
import { startOfToday, isAfter, parseISO } from "date-fns";
import instance from "../utils/axiosconf";
import Header from "../components/header";
import Footer from "../components/footer";
import DrawerComponent from "../components/drawer";
import FunctionsIcon from "@mui/icons-material/Functions";

export default function ReporteDiario() {
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
    {
      field: "nombre",
      headerName: "Nombre y Apellido",
      width: 260,
      headerAlign: "center",
    },
    /*  {
       field: 'telefono',
       headerName: 'Telefono',
       type: 'number',
       width: 180,
     },*/

    { field: "modalidad", headerName: "Modalidad", width: 200 },
    { field: "tipo", headerName: "Forma de Pago", width: 150 },
    { field: "fecha", headerName: "Fecha", width: 100, type: "date" },
    { field: "monto", headerName: "Monto", width: 120 },
    {
      field: "fechaProximoPago",
      headerName: "Fecha de Proximo Pago",
      width: 230,
      type: "date",
    },
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
              <Typography
                variant="h4"
                color="primary"
                align="center"
                margin={2}
              >
                Total Diario <FunctionsIcon /> {total}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              height: 400,
              width: "100%",
              p: 1,
            }}
          >
            <Stack spacing={5}>
              <div style={{ height: 800, width: "100%" }}>
                <DataGrid
                  localeText={
                    esEsData.components.MuiDataGrid.defaultProps.localeText
                  }
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20, 30, 40]}
                  getRowClassName={(params) =>
                    `super-app-theme--${params.row.pagado}`
                  }
                  s

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
