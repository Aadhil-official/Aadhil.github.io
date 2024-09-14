import React, { useContext, useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Grid, Typography, AppBar, Toolbar, FormControlLabel, Switch } from '@mui/material';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { ThemeContext } from '../../Context/ThemeContext';
import './styles.css';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 30,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 28.5,
    height: 28.5,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);


  const theme1 = createTheme();

  theme1.typography.h6 = {
    fontSize: '0.49rem',
    [theme1.breakpoints.up('sm')]: {
      fontSize: '0.8rem',
      margin: '18px'
    },
    [theme1.breakpoints.up('md')]: {
      fontSize: '1.3rem',
      margin: '13px'
    }
  };


  return (
    <>
      <AppBar position="sticky" sx={{ padding: '10px' }}>
        {/* <Toolbar sx={{width:'97%'}}> */}
        <Grid container position='absolute'>
          <Grid item xl={3} lg={3.7} md={3.4} sm={3} xs={3} textAlign='center'>
            <HashLink smooth to="#home" className='navlogo'>
              <Typography sx={{ m: 1, color: isDarkMode ? 'white' : 'black' }} variant="h4">{"<#Axd"}
                {"hil>"}</Typography>
            </HashLink>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' position='absolute'>
          {/* <ThemeProvider theme={theme1}> */}

          {/* </ThemeProvider> */}
          <ThemeProvider theme={theme1}>
            <Grid item xl={1} lg={1.2} md={1.1} sm={1.2} xs={1.2} className='navcontent1'>
              <NavHashLink className='navcontent' smooth to="#home">
                <Typography variant="h6" sx={{ m: 2.3, color: isDarkMode ? 'white' : 'black' }}>HOME</Typography>
              </NavHashLink>
            </Grid>

            <Grid item xl={1.5} lg={1.8} md={2} sm={2.25} xs={1.8} className='navcontent2'>
              <NavHashLink className='navcontent' smooth to="#about">
                <Typography variant="h6" sx={{ m: 2.3, color: isDarkMode ? 'white' : 'black' }}>ABOUT&nbsp;&nbsp;ME</Typography>
              </NavHashLink>
            </Grid>
            <Grid item xl={1.2} lg={1.5} md={1.65} sm={1.7} xs={1.5} className='navcontent3'>
              <NavHashLink className='navcontent' smooth to="#projects">
                <Typography variant="h6" sx={{ m: 2.3, color: isDarkMode ? 'white' : 'black' }}>PROJECT</Typography>
              </NavHashLink>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1.6} xs={1} className='navcontent4'>
              <NavHashLink className='navcontent' smooth to="#contact">
                <Typography variant="h6" sx={{ m: 2.3, color: isDarkMode ? 'white' : 'black' }}>CONTACT</Typography>
              </NavHashLink>
            </Grid>
            {/* <Grid item xl={4.5} lg={3.8} md={3.3} sm={3.1} xs={1.5}></Grid> */}
          </ThemeProvider>
        </Grid>
        <Grid container textAlign='right'>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1.3, mr: -2 }}
                  checked={isDarkMode}
                  onChange={toggleTheme}
                // inputProps={{ 'aria-label': 'controlled' }}
                />
              }
            />
          </Grid>
        </Grid>
        {/* </Toolbar> */}
      </AppBar>
    </>
  );
}

export default Header;