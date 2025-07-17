import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ thêm
const queryClient = new QueryClient(); // ✅ khởi tạo

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}> {/* ✅ bọc app bằng provider */}
          <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
