import * as React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from "next/link";


export default function Footer() {
  return (
    <div
    style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <footer
        style={{
          backgroundColor: "#ff9800",
          //position: "fixed",
          //bottom: 0,
          //left: 0,
          //right: 0,
          padding: "8px",
          textAlign: "center",
          marginTop: "auto",
          color: "black"
        }}
      >
        <Link href="http://www.facebook.com/profile.php?id=100073466344829" >
        <a class="facebook" target="_blank"><FacebookIcon target="_blank" fontSize="large"/></a>
        </Link>

        <Link href="http://www.instagram.com/stanfordgympy" >
        <a target="_blank"><InstagramIcon target="_blank" fontSize="large"/></a>
        </Link>

        <Link href="https://wa.me/595981375565" >
        <a class="whatsapp" target="_blank"><WhatsAppIcon target="_blank" fontSize="large"/></a>
        </Link>
        
        
      </footer>
    </div>
    
  );
}
