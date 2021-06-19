import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import Truncate from "react-truncate";
import { storeContext } from "../../Contexts/StoreContext";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 512,
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

  const { title, images, price, memory, like, id } = data;

  const { addProductToCart, changeLikeStatus } = useContext(storeContext);

  const handleLikeChange = () => {
    changeLikeStatus(id, like);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/products/${id}`)}>
        <CardMedia className={classes.media} image={images[0]} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Truncate lines={1} ellipsis={"..."}>
              {title}
            </Truncate>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {memory}
          </Typography>
          <Typography gutterBottom variant="h3" component="h2">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Checkbox
          onChange={handleLikeChange}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          name="checkedH"
          checked={like}
          style={{ color: "#e7315d" }}
        />

        <Button
          onClick={() => addProductToCart(data)}
          size="small"
          color="primary"
        >
          <ShoppingBasketIcon style={{ color: "#e7315d" }} />
        </Button>
      </CardActions>
    </Card>
  );
}
