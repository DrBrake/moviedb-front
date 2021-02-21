import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";

import OverallStats from "../../Components/OverallStats";
import StatsContent from "./StatsContent";

const Stats = ({
  data,
  years,
  dateAddedYears,
  studios,
  clearFilters,
  history,
  sortData,
}) => {
  const [activeTab, setActiveTab] = useState("Genre");
  const setChildTabNumbers = (event, value) => {
    setActiveTab(value);
  };

  const statsContent = () => (
    <StatsContent
      data={data}
      years={years}
      dateAddedYears={dateAddedYears}
      studios={studios}
      clearFilters={clearFilters}
      history={history}
      sortData={sortData}
      activeTab={activeTab}
    />
  );

  return (
    <React.Fragment>
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid item>
          <Tabs
            value={activeTab}
            onChange={setChildTabNumbers}
            indicatorColor="primary"
          >
            <Tab label="Genre" value="Genre" />
            <Tab label="Years" value="Years" />
            <Tab label="Date added" value="Date" />
            <Tab label="Studios" value="Studios" />
          </Tabs>
        </Grid>
        <OverallStats data={data} />
      </Grid>
      {statsContent()}
    </React.Fragment>
  );
};

export default Stats;
