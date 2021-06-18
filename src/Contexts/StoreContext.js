import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  products: [],
  brands: [],
  productDetail: null,
  total: 0,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "CLEAR_PRODUCT":
      return {
        ...state,
        productDetail: null,
      };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`);
      const products = response.data;
      console.log(response);

      dispatch({
        type: "SET_PRODUCTS",
        payload: products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProduct = async (product) => {
    const response = await axios.post(`${URL}/products`, product);
    const createdProduct = response.data;

    dispatch({
      type: "ADD_PRODUCT",
      payload: createdProduct,
    });

    return createdProduct.id;
  };

  const fetchProductDetail = async (id) => {
    const response = await axios.get(`${URL}/products/${id}`);
    const productDetail = response.data;
    dispatch({
      type: "SET_PRODUCT_DETAIL",
      payload: productDetail,
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${URL}/products/${id}`);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const fetchBrands = async () => {
    const response = await axios.get(`${URL}/brands`);
    const brands = response.data;

    dispatch({
      type: "SET_BRANDS",
      payload: brands,
    });
  };

  const updateProduct = async (id, data) => {
    await axios.patch(`${URL}/products/${id}`, data);
    dispatch({
      type: "CLEAR_PRODUCT",
    });
  };

  return (
    <storeContext.Provider
      value={{
        products: state.products,
        brands: state.brands,
        productDetail: state.productDetail,
        fetchProducts,
        createProduct,
        fetchProductDetail,
        deleteProduct,
        fetchBrands,
        updateProduct,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}
