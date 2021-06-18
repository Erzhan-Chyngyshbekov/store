import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./Views/MainPage/MainPage";
import ProductCreatePage from "./Views/ProductCreatePage/ProductCreatePage";
import ProductDetailPage from "./Views/ProductDetailPage/ProductDetailPage";
import ProductUpdatePage from "./Views/ProductUpdatePage/ProductUpdatePage";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/products/create" component={ProductCreatePage} exact />
        <Route path="/products/:id" component={ProductDetailPage} exact />
        <Route
          path="/products/:id/update/"
          component={ProductUpdatePage}
          exact
        />
        {/* <Route
          path="/products/search/:searchValue"
          component={SearchResultPage}
          exact
        />
        <Route exact path="/brand/:id" component={BrandPage} /> */}
      </Switch>
    </Router>
  );
}
