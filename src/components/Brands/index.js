import React, { useContext, useEffect } from "react";
import { storeContext } from "../../Contexts/StoreContext";
import classes from "./brands.module.css";

export default function Brands() {
  const { brands, fetchBrands } = useContext(storeContext);

  console.log(brands);

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className={classes.container}>
      {brands.map((brand) => (
        <div className={classes.container_item}>
          <img src={brand.logo} alt={`${brand.title} logo`} />
        </div>
      ))}
    </div>
  );
}
