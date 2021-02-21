import React from "react";
import flatten from "lodash/flatten";
import compact from "lodash/compact";
import toPairs from "lodash/toPairs";
import uniq from "lodash/uniq";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { ROUTES } from "../../constants";

const styles = () => ({
  pointer: {
    cursor: "pointer",
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
  },
  chart: {
    position: "relative",
  },
});

const StatsContent = ({
  data,
  years,
  dateAddedYears,
  studios,
  clearFilters,
  classes,
  history,
  sortData,
  activeTab,
}) => {
  const topValues = (value, compare, returnValue, comparisonCallback) => {
    const topValues = flatten(
      compact(
        data.movies.map((item) => {
          if (
            comparisonCallback
              ? comparisonCallback(value, item[compare])
              : item[compare] === value
          )
            return item[returnValue];
        })
      )
    ).reduce(
      (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] | 0) + 1 }),
      {}
    );

    return compact(
      toPairs(topValues)
        .sort((a, b) => -(a[1] - b[1]))
        .map((item) => {
          if (item[1] !== 1) return item;
        })
    );
  };

  const numbersContent = () => {
    if (activeTab === "Genre") {
      return (
        data &&
        sortData(data.genres).map((row) => (
          <TableRow key={row.GenreID}>
            <TableCell component="th" scope="row">
              {row.GenreName}
            </TableCell>
            <TableCell align="right">{row.GenreMovies}</TableCell>
            <TableCell align="right">{row.GenrePlays}</TableCell>
            <TableCell>
              {topValues(
                row.GenreID,
                "MovieGenres",
                "MovieActors",
                (GenreID, MovieGenres) => MovieGenres.includes(GenreID)
              ).map((item) => (
                <span
                  onClick={() => {
                    clearFilters({ genreFilter: [row.GenreID] });
                    history.push(`${ROUTES.ACTOR}/${item[0]}`);
                  }}
                  className={classes.pointer}
                  key={uuidv4()}
                >
                  {`${
                    data.actors.find(
                      (actor) => actor.ActorID.toString() === item[0]
                    ).ActorName
                  } ${item[1]}, `}
                </span>
              ))}
            </TableCell>
          </TableRow>
        ))
      );
    } else if (activeTab === "Years") {
      return (
        data &&
        years.map((row) => (
          <TableRow key={row}>
            <TableCell component="th" scope="row">
              {row}
            </TableCell>
            <TableCell align="right">
              {data.movies.filter((item) => item.MovieYear === row).length}
            </TableCell>
            <TableCell align="right">
              {compact(
                data.movies.map((item) => {
                  if (item.MovieYear === row) return item.MoviePlays;
                })
              ).reduce((acc, current) => acc + current, 0)}
            </TableCell>
            <TableCell>
              {topValues(row, "MovieYear", "MovieGenres").map((item) => (
                <span
                  onClick={() => {
                    clearFilters({
                      genreFilter: [parseInt(item[0])],
                      yearFilter: row,
                    });
                    history.push(`${ROUTES.MOVIE}${ROUTES.LIST}`);
                  }}
                  className={classes.pointer}
                  key={uuidv4()}
                >
                  {`${
                    data.genres.find(
                      (genre) => genre.GenreID.toString() === item[0]
                    ).GenreName
                  } ${item[1]}, `}
                </span>
              ))}
            </TableCell>
            <TableCell>
              {topValues(row, "MovieYear", "MovieActors").map((item) => (
                <span
                  onClick={() => {
                    clearFilters({ yearFilter: row });
                    history.push(`${ROUTES.ACTOR}/${item[0]}`);
                  }}
                  className={classes.pointer}
                  key={uuidv4()}
                >
                  {`${
                    data.actors.find(
                      (actor) => actor.ActorID.toString() === item[0]
                    ).ActorName
                  } ${item[1]}, `}
                </span>
              ))}
            </TableCell>
          </TableRow>
        ))
      );
    } else if (activeTab === "Date") {
      return (
        data &&
        dateAddedYears.map((row) => (
          <TableRow key={row}>
            <TableCell component="th" scope="row">
              {row}
            </TableCell>
            <TableCell align="right">
              {
                data.movies.filter(
                  (item) => dayjs(item.MovieAdded).year() === row
                ).length
              }
            </TableCell>
            <TableCell align="right">
              {compact(
                data.movies.map((item) => {
                  if (dayjs(item.MovieAdded).year() === row)
                    return item.MoviePlays;
                })
              ).reduce((acc, current) => acc + current, 0)}
            </TableCell>
            <TableCell>
              {uniq(
                compact(
                  data.movies.map((item) => {
                    if (dayjs(item.MovieAdded).year() === row)
                      return item.MovieYear;
                  })
                )
              )
                .sort()
                .map((item) => `${item}, `)}
            </TableCell>
            <TableCell>
              {topValues(
                row,
                "MovieAdded",
                "MovieGenres",
                (row, MovieAdded) => dayjs(MovieAdded).year() === row
              ).map((item) => (
                <span
                  onClick={() => {
                    clearFilters({
                      genreFilter: [parseInt(item[0])],
                      dateAddedFilter: row,
                    });
                    history.push(`${ROUTES.MOVIE}${ROUTES.LIST}`);
                  }}
                  className={classes.pointer}
                  key={uuidv4()}
                >
                  {`${
                    data.genres.find(
                      (genre) => genre.GenreID.toString() === item[0]
                    ).GenreName
                  } ${item[1]}, `}
                </span>
              ))}
            </TableCell>
            <TableCell>
              {topValues(
                row,
                "MovieAdded",
                "MovieActors",
                (row, MovieAdded) => dayjs(MovieAdded).year() === row
              ).map((item) => (
                <span
                  onClick={() => {
                    clearFilters({ dateAddedFilter: row });
                    history.push(`${ROUTES.ACTOR}/${item[0]}`);
                  }}
                  className={classes.pointer}
                  key={uuidv4()}
                >
                  {`${
                    data.actors.find(
                      (actor) => actor.ActorID.toString() === item[0]
                    ).ActorName
                  } ${item[1]}, `}
                </span>
              ))}
            </TableCell>
          </TableRow>
        ))
      );
    } else if (activeTab === "Studios") {
      return (
        data &&
        sortData(studios).map((row) => (
          <TableRow key={uuidv4()}>
            <TableCell component="th" scope="row">
              <span
                onClick={() => {
                  clearFilters({
                    studioFilter: [row.MovieStudioName],
                  });
                  history.push(`${ROUTES.MOVIE}${ROUTES.LIST}`);
                }}
                className={classes.pointer}
                key={uuidv4()}
              >
                {row.MovieStudioName}
              </span>
            </TableCell>
            <TableCell align="right">{row.MovieStudioMovies}</TableCell>
            <TableCell align="right">{row.MovieStudioPlays}</TableCell>
            <TableCell>
              {topValues(
                row,
                "MovieStudio",
                "MovieGenres",
                (row, MovieStudio) => MovieStudio === row.MovieStudioName
              ).map(
                (item) =>
                  `${
                    data.genres.find(
                      (genre) => genre.GenreID.toString() === item[0]
                    ).GenreName
                  } ${item[1]}, `
              )}
            </TableCell>
            <TableCell>
              {topValues(
                row,
                "MovieStudio",
                "MovieActors",
                (row, MovieStudio) => MovieStudio === row.MovieStudioName
              ).map(
                (item) =>
                  `${
                    data.actors.find(
                      (actor) => actor.ActorID.toString() === item[0]
                    ).ActorName
                  } ${item[1]}, `
              )}
            </TableCell>
          </TableRow>
        ))
      );
    }
    return null;
  };
  return numbersContent();
};

export default withStyles(styles)(StatsContent);
