import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react"
import githubIcon from '../../assets/github.png'
import './styles.css'
import ScrollAnimation from "react-animate-on-scroll";
import { ThemeContext } from '../../Context/ThemeContext';

function Project() {

  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <br /><br />
      <Grid container id='projects'>
        <Grid item xs={12}>
          <div style={{ height: '100px' }}>&nbsp;</div>
        </Grid>
      </Grid>
      <Grid container>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign='center' >
          <Typography variant="h2" sx={{ fontWeight: 'bolder' }}>
            My Projects
          </Typography><br /><br />
        </Grid>

        {/* <div className="projects"> */}

        <Grid container justifyContent='center' spacing={4}>
          <Grid item xl={3} lg={4} md={4}>
            <ScrollAnimation className="animate" animateIn="flipInX">
              <div className="project">
                {/* <header> */}
                {/* <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b " stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> */}
                {/* <div className="project-links"> */}
                <Grid item textAlign='center'>
                  <Typography variant="h6">
                    <img src={githubIcon} className="linklogo" alt="Visit site" />
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Team-MoraTech/Us.git" target="_blank" rel="noreferrer">
                      <span>Back </span>
                    </a>
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Aadhil-official/L2S4-Sofware-Project-Back-end.git" target="_blank" rel="noreferrer">
                      <span> Front </span>
                    </a>
                  </Typography>
                </Grid>
                {/* <a href="https://medibook.vinayaksingh.com" target="_blank" rel="noreferrer">
                      <img src={externalLink} className="linklogo" alt="Visit site" />
                    </a> */}
                {/* </div> */}
                {/* </header> */}
                {/* <div className="body"> */}
                <h3>SOFTWARE PROJECT (ARCTIC MANAGEMENT SYSTEM)</h3>
                <p>Developing a CMS as internal web application for control all the raw data about the company .Through web application, this system manage the job activities that helps to resolve the customer problems in using the company’s products by this company’s services reach those in need .It play a vital role in providing support employees stay up-to-date with their company.</p>
                {/* </div> */}
                {/* <footer> */}
                <ul className="tech-list">
                  <li>Spring Boot</li>
                  <li>React JS</li>
                  <li>MongoDB</li>
                </ul>
                {/* </footer> */}
              </div>
            </ScrollAnimation>
          </Grid>


          {/* <Grid item xl={3} lg={4} md={4}>
            <ScrollAnimation className="animate" animateIn="flipInX">
              <div className="project"> */}
          {/* <header> */}
          {/* <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b " stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> */}
          {/* <div className="project-links"> */}
          {/* <Grid item textAlign='center'>
                  <Typography variant="h6">
                    <img src={githubIcon} className="linklogo" alt="Visit site" />
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Team-MoraTech/Us.git" target="_blank" rel="noreferrer">
                      <span>Back </span>
                    </a>
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Aadhil-official/L2S4-Sofware-Project-Back-end.git" target="_blank" rel="noreferrer">
                      <span> Front </span>
                    </a>
                  </Typography>
                </Grid> */}
          {/* <a href="https://medibook.vinayaksingh.com" target="_blank" rel="noreferrer">
                      <img src={externalLink} className="linklogo" alt="Visit site" />
                    </a> */}
          {/* </div> */}
          {/* </header> */}
          {/* <div className="body"> */}
          {/* <h3>SOFTWARE PROJECT (ARCTIC MANAGEMENT SYSTEM)</h3>
                <p>Developing a CMS as internal web application for control all the raw data about the company .Through web application, this system manage the job activities that helps to resolve the customer problems in using the company’s products by this company’s services reach those in need .It play a vital role in providing support employees stay up-to-date with their company.</p> */}
          {/* </div> */}
          {/* <footer> */}
          {/* <ul className="tech-list">
                  <li>Spring Boot</li>
                  <li>React JS</li>
                  <li>MongoDB</li>
                </ul> */}
          {/* </footer> */}
          {/* </div>
            </ScrollAnimation>
          </Grid> */}

          <Grid item xl={3} lg={4} md={4}>
            <ScrollAnimation className="animate" animateIn="flipInX">
              <div className="project">
                {/* <header> */}
                {/* <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b " stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> */}
                {/* <div className="project-links"> */}
                <Grid item textAlign='center'>
                  <Typography variant="h6">
                    <img src={githubIcon} className="linklogo" alt="Visit site" />
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Aadhil-official/Hotel-Booking-Backend.git" target="_blank" rel="noreferrer">
                      <span>Back </span>
                    </a>
                    <a className={isDarkMode ? "githublinkl" : "githublinkd"} href="https://github.com/Aadhil-official/Hotel-Booking-PRJCT.git" target="_blank" rel="noreferrer">
                      <span> Front </span>
                    </a>
                  </Typography>
                </Grid>
                {/* <a href="https://medibook.vinayaksingh.com" target="_blank" rel="noreferrer">
                      <img src={externalLink} className="linklogo" alt="Visit site" />
                    </a> */}
                {/* </div> */}
                {/* </header> */}
                {/* <div className="body"> */}
                <h3>HOTEL ROOM BOOKING (ON GOING)</h3>
                <p>Developing a user friendly public web application for control all the raw data about the hotels using REST API. Through web application, this system manage the room booking that helps to book the room via online by this hotel services reach those in need with many advanced features. It play a vital role in providing support customers stay up-to-date.</p>
                {/* </div> */}
                {/* <footer> */}
                <ul className="tech-list">
                  <li>Spring Boot</li>
                  <li>React JS</li>
                  <li>MySQL</li>
                </ul>
                {/* </footer> */}
              </div>
            </ScrollAnimation>
          </Grid>
          {/* </Grid>

          <Grid container justifyContent='center' spacing={3}> */}
          <Grid item xl={3} lg={4} md={4}>
            <ScrollAnimation className="animate" animateIn="flipInX">
              <div className="project">
                {/* <header> */}
                {/* <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b " stroke-width="1" stroke-linecap="round" stroke-linejoin="round" ><title>Folder</title><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> */}
                {/* <div className="project-links"> */}
                {/* <Grid item textAlign='center'>
                  <Typography variant="h6">
                    <img src={githubIcon} className="linklogo" alt="Visit site" />
                    <a className={isDarkMode?"githublinkl":"githublinkd"} href="https://github.com/Team-MoraTech/Us.git" target="_blank" rel="noreferrer">
                      <span>Back </span>
                    </a>
                    <a className={isDarkMode?"githublinkl":"githublinkd"} href="https://github.com/Aadhil-official/L2S4-Sofware-Project-Back-end.git" target="_blank" rel="noreferrer">
                      <span> Front </span>
                    </a>
                  </Typography>
                </Grid> */}
                {/* <a href="https://medibook.vinayaksingh.com" target="_blank" rel="noreferrer">
                      <img src={externalLink} className="linklogo" alt="Visit site" />
                    </a> */}
                {/* </div> */}
                {/* </header> */}
                {/* <div className="body"> */}
                <br /><div style={{ height: "10px" }}></div>
                <h3>HARDWARE PROJECT(ADJUSTABLE P10 LED DISPLAY CONTROLLER)</h3>
                <p>Built a controller that has the feature to display text on a P10 LED display via WIFI, Ethernet, and SD card using ESP32 Microcontroller. The user can adjust the number of LED displays and the correctors what ever they want .Through the controller, can change the font family and the speed of the text using the keypad. This helps customers to make display text in P10 LED Display according to customer choice by them self.</p>
                {/* </div> */}
                {/* <footer> */}
                <ul className="tech-list">
                  <li>EasyEDA</li>
                  <li>C language</li>
                  <li>Atmel Studio</li>
                  <li>Proteus Simulation</li>
                  <li>Blender</li>
                </ul>
                {/* </footer> */}
              </div>
            </ScrollAnimation>
          </Grid>

          {/* </div> */}
        </Grid>
      </Grid>
    </>
  );
}

export default Project;