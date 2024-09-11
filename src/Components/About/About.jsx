import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./styles.css";
import Reacticon from '../../assets/react-icon.png';
import Boostrapicon from '../../assets/Git.svg';
import Viteicon from '../../assets/Figma-Dark.svg';
import Springbooticon from '../../assets/Spring-Dark.svg';
import JSicon from '../../assets/Idea-Dark.svg';
import Htmlicon from '../../assets/html-icon.png';
import Cssicon from '../../assets/css.png';
import MyPic from '../../assets/MyPic.jpg'
import AWS from '../../assets/aws.svg';
import Blender from '../../assets/blender.svg';
import Bootstrap from '../../assets/Bootstrap.svg';
import CLang from '../../assets/C.svg';
import CLion from '../../assets/CLion-Dark.svg';
import Postman from '../../assets/Postman.svg';
import Linux from '../../assets/Linux-Dark.svg';
import VSCode from '../../assets/VSCode-Dark.svg';

function About() {
  return (
    <>
    <br/><br/><br/><br/>
      <Grid container id="about">
        <Grid item xs={12}>
          <div style={{height:'100px'}}>&nbsp;</div>
        </Grid>
      </Grid>
      <Grid container >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="h2" sx={{ fontWeight: 'bold' }} className="sub1">
              About me
            </Typography>
          </ScrollAnimation><br />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className="contentxs">
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="body1" className="sub1">
              Hi there! I'm Aadhil, a website developer with a passion for creating custom websites.
              With a skill set including HTML, CSS, JavaScript, and React,
              I have the tools to bring any website vision to life.
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="body1" className="sub1">
              Whenever possible, I also apply my passion for developing products with Sringboot and Modern
              Javascript Library and Framework React.js
              .Also I have done CMS systems with React.js and spring boot.
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="body1" className="sub1">
              So if you're in need of a new website or just looking to revamp your current online presence,
              I'd love to chat and see how I can help.
              Let's bring your website dreams to reality together!
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="h5" className="sub">
              Here are my main skills:
            </Typography>
          </ScrollAnimation>


          <Grid container spacing={2} className="hability">
            {[Htmlicon, Cssicon, Springbooticon, Reacticon, CLang, Boostrapicon, AWS, VSCode, CLion, JSicon, Linux, Postman, Blender, Bootstrap, Viteicon].map((icon, index) => (
              <><Grid></Grid>
                <Grid item xs={3.6} sm={2.7} md={1.8} key={index} className="hability">
                  <ScrollAnimation animateIn="fadeInUp" delay={(0.10 + index * 0.02) * 1000}>
                    <img src={icon} alt="icon" />
                  </ScrollAnimation>
                </Grid></>
            ))}
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <ScrollAnimation animateIn="fadeInRight" className="animate">
            <Avatar src={MyPic} sx={{ width: 300, height: 320, marginRight: 'auto', marginLeft: 'auto' }} />
          </ScrollAnimation>
        </Grid>
      </Grid>
    </>
  )
}

export default About;
