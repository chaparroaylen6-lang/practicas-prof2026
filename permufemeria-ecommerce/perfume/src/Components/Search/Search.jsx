import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Redirige con el término de búsqueda
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Busca tu fragancia ideal..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">Buscar</button>
    </form>
  );
};

export default Search;