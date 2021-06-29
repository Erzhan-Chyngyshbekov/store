import axios from "axios";
import React, { useReducer } from "react";
import { calcTotalPrice, calcSubPrice } from "../helpers/calcPrice";

const INIT_STATE = {
  products: [],
  brand: [],
  productDetail: null,
  brandDetail: null,
  total: 0,
  cart: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        total: action.payload.total,
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
        brand: action.payload,
      };
    case "CLEAR_PRODUCT":
      return {
        ...state,
        productDetail: null,
      };
    case "SET_BRAND_DETAIL":
      return {
        ...state,
        brandDetail: action.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "CHANGE_LIKE_STATUS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, like: !product.like }
            : product
        ),
      };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchProducts = async (page = 0) => {
    try {
      const response = await axios.get(
        `${URL}/products?_start=${page * 4}&_end=${4 * (page + 1)}`
      );
      const products = response.data;
      const total = response.headers["x-total-count"];

      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          data: products,
          total,
        },
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
    const response = await axios.get(`${URL}/brand`);
    const brand = response.data;

    dispatch({
      type: "SET_BRANDS",
      payload: brand,
    });
  };

  const updateProduct = async (id, data) => {
    await axios.patch(`${URL}/products/${id}`, data);
    dispatch({
      type: "CLEAR_PRODUCT",
    });
  };

  const fetchBrandProducts = async (brandId) => {
    const response = await axios.get(`${URL}/products/?brand=${brandId}`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const fetchBrandDetail = async (brandId) => {
    const response = await axios.get(`${URL}/brand/${brandId}`);
    const brand = response.data;
    console.log(brand);

    dispatch({
      type: "SET_BRAND_DETAIL",
      payload: brand,
    });
  };

  const fetchSearchProducts = async (value) => {
    const response = await axios.get(`${URL}/products/?q=${value}`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const addProductToCart = (product) => {
    console.log(product);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0,
    };

    //если кликнутый продукт есть в корзине, то удаляем, а если нет то пушим
    let filteredCart = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredCart.length > 0) {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }

    newProduct.subPrice = calcSubPrice(newProduct);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const changeLikeStatus = async (id, prevLike) => {
    await axios.patch(`${URL}/products/${id}`, { like: !prevLike });
    dispatch({
      type: "CHANGE_LIKE_STATUS",
      payload: id,
    });
  };

  return (
    <storeContext.Provider
      value={{
        products: state.products,
        brand: state.brand,
        productDetail: state.productDetail,
        total: state.total,
        brandDetail: state.brandDetail,
        cart: state.cart,
        fetchProducts,
        createProduct,
        fetchProductDetail,
        deleteProduct,
        fetchBrands,
        updateProduct,
        fetchBrandProducts,
        fetchBrandDetail,
        getCart,
        addProductToCart,
        changeProductCount,
        changeLikeStatus,
        fetchSearchProducts,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}
