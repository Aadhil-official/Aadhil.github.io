import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import ReactTypingEffect from "react-typing-effect";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import linkedIn from '../../assets/linkedin.png';
import GIT from '../../assets/github.png';
import WP from '../../assets/whatsapp.png';
import Inst from '../../assets/instagram.png';
import Hello from '../../assets/Hello.gif';
import CVimage from '../../assets/CVimage.png';
import CV from '../../assets/CV.pdf';
// import MyPic from '../../assets/MyPic.jpg'
import './styles.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context/ThemeContext';
import { motion, useMotionValue } from "framer-motion";
import jsPDF from 'jspdf';


function Hero() {


  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  const { isDarkMode } = useContext(ThemeContext);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // const avatarVariants = {
  //   hidden: { opacity: 0, scale: 0.5 },
  //   visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  // };

  const cvvarient = {
    hidden: { opacity: 0, scale: 0.5, x: -50 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 }, x: 0 },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 960);
      setIsMediumScreen(window.innerWidth <= 1327 && window.innerWidth > 960);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id === 'home') {
            setIsHomeVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    const homeElement = document.getElementById('home');
    if (homeElement) {
      observer.observe(homeElement);
    }

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (homeElement) {
        observer.unobserve(homeElement);
      }
    };
  }, []);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Curriculum Vitae.pdf';
    link.click();
  };


  return (
    <>
      <Grid container id="home">
        <Grid item xs={12}>
          <div style={{ height: '100px' }}>&nbsp;</div>
        </Grid>
      </Grid>
      <Grid container className='homeset'>
        {/* <motion.div
          variants={avatarVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          style={{ position: 'absolute' }}
          drag
          dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
          dragElastic={1}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
        >
          <Avatar
            alt="Akar AHD"
            src={cvicon}
            sx={{ width: 250, height: 250 }}
            style={{ marginBottom: "20px" }}
          />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            x: x,
            y: y,
          }}
          variants={cvvarient}
          initial="hidden"
          animate="visible"
          // whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8, borderRadius: "100%" }}
          drag
          dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
          dragElastic={1}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              color="white"
              sx={{ lineHeight: 1, fontSize: 12, mb: 0.5 }}
            >
              CV
            </Typography>
            <ArrowCircleDownIcon
              sx={{ color: "white", fontSize: 25 }}
            />
          </Box>
        </motion.div> */}

        <Grid container justifyContent='right'>
          {isHomeVisible && (
            <Grid item xs={12} sx={{ backgroundColor: isDarkMode ? 'rgba(250, 249, 246, 0.5)' : 'rgba(235, 235, 225)' }} className="sideIcon" position='fixed'>
              <Link to="http://linkedin.com/in/mohamed-aadhil-716645248" target='/blank'>
                <img src={linkedIn} alt="LinkedIn" width="40px" />
              </Link>
              <Link to="https://github.com/Aadhil-official" target='/blank'>
                <img src={GIT} alt="Git" width="40px" />
              </Link>
              <Link to="https://wa.me/+94750213273" target='/blank'>
                <img src={WP} alt="Whatsapp" width="40px" />
              </Link>
              <Link to="https://www.instagram.com/axdhil_official/" target='/blank'>
                <img src={Inst} alt="Instagram" width="40px" />
              </Link>
            </Grid>
          )}
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h5" className="toppart">
            Hello <img src={Hello} alt="Hello" width="30px" />, I'm<br />
          </Typography><br /><br />
        </Grid>

        <ThemeProvider theme={theme}>
          <Grid item xl={3} lg={4} md={5} sm={7} xs={12}>
            <Typography
              variant="h1"
              className="myname animate fadeInUp"
              style={{ animationDelay: "0.2s", fontWeight: 'bolder', marginLeft: '80px' }}
              position='absolute'
            >
              Aadhil
            </Typography>
            <ScrollAnimation animateIn="fadeInUp" className="animate" delay={0.2 * 1000}>
              <Typography variant="h1" className="myname" style={{ fontWeight: 'bolder', marginLeft: '80px' }}>
                Aadhil
              </Typography>
            </ScrollAnimation>
            <Typography
              variant="h5"
              className="sub animate1 fadeInUp1"
              position='absolute'
            >
              <ReactTypingEffect
                text="Full Stack Developer"
                speed={20}
                eraseSpeed={0}
                typingDelay={30}
              />
            </Typography>

            <Typography
              variant="h5"
              className="sub animate1 fadeInUp2"
              position='absolute'
            >
              Full Stack Developer
            </Typography>
            <ScrollAnimation animateIn="fadeInUp" className="animate" delay={0.1 * 1000}>
              <Typography variant="h5" className="sub">
                Full Stack Developer
              </Typography>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" className="animate" delay={0.1 * 1000}>
              <Typography variant="body2" className="sub1">
                Reading Information Technology and Management degree at UOM
              </Typography>
            </ScrollAnimation>
          </Grid>

          <Grid item xl={3} lg={2} md={2} sm={2} xs={12}></Grid>

          {isSmallScreen &&
            <Grid item xs={12} position='absolute' sx={{ zIndex: 1500, marginRight: '15px', top: '5%', left: '70%' }}>

              {/* <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -3, left: -3, right: 3, bottom: 3 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              > */}
              <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
                onClick={downloadCV}
              >
                {/* <Box
                  sx={{
                    position: 'relative',
                    border: '5px solid', // Border thickness
                    // borderImage: 'linear-gradient(to right,  green, blue) 1', // Gradient border
                    borderRadius: '30px',
                    padding: '5px',
                    paddingTop:'10px',
                    overflow: 'hidden',
                    width: '40%'
                  }}
                > */}
                {/* <Typography sx={{ marginTop: '5%', position: 'absolute' }} variant='h6'>CV</Typography> */}
                <img src={CVimage} alt="Resume" width="40%" />

                {/* </Box> */}
              </motion.div>
              {/* </motion.div> */}
            </Grid>
          }

          {isMediumScreen && !isSmallScreen &&
            <Grid item xs={12} position='absolute' sx={{ zIndex: 1500, top: '4.1%', left: '27%' }}>

              {/* <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -3, left: -3, right: 3, bottom: 3 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              > */}
              <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
                dragElastic={1.2}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    border: '5px solid', // Border thickness
                    // borderImage: 'linear-gradient(to right,  green, blue) 1', // Gradient border
                    borderRadius: '30px',
                    padding: '5px',
                    paddingTop: '10px',
                    overflow: 'hidden',
                    width: '15%'
                  }}
                  onClick={downloadCV}
                >
                  {/* <Typography sx={{ marginTop: '5%', position: 'absolute' }} variant='h6'>CV</Typography> */}
                  <img src={CVimage} alt="Resume" width="100%" />

                </Box>
              </motion.div>
              {/* </motion.div> */}
            </Grid>
          }


          {!isSmallScreen && !isMediumScreen &&
            <Grid item xl={12} lg={12} position='absolute' sx={{ zIndex: 1500, marginRight: '15px', top: '5%', left: '20%' }}>

              {/* <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -3, left: -3, right: 3, bottom: 3 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              > */}
              <motion.div
                style={{
                  bottom: 10,
                  right: 10,
                  x: x,
                  y: y,
                }}
                variants={cvvarient}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8, borderRadius: "100%" }}
                drag
                dragConstraints={{ top: -10, left: -10, right: 10, bottom: 10 }}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    border: '5px solid', // Border thickness
                    // borderImage: 'linear-gradient(to right,  green, blue) 1', // Gradient border
                    borderRadius: '30px',
                    padding: '5px',
                    overflow: 'hidden',
                    width: '20%',
                    height: '30%'
                  }}
                  onClick={downloadCV}
                >
                  {/* <Typography sx={{ marginTop: '5%', position: 'absolute' }} variant='h6'>CV</Typography> */}
                  <img src={CVimage} alt="Resume" width="100%" />

                </Box>
              </motion.div>
              {/* </motion.div> */}
            </Grid>
          }
          <Grid item xl={3} lg={3} md={3} sm={0} xs={0}>
            <img src="https://user-images.githubusercontent.com/74038190/229223156-0cbdaba9-3128-4d8e-8719-b6b4cf741b67.gif"
              style={{ width: "350px", position: 'absolute', animationDelay: "0.5s" }}
              className="illustration animate fadeInRight"
            />

          </Grid>
        </ThemeProvider>
      </Grid>
    </>
  );
}

export default Hero;
