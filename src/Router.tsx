import { Route, Routes } from "react-router-dom";
import { Subscribe } from "./components/Subscribe";
import { Layout } from "./pages/Layout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={<Layout />} />
      <Route path="/event/lesson/:lessonSlug" element={<Layout />} />
    </Routes>
  )
}