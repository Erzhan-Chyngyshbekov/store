import React from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pagination: {
    margin: "50px auto",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function ProductsPagination({ count, page, setPage }) {
  const classes = useStyles();

  return (
    <Pagination
      onChange={(_, _page) => setPage(_page)}
      count={count}
      page={page}
      className={classes.pagination}
      color="secondary"
    />
  );
}
