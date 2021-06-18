import { IconButton, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import MainLayout from "../../Layouts/MainLayout";
import ProductSlider from "./components/ProductSlider";
import classes from "./productDetail.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { notifySuccess } from "../../helpers/notifiers";
import { storeContext } from "../../Contexts/StoreContext";

export default function ProductDetailPage() {
  const { fetchProductDetail, productDetail, deleteProduct } =
    useContext(storeContext);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  const handleProductDelete = () => {
    deleteProduct(id).then(() => {
      notifySuccess("Товар был успешно удален!");
      history.push("/");
    });
  };

  return (
    <MainLayout>
      {productDetail ? (
        <div className={classes.container}>
          <ProductSlider images={productDetail.images} />

          <div className={classes.container__info}>
            <Typography variant="h3">{productDetail.title}</Typography>
            <Typography variant="h5">{productDetail.memory}</Typography>
            <Typography variant="h3">{productDetail.price}</Typography>
            <Typography variant="body1">{productDetail.description}</Typography>

            <IconButton onClick={handleProductDelete}>
              <DeleteIcon fontSize="large" />
            </IconButton>

            <IconButton onClick={() => history.push(`/products/${id}/update`)}>
              <EditIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      ) : (
        ""
      )}
    </MainLayout>
  );
}
