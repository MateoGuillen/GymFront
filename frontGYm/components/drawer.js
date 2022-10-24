import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

export default function DrawerComponent() {
  const logout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
  };

  const opciones = [
    "Cuotas",
    "Registrar Clientes",
    "Reporte Diario",
    "Cerrar Sesion",
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {opciones.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component="a"
                onClick={index == 3 && logout}
                href={
                  (index == 0 && "/pagos") ||
                  (index == 1 && "/clientes") ||
                  (index == 2 && "/reportediario")
                }
              >
                <ListItemIcon>
                  {(index == 0 && <PointOfSaleIcon color="primary" />) ||
                    (index == 1 && <PersonAddAlt1Icon color="primary" />) ||
                    (index == 2 && <AssessmentIcon color="primary" />) ||
                    (index == 3 && <LogoutIcon color="primary" />)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
