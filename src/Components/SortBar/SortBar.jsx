import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MuiGrid from "@material-ui/core/Grid";

import MovieSortBar from "./MovieSortBar";
import ActorSortBar from "./ActorSortBar";
import { ArrowDown, ArrowUp } from "../Icons";

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

const SortBar = ({ handleRequestSort, order, orderBy, movieView, classes }) => {
  const getArrow = (value) => {
    if (orderBy === value) {
      if (order === "asc") return <ArrowUp />;
      return <ArrowDown />;
    }
    return null;
  };
  return (
    <Paper elevation={1}>
      <MuiGrid
        container
        className={classes.sortContainer}
        justify="space-around"
      >
        {movieView ? (
          <MovieSortBar
            handleRequestSort={handleRequestSort}
            orderBy={orderBy}
            getArrow={getArrow}
          />
        ) : (
          <ActorSortBar
            handleRequestSort={handleRequestSort}
            orderBy={orderBy}
            getArrow={getArrow}
          />
        )}
      </MuiGrid>
    </Paper>
  );
};

export default withStyles(styles)(SortBar);
