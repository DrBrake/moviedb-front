import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiGrid from "@material-ui/core/Grid";

const styles = (theme) => ({
  sortElement: {
    cursor: "pointer",
    display: "flex",
  },
  sortText: {
    marginRight: theme.spacing(1),
  },
});

const MovieSortBar = ({ handleRequestSort, orderBy, classes, getArrow }) => {
  return (
    <React.Fragment>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "MovieName")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "MovieName" ? "primary" : "initial"}
        >
          Name
        </Typography>
        {getArrow("MovieName")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "MovieStudio")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "MovieStudio" ? "primary" : "initial"}
        >
          Studio
        </Typography>
        {getArrow("MovieStudio")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "MovieYear")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "MovieYear" ? "primary" : "initial"}
        >
          Year
        </Typography>
        {getArrow("MovieYear")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "MovieAdded")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "MovieAdded" ? "primary" : "initial"}
        >
          Date added
        </Typography>
        {getArrow("MovieAdded")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "MoviePlays")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "MoviePlays" ? "primary" : "initial"}
        >
          Plays
        </Typography>
        {getArrow("MoviePlays")}
      </MuiGrid>
    </React.Fragment>
  );
};

export default withStyles(styles)(MovieSortBar);
