import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));