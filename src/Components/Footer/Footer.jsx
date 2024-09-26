import React, { useContext, useState } from 'react';
import { Grid, Typography, AppBar, useTheme, useMediaQuery } from '@mui/material';
import { ThemeContext } from '../../Context/ThemeContext';
import './styles.css';
import reactLogo from '../../assets/react-icon.png';
import linkedIn from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import wp from '../../assets/whatsapp.png'
import insta from '../../assets/instagram.png'
import Myweb from '../../assets/myweb.png'
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

const Footer = () => {


  const { isDarkMode } = useContext(ThemeContext);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const theme1 = useTheme();
  const isSmall = useMediaQuery(theme1.breakpoints.up('sm'));

  return (
    <AppBar position='sticky'>
      <Grid container justifyContent='center'>
        {/* <Grid item xl={1.5} lg={1.5} md={1.5} sm={0.75} xs={1}></Grid> */}
        {/* <Grid item xl={3} lg={3} md={3} sm={3.5} xs={2}></Grid> */}

        <Grid item xl={1} lg={1.5} md={4} sm={3} xs={1.5}>
          <Link to="#">
            <img src={Myweb} alt="my website" className='myweb' />
          </Link>
        </Grid>

        {isSmall &&
          <Grid item xl={4} lg={4} md={2.45} sm={4.21} xs={5.17}>
            <ThemeProvider theme={theme}>
              <Typography variant='body2' sx={{ marginTop: 1.9, color: isDarkMode ? 'white' : 'black' }}>
                This Website was made with
              </Typography>
            </ThemeProvider>
          </Grid>
        }

        {!isSmall &&
          <Grid item xl={4} lg={4} md={2.45} sm={4.21} xs={4}>
            <ThemeProvider theme={theme}>
              <Typography variant='body2' sx={{ marginTop: 1.9, fontSize: '0.5rem', color: isDarkMode ? 'white' : 'black' }}>
                &copy;This Website was made with
              </Typography>
            </ThemeProvider>
          </Grid>}

        <Grid item xl={0.75} lg={0.75} md={0.75} sm={1} xs={1} sx={{ marginTop: 1.3 }}>
          <img src={reactLogo} className="logoreact" alt="React logo" />
        </Grid>
        <Grid item xl={1} lg={1} md={2} sm={0.5} xs={1}></Grid>
        <Grid item xl={0.36} lg={0.4} md={0.5} sm={0.6} xs={0} sx={{ marginTop: 1.3 }}>
          <Link to="http://linkedin.com/in/mohamed-aadhil-716645248" target='/blank'>
            <img src={linkedIn} className="logolinkedin" alt="LinkedIn logo" />
          </Link>
        </Grid>
        <Grid item xl={0.36} lg={0.4} md={0.5} sm={0.6} xs={0} sx={{ marginTop: 1.3 }}>
          <Link to="https://github.com/Aadhil-official" target='/blank'>
            <img src={github} className="logogithub" alt="GitHub logo" />
          </Link>
        </Grid>
        <Grid item xl={0.36} lg={0.4} md={0.5} sm={0.6} xs={0} sx={{ marginTop: 1.3 }}>
          <Link to="https://wa.me/+94750213273" target='/blank'>
            <img src={wp} className="logowp" alt="Whatsapp logo" />
          </Link>
        </Grid>
        <Grid item xl={0.36} lg={0.4} md={0.5} sm={0.6} xs={0} sx={{ marginTop: 1.3 }}>
          <Link to="https://www.instagram.com/axdhil_official/" target='/blank'>
            <img src={insta} className="logoinsta" alt="Instagram logo" />
          </Link>
        </Grid>

      </Grid>
    </AppBar >
  );
};

export default Footer;
