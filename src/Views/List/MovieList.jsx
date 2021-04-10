import React from "react";
import dayjs from "dayjs";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { ROUTES } from "../../constants";

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

const MovieList = ({
  data,
  classes,
  history,
  handleRequestSort,
  sortData,
  order,
  orderBy,
}) => {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          <TableCell sortDirection={orderBy === "MovieName" ? order : false}>
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
      <TableBody>
        {data &&
          sortData(data.movies).map((row) => (
            <TableRow
              key={row.MovieID}
              className={classes.row}
              onClick={() => history.push(`${ROUTES.MOVIE}/${row.MovieID}`)}
            >
              <TableCell className={classes.cell} component="th" scope="row">
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
          ))}
      </TableBody>
    </React.Fragment>
  );
};

export default withStyles(styles)(MovieList);
