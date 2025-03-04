import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch Pokémon List
  useEffect(() => {
    if (search.length > 1) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          );
          setSuggestions(filtered.slice(0, 5)); // Limit suggestions to 5
        })
        .catch((err) => console.error("Error fetching Pokémon data:", err));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#FFCC00" }}
    >
      <div className="container">
        {/* Pokémon Logo & Title */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="PokéDex Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span
            style={{ color: "#E3350D", fontWeight: "bold", fontSize: "24px" }}
          >
            PokéDex
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navigation */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link fw-bold"
                to="/about"
                style={{ color: "#E3350D" }}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Search Box with Suggestions */}
          <div className="position-relative ms-lg-3 mt-2 mt-lg-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Suggestion Dropdown */}
            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((pokemon) => (
                  <li key={pokemon.name} className="list-group-item">
                    <Link
                      to={`/pokemon/${pokemon.name}`}
                      className="text-decoration-none text-dark"
                      onClick={() => setSearch("")} // Clear search when clicked
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
