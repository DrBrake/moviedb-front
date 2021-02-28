import React from "react";
import LazyLoad from "react-lazyload";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  text: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const SearchMenuItem = ({ classes, onClick, name }) => (
  <div className={classes.container} onClick={onClick}>
    <LazyLoad height={40} offset={100} once style={{ maxHeight: "40px" }}>
      <img src={`http://localhost:8080/images/faces/${name}.jpg`} />
    </LazyLoad>
    <Typography className={classes.text}>{name}</Typography>
  </div>
);

export default withStyles(styles)(SearchMenuItem);
