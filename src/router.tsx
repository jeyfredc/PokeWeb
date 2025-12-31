
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/pokedex" element={<HomePage />} index />
    </Routes>
  );
}

