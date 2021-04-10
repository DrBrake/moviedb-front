import React from "react";
import dayjs from "dayjs";
import LazyLoad from "react-lazyload";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
  imageCell: {
    padding: `0px ${theme.spacing(2)}px`,
  },
});

const ActorList = ({
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
          <TableCell></TableCell>
          <TableCell sortDirection={orderBy === "ActorName" ? order : false}>
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
      <TableBody>
        {data &&
          sortData(data.actors).map((row) => (
            <TableRow
              key={row.ActorID}
              className={classes.row}
              onClick={() => history.push(`${ROUTES.ACTOR}/${row.ActorID}`)}
            >
              <TableCell className={classes.imageCell}>
                {
                  <LazyLoad
                    height={40}
                    offset={100}
                    once
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={`http://localhost:8080/images/faces/${row.ActorName}.jpg`}
                    />
                  </LazyLoad>
                }
              </TableCell>
              <TableCell className={classes.cell} component="th" scope="row">
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
    </React.Fragment>
  );
};

export default withStyles(styles)(ActorList);
