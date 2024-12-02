"use client";

import HomeView from "@/components/Home";
import InputView from "@/components/Home/InputView";
import useStyles from "@/components/Home/styles";
import Layout from "@/components/Layout";
import { Grid } from "@material-ui/core";
import { AppBar, Container } from "@mui/material";
import { useEffect, useState } from "react";
const Home = () => {
  const classes = useStyles();
  const [isHydrated, setIsHydrated] = useState(true)

  useEffect(() => {
    setIsHydrated(false)
  }, [])

  if (isHydrated) return null
  
  return (
    <Layout>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <InputView />
            </AppBar>
          </Grid>
          <Grid item xs={12} md={9}>
            <HomeView />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
