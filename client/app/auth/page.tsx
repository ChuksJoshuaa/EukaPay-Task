"use client";

import useStyles from "@/components/Auth/styles";
import useAuth from "@/components/Auth/useAuth";
import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";

const Auth = () => {
  const {
    switchMode,
    handleChange,
    handleSubmit,
    handleShowPassword,
    showPassword,
    isSignup,
    loading,
  } = useAuth();
  const classes = useStyles();

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={4}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <TextField
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                    type="text"
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                    type="text"
                  />
                </>
              )}
              <TextField
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <TextField
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </Grid>
            <Box mt={3} mb={2}>
              <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              loading={loading}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </LoadingButton>
            </Box>
          </form>
          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account ? Sign In"
                : "Don't have an account ? Sign Up"}
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Auth;
