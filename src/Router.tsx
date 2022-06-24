import { Route, Routes } from "react-router-dom";
import { Layout } from "./Pages/Layout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/event" element={<Layout />} />
      <Route path="/event/lesson/:lessonSlug" element={<Layout />} />
    </Routes>
  )
}