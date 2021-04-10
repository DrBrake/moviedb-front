import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import MovieList from "./MovieList";
import ActorList from "./AcorList";
import OverallStats from "../../Components/OverallStats";

const List = ({
  data,
  movieView,
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
            <MovieList
              data={data}
              history={history}
              handleRequestSort={handleRequestSort}
              sortData={sortData}
              order={order}
              orderBy={orderBy}
            />
          ) : (
            <ActorList
              data={data}
              history={history}
              handleRequestSort={handleRequestSort}
              sortData={sortData}
              order={order}
              orderBy={orderBy}
            />
          )}
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default List;
