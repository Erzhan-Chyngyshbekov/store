import React, { useContext, useEffect, useState } from "react";
import Brands from "../../components/Brands";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ProductsPagination from "../../components/ProductPagination";
import { storeContext } from "../../Contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";
import ProducstList from "../../components/ProductsList";

export default function MainPage() {
  const { products, fetchProducts, total } = useContext(storeContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(page - 1);
  }, [page]);

  return (
    <MainLayout>
      <HeroSlider />
      <Brands />
      <ProducstList products={products} />
      <ProductsPagination
        setPage={setPage}
        page={page}
        count={Math.ceil(total / 4)}
      />
    </MainLayout>
  );
}
