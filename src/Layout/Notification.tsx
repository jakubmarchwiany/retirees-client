import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import React, { memo } from "react";

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" mountOnEnter unmountOnExit />;
}

export type NotificationProps = {
  open: boolean;
  type: "error" | "info" | "success" | "warning";
  message: string;
  close?: () => void;
};

function Notification({ open, type, message, close }: NotificationProps) {
  const handleClose = (
    event?: Event | React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    if (close) close();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{ mb: 4 }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      transitionDuration={open ? 600 : 300}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default memo(Notification);
