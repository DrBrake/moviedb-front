import React from "react";
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import { ChevronRight } from "./Icons";

const useStyles = makeStyles((theme) => ({
  chip: {
    height: "auto",
    width: "100%",
    color: theme.palette.secondary.main,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 1,
    cursor: "pointer",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: 0,
    display: "none",
    ":hover > &": {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: `${theme.palette.primary.main}E6`,
    },
  },
  label: {
    overflow: "inherit",
    whiteSpace: "pre-line",
    lineHeight: "initial",
  },
  moveDown: {
    bottom: -70,
  },
  coverView: {
    display: "block",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    backgroundColor: `${theme.palette.primary.main}E6`,
    width: "800px",
    padding: theme.spacing(2),
    textAlign: "center",
    ":hover > &": {
      display: "block",
    },
  },
  icon: {
    fontSize: "40px",
    ":hover > &": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const InfoChip = ({
  label,
  moveDown,
  coverView,
  onDelete,
  onClick,
  spinner,
  size,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Chip
        className={classNames(classes.chip, {
          [classes.moveDown]: moveDown,
          [classes.coverView]: coverView,
        })}
        label={label}
        size={size || "small"}
        classes={{
          label: classes.label,
        }}
        onClick={onClick}
        onDelete={spinner && onDelete}
        deleteIcon={
          spinner && (
            <IconButton color="secondary" disableRipple>
              <ChevronRight className={classes.icon} />
            </IconButton>
          )
        }
      />
    </React.Fragment>
  );
};

export default InfoChip;
