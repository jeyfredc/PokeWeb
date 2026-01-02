
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import PokemonDetailPage from './pages/PokemonDetailPage/PokemonDetailPage';

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/pokedex" element={<HomePage />} index />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        
        <Route path="*" element={<Navigate to="/pokedex" />} />
    </Routes>
  );
}

