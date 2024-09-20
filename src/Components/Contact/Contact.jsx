import { Link } from "react-router-dom";
import "./styles.css";
import emailIcon from "../../assets/email.png";
import Phoneicon from "../../assets/phone-icon.png"
import ConForm from "../ConForm/ConForm";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";


export function Contact() {

  const theme = useTheme();
  const isMdOrLarger = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Grid container id="contact">
        <Grid item xs={12}>
          <div style={{ height: '100px' }}>&nbsp;</div>
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign='center'>
          <Typography variant="h2" sx={{ fontWeight: 'bolder' }}>
            Contact
          </Typography>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign='center'>
          <Typography variant="h5" className="subcon">
            Contact me now for any help
          </Typography><br />
        </Grid>

        {isMdOrLarger ? (
          <>
            <Grid item xl={3.6} lg={4.2} md={4.5} className="mycon">
              <Link className="contactcon" to="mailto:mohamedaadhil2446504@gmail.com?body=I%20would%20like%20to%20discuss">
                <img src={emailIcon} alt="Email" />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  mohamedaadhil2446504@gmail.com
                </Typography>
              </Link>
            </Grid>
            <Grid item xl={1} lg={1} md={0.5}></Grid>
            <Grid item xl={3.5} lg={4.2} md={4.5} className="mycon">
              <Link className="contactcon" to="tel:+94750213273">
                <img src={Phoneicon} alt="Phone no" />&nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  (+94) 750213273
                </Typography>
              </Link>
            </Grid>
          </>
        ) : (
          <>
            <Grid item sm={8} xs={9.5} className="mycon">
              <Link className="contactcon" to="mailto:mohamedaadhil2446504@gmail.com?subject=Hello%20Aadhil&body=I%20would%20like%20to%20discuss...">
                <img src={emailIcon} alt="Email" />
                <Typography variant="h6" sx={{ fontSize: '0.7rem' }} >
                  mohamedaadhil2446504@gmail.com
                </Typography>
              </Link>
            </Grid>
            <Grid item sm={12} xs={12}></Grid>
            <br />
            <Grid item sm={8} xs={9.5} className="mycon">
              <Link className="contactcon" to="tel:+94750213273">
                <img src={Phoneicon} alt="Phone no" />
                <Typography variant="body1" sx={{ fontSize: '0.7rem' }}>
                  (+94) 750213273
                </Typography>
              </Link>
            </Grid>
          </>
        )}
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}></Grid><br /><br />
        <Grid item xl={5} lg={6} md={9} sm={10} xs={11} className="box" textAlign='center'>
          <ConForm />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}></Grid><br /><br />
      </Grid>
    </>
  )
}