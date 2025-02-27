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
import PostgresSQL from '../../assets/postgresSQL.png'
import Docker from '../../assets/docker.png'
import Firebase from '../../assets/firebase.svg'

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
            Hi there! I'm Aadhil, a Full-Stack developer with a deep passion for creating high-performance, user-centric websites and mobile applications. I have expertise in building scalable, responsive front-end interfaces using HTML, CSS, JavaScript, and React.js, ensuring an optimized user experience across various platforms. In addition to web development, I specialize in mobile application development with React Native, ensuring seamless functionality and performance on both iOS and Android platforms.
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="body1" className="sub1">
            As a proficient backend developer, I leverage Spring Boot to build secure, maintainable, and efficient RESTful APIs that integrate seamlessly with modern web and mobile applications. My expertise extends to designing and implementing databases with MySQL, ensuring data consistency and integrity. I also focus on security best practices by incorporating JWT for authentication and authorization, enabling secure access control. For real-time data management, I utilize Firebase, and I integrate SMTP for email notifications, ensuring a fully integrated system. I’ve also developed custom CMS solutions, utilizing modern software engineering principles to deliver clean, modular, and extensible codebases for both web and mobile platforms.
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="body1" className="sub1">
              So if you're in need of a new website or mobile application or just looking to revamp your current online presence,
              I'd love to chat and see how I can help.
              Let's bring your website and mobile app dreams to reality together!
            </Typography>
          </ScrollAnimation><br />
          <ScrollAnimation animateIn="fadeInLeft" className="animate">
            <Typography variant="h5" className="sub">
              Here are my main skills:
            </Typography>
          </ScrollAnimation>


          <Grid container spacing={2} className="hability">
            {[Htmlicon, Cssicon, Springbooticon, Reacticon, CLang, Boostrapicon, AWS, Firebase, VSCode, CLion, JSicon, Linux, Postman, Blender, Bootstrap, Viteicon, PostgresSQL, Docker].map((icon, index) => (
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
