import React, { useContext, useEffect, useState } from "react";
import Brands from "../../components/Brands";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ProductList from "../../components/ProductList";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function MainPage() {
  const { products, fetchProducts } = useContext(storeContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <HeroSlider />
      <Brands />
      <ProductList products={products} />
    </MainLayout>
  );
}
