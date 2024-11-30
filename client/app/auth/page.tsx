"use client";

import Input from "@/components/Auth/input";
import useStyles from "@/components/Auth/styles";
import useAuth from "@/components/Auth/useAuth";
import Layout from "@/components/Layout";
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
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                    type="text"
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                    type="text"
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </Grid>
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
