import { Theme } from "@/lib/mui";
import { makeStyles } from "@/lib/muiStyle";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme: Theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    padding: "10px 50px",
    
  },
  boxCover: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: "#222",
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 800,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
