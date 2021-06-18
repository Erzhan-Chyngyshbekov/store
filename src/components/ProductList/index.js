import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../ProductItem";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  container: {},
}));

export default function ProductList({ products }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={0}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem data={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
