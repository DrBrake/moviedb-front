import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "./Icons";

const styles = (theme) => ({
  dialog: {
    background: "transparent",
    overflowY: "hidden",
  },
  icon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
    zIndex: 2,
  },
});

const FullScreenDialog = ({ onClose, open, children, classes }) => (
  <Dialog
    fullScreen
    open={!!open}
    onClose={onClose}
    onBackdropClick={onClose}
    PaperProps={{
      classes: {
        root: classes.dialog,
      },
    }}
  >
    <IconButton onClick={onClose} className={classes.icon} color="primary">
      <Close />
    </IconButton>
    {children}
  </Dialog>
);

export default withStyles(styles)(FullScreenDialog);
