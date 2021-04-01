import React from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

import InfoChip from "../Components/InfoChip";
import SortBar from "../Components/SortBar";
import MovieGrid from "../Components/MovieGrid";

import { ROUTES } from "../constants";

const useStyles = makeStyles(() => ({
  image: {
    maxWidth: "100%",
    height: "100%",
    cursor: "pointer",
    objectFit: "cover",
  },
  actorGrid: {
    lineHeight: 0,
    columnCount: 12,
    columnGap: "0px",
  },
  relative: {
    position: "relative",
  },
  overflowHidden: {
    overflowX: "hidden",
  },
}));

const Grid = ({
  data,
  movieView,
  history,
  handleRequestSort,
  handleCustomSort,
  sortData,
  resetSort,
  order,
  orderBy,
  customOrderBy,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {movieView ? (
        <MovieGrid
          data={data}
          movieView={movieView}
          history={history}
          handleRequestSort={handleRequestSort}
          handleCustomSort={handleCustomSort}
          sortData={sortData}
          resetSort={resetSort}
          order={order}
          orderBy={orderBy}
          customOrderBy={customOrderBy}
        />
      ) : (
        <React.Fragment>
          <SortBar
            handleRequestSort={handleRequestSort}
            handleCustomSort={handleCustomSort}
            order={order}
            orderBy={orderBy}
            customOrderBy={customOrderBy}
            movieView={false}
          />
          <div
            className={classNames(classes.actorGrid, classes.overflowHidden)}
          >
            {data &&
              sortData(data.actors).map((actor) => (
                <div className={classes.relative} key={uuidv4()}>
                  <img
                    key={actor.ActorID}
                    onClick={() =>
                      history.push(`${ROUTES.ACTOR}/${actor.ActorID}`)
                    }
                    className={classes.image}
                    src={`http://localhost:8080/images/actor/${actor.ActorName}.jpg?w=220`}
                  />
                  <InfoChip label={actor.ActorName} />
                </div>
              ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Grid;
