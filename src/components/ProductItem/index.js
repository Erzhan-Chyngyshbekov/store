import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import classes from "./productItem.module.css";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    "&:hover": {
      margin: "-10px",
      boxShadow: "7px 7px 15px -1px rgba(70,70,70,0.64)",
    },
  },
  media: {
    height: 300,
    backgroundSize: "contain",
  },
});

export default function ProductItem({ data }) {
  const classes = useStyles();
  const history = useHistory();

  const { title, images, price, memory, id } = data;

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/products/${id}`)}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={images[0]} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {memory}
          </Typography>
          <Typography gutterBottom variant="h3" component="h2">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <FavoriteBorderIcon style={{ color: "#e7315d" }} />
          </Button>
          <Button size="small" color="primary">
            <SaveAltIcon style={{ color: "#e7315d" }} />
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
