"use client";

import useStyles from "@/components/Navbar/styles";
import { imageUrl, LOGOUT, personUrl } from "@/constants";
import MyContext from "@/contexts";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@/lib/mui";
import { getUserData } from "@/utils/localStorage";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const [isHydrated, setIsHydrated] = useState(true)
  const { dispatch } = useContext(MyContext);
  const classes = useStyles();
  const user = getUserData();

  useEffect(() => {
    setIsHydrated(false)
  }, [])

  if(isHydrated) return null

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Box className={classes.boxCover}>
        <Link href="/" className={classes.brandContainer}>
        <img
          className={classes.image}
          src={imageUrl}
          alt="icon"
          height="45px"
        />
        <Typography className={classes.heading} variant="h3" mx={2} fontWeight={600} mt={1}>
          Todo
        </Typography>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <Box className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.firstName ?? ""}
              src={personUrl}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6" marginRight={1}>
              {user?.firstName ?? ""} {user?.lastName ?? ""}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => dispatch({ type: LOGOUT })}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Link href="/auth" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
