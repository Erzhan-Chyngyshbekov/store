import React from "react";
import StoreContextProvider from "./Contexts/StoreContext";
import Routes from "./Routes";

function App() {
  return (
    <StoreContextProvider>
      <Routes />
    </StoreContextProvider>
  );
}

export default App;
