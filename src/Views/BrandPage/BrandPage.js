import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import ProductsList from "../../components/ProductsList";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function BrandPage() {
  const { id } = useParams();
  const { products, fetchBrandProducts, fetchBrandDetail, brandDetail } =
    useContext(storeContext);

  useEffect(() => {
    fetchBrandProducts(id);
    fetchBrandDetail(id);
  }, [id]);

  return (
    <MainLayout>
      {products.length && brandDetail ? (
        <ProductsList products={products} />
      ) : (
        ""
      )}
    </MainLayout>
  );
}
