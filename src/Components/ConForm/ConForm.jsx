import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import { z } from 'zod';
import { dismiss, error, loading as showLoading, success } from '../../utils/Toastify';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { ThemeContext } from '../../Context/ThemeContext';

function ConForm() {
    const form = useRef();
    const { isDarkMode } = useContext(ThemeContext);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isRobot, setIsRobot] = useState(false);

    const validateForm = z.object({
        userName: z.string().min(1, { message: "Enter your name" }),
        userEmail: z.string().email({ message: "Enter your valid email address" }),
        message: z.string().min(1, { message: "Enter the object" })
    });

    const resetAll = () => {
        setUserName("");
        setUserEmail("");
        setMessage("");
    }

    const onChange = (token) => {
        setIsRobot(!!token);
    };

    const sendEmail = (e) => {
        const loadingToast = showLoading("Sending email...");

        const data = {
            userName: userName,
            userEmail: userEmail,
            message: message
        };

        const result = validateForm.safeParse(data);
        if (result.success && isRobot) {
            
            if (!isRobot) {
                dismiss(loadingToast);
                error("Make sure to complete the ReCAPTCHA verification...!");
                return;
            }

            e.preventDefault();

            emailjs
                .sendForm('service_ddrrakr', 'template_who3p09', form.current, {
                    publicKey: 'QDLQ7f9CtTAS1Jhz1',
                })
                .then(
                    () => {
                        dismiss(loadingToast);
                        // console.log('SEND SUCCESSFULLY..!');
                        success("Send message successful!");
                        resetAll();
                    },
                    (error) => {
                        dismiss(loadingToast);
                        error("Server error");
                        // console.log('FAILED...', error.text);
                    },
                );
        } else {
            dismiss(loadingToast);
            const formattedError = result.error.format();
            if (formattedError.userName?._errors) {
                error(String(formattedError.userName?._errors));
            } else if (formattedError.userEmail?._errors) {
                error(String(formattedError.userEmail?._errors));
            } else if (formattedError.message?._errors) {
                error(String(formattedError.message?._errors));
            } else {
                error("Make sure click on I'm not robot...");
            }
        }
    };

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <Box
            component='form'
            ref={form}
            onSubmit={sendEmail}
            sx={{
                '& .MuiInputBase-root': { borderRadius: '30px' }
            }}
            noValidate
            autoComplete='off'
        >

            <br /><br />
            <TextField
                label="Your name"
                name="user_name"
                type='text'
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <br /><br /><br />
            <TextField
                label="Your email"
                name="user_email"
                type='email'
                fullWidth
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />

            <br /><br /><br />
            <TextField
                label="Message"
                name="message"
                fullWidth
                multiline
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <br /><br /><br />
            {/* <FormControlLabel
                control={
                    <Checkbox
                        checked={isRobot}
                        onChange={(e) => setIsRobot(e.target.checked)}
                        color="primary"
                        size='large'
                    />
                }
                label={<Typography variant='h6'>I'm not a robot</Typography>}
            /> */}
            {/* <center> */}
            {/* <center> */}
            <ThemeProvider theme={theme}>
                <Grid container justifyContent='center'>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} textAlign='left'>
                        <Box sx={{
                            marginBottom: '20px'
                            // width: '10%'
                            // border:'1px solid rgb(71, 136, 158)'
                            // backgroundColor: 'rgb(71, 136, 158)',
                            // '&:hover': {
                            //     backgroundColor: 'rgba(71, 136, 158, 0.8)',
                            // }
                        }}>
                            <center>
                                <ReCAPTCHA
                                    key={isDarkMode ? "dark" : "light"}
                                    sitekey="6Le90k8qAAAAAHub5Gf0Y4lJpkEV0zNWKrEAareG"
                                    onChange={onChange}
                                    size="normal"
                                    theme={isDarkMode ? "dark" : "light"}
                                    aria-label="Verify before sending the message"
                                />
                            </center>
                        </Box>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={12} xs={12}></Grid>
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} textAlign='right'>
                        <Button
                            variant='contained'
                            type='submit'
                            size='large'
                            sx={{
                                width: '100%',
                                height: '75%',
                                backgroundColor: 'rgb(71, 136, 158)',
                                '&:hover': {
                                    backgroundColor: 'rgba(71, 136, 158, 0.8)',
                                }
                            }}
                        >
                            <Typography variant='h6'>Send</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </ThemeProvider>
            {/* </center> */}
            <br /><br />
        </Box>
    );
}

export default ConForm;
