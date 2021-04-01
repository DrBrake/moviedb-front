import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiGrid from "@material-ui/core/Grid";

import { ArrowDown, ArrowUp } from "../Components/Icons";

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
  return (
    <Paper elevation={1}>
      <MuiGrid
        container
        className={classes.sortContainer}
        justify="space-around"
      >
        {movieView ? (
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
              {orderBy === "MovieName" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "MovieStudio" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "MovieYear" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "MovieAdded" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "MoviePlays" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
            </MuiGrid>
          </React.Fragment>
        ) : (
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
              {orderBy === "ActorName" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "ActorBirthday" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "ActorAdded" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "ActorPlays" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
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
              {orderBy === "ActorMovies" ? (
                order === "asc" ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
            </MuiGrid>
          </React.Fragment>
        )}
      </MuiGrid>
    </Paper>
  );
};

export default withStyles(styles)(SortBar);
