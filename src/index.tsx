import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import { NewLead } from "./screens/NewLead/NewLead";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<NewLead />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
