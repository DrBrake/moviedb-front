import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiGrid from "@material-ui/core/Grid";

const styles = (theme) => ({
  sortContainer: {
    padding: theme.spacing(2),
  },
  sortElement: {
    cursor: "pointer",
    display: "flex",
  },
  sortText: {
    marginRight: theme.spacing(1),
  },
});

const ActorSortBar = ({ handleRequestSort, orderBy, classes, getArrow }) => {
  return (
    <React.Fragment>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "ActorName")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "ActorName" ? "primary" : "initial"}
        >
          Name
        </Typography>
        {getArrow("ActorName")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "ActorBirthday")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "ActorBirthday" ? "primary" : "initial"}
        >
          Birthday
        </Typography>
        {getArrow("ActorBirthday")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "ActorAdded")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "ActorAdded" ? "primary" : "initial"}
        >
          Date added
        </Typography>
        {getArrow("ActorAdded")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "ActorPlays")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "ActorPlays" ? "primary" : "initial"}
        >
          Plays
        </Typography>
        {getArrow("ActorPlays")}
      </MuiGrid>
      <MuiGrid
        item
        className={classes.sortElement}
        onClick={(e) => handleRequestSort(e, "ActorMovies")}
      >
        <Typography
          className={classes.sortText}
          color={orderBy === "ActorMovies" ? "primary" : "initial"}
        >
          Movies
        </Typography>
        {getArrow("ActorMovies")}
      </MuiGrid>
    </React.Fragment>
  );
};

export default withStyles(styles)(ActorSortBar);
