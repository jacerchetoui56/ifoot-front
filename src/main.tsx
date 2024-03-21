import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./i18n/index.ts";
import ThemeContextProvider from "./context/ThemeProvider.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <ThemeContextProvider>
          <Toaster position="top-right" richColors />
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </ThemeContextProvider>
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
