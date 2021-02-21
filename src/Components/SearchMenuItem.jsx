import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
});

const SearchMenuItem = ({ children, classes, onClick }) => (
  <div className={classes.container} onClick={onClick}>
    <Typography>{children}</Typography>
  </div>
);

export default withStyles(styles)(SearchMenuItem);
