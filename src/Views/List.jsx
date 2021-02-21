import React, { useEffect } from "react";
import dayjs from "dayjs";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import OverallStats from "../Components/OverallStats";
import { ROUTES } from "../constants";

const styles = (theme) => ({
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  cell: {
    ":hover > &": {
      color: theme.palette.secondary.main,
    },
  },
  actorName: {
    fontSize: "inherit",
    color: theme.palette.secondary.dark,
  },
});

const List = ({
  data,
  movieView,
  classes,
  history,
  handleRequestSort,
  sortData,
  resetSort,
  order,
  orderBy,
}) => {
  useEffect(() => {
    resetSort(movieView);
  }, [movieView]);

  return (
    <React.Fragment>
      <OverallStats data={data} showFilteredGenres />
      <TableContainer component={Paper}>
        <Table>
          {movieView ? (
            <TableHead>
              <TableRow>
                <TableCell
                  sortDirection={orderBy === "MovieName" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MovieName"}
                    direction={orderBy === "MovieName" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MovieName")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "MovieCode" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MovieCode"}
                    direction={orderBy === "MovieCode" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MovieCode")}
                  >
                    Code
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "MovieStudio" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MovieStudio"}
                    direction={orderBy === "MovieStudio" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MovieStudio")}
                  >
                    Studio
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "MovieYear" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MovieYear"}
                    direction={orderBy === "MovieYear" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MovieYear")}
                  >
                    Year
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "MovieAdded" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MovieAdded"}
                    direction={orderBy === "MovieAdded" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MovieAdded")}
                  >
                    Date added
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "MoviePlays" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "MoviePlays"}
                    direction={orderBy === "MoviePlays" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "MoviePlays")}
                  >
                    Plays
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableHead>
              <TableRow>
                <TableCell
                  sortDirection={orderBy === "ActorName" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "ActorName"}
                    direction={orderBy === "ActorName" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "ActorName")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "ActorBirthday" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "ActorBirthday"}
                    direction={orderBy === "ActorBirthday" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "ActorBirthday")}
                  >
                    Birthday
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "ActorAdded" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "ActorAdded"}
                    direction={orderBy === "ActorAdded" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "ActorAdded")}
                  >
                    Date added
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align="right"
                  sortDirection={orderBy === "ActorPlays" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "ActorPlays"}
                    direction={orderBy === "ActorPlays" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "ActorPlays")}
                  >
                    Plays
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "ActorMovies"}
                    direction={orderBy === "ActorMovies" ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, "ActorMovies")}
                  >
                    Movies
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {movieView
              ? data &&
                sortData(data.movies).map((row) => (
                  <TableRow
                    key={row.MovieID}
                    className={classes.row}
                    onClick={() =>
                      history.push(`${ROUTES.MOVIE}/${row.MovieID}`)
                    }
                  >
                    <TableCell
                      className={classes.cell}
                      component="th"
                      scope="row"
                    >
                      {row.MovieName}
                      <Typography className={classes.actorName}>
                        {row.MovieActors.map(
                          (movieActor) =>
                            `${
                              data.actors.find(
                                (actor) => actor.ActorID === movieActor
                              )?.ActorName
                            }`
                        )
                          .toString()
                          .replace(/,/g, ", ")}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.MovieCode}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.MovieStudio}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.MovieYear}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {dayjs(row.MovieAdded).format("DD.MM.YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.MoviePlays}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.SortValue && row.SortValue}
                    </TableCell>
                  </TableRow>
                ))
              : data &&
                sortData(data.actors).map((row) => (
                  <TableRow
                    key={row.ActorID}
                    className={classes.row}
                    onClick={() =>
                      history.push(`${ROUTES.ACTOR}/${row.ActorID}`)
                    }
                  >
                    <TableCell
                      className={classes.cell}
                      component="th"
                      scope="row"
                    >
                      {row.ActorName}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.ActorBirthday}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {dayjs(row.ActorAdded).format("DD.MM.YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.ActorPlays}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">
                      {row.ActorMovies}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(List);
