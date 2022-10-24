import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import DrawerComponent from "../components/drawer";
import instance from "../utils/axiosconf";
import { startOfToday, addDays, isAfter, parseISO } from "date-fns";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

export default function Test() {
  React.useEffect(() => {
    refreshRowList();
  }, []);

  function refreshRowList() {
    instance
      .get("/cuotas/test")
      .then((res) => {
        console.log(res.data);
        if (res.request.login == false) {
          window.location.href = "/login";
        } else {
          res.data.forEach((row, index) => {
            //rowsDate[index].id = addDays(row.fecha, 30);
            /* if(rows[index].tipoPago == 'Mensual'){
              rows[index].fechaProximoPago = addDays(row.fecha, 30);
            }else if(rows[index].tipoPago == 'Semanal'){
              rows[index].fechaProximoPago = addDays(row.fecha, 7);
            }*/

            //convert string to Date
            res.data[index].fecha = parseISO(res.data[index].fecha);
            res.data[index].fechaProximoPago = parseISO(
              res.data[index].fechaProximoPago
            );

            console.log(res.data[index].fechaProximoPago);
            console.log(res.data[index]);

            if (isAfter(res.data[index].fechaProximoPago, startOfToday())) {
              res.data[index].pagado = true;
            } else {
              res.data[index].pagado = false;
            }
          });

          setrows(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <DrawerComponent />
        
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <br></br>
        <br></br>
        <Typography
          id="tituloPrincipal"
          variant="h3"
          color="primary"
          align="center"
          padding={1}
        >
          Test
        </Typography>
          <Typography 
          margin={1}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
            quibusdam, aliquam dolore excepturi quae. Distinctio enim at
            eligendi perferendis in cum quibusdam sed quae, accusantium et apeadada
          </Typography>
          <Footer />
        </Box>

        
      </Box>
      
    </>
  );
}
