import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 8; // Number of Pokémon per page

  useEffect(() => {
    const cachedPokemon = localStorage.getItem("pokemonData");

    if (cachedPokemon) {
      setPokemon(JSON.parse(cachedPokemon)); // Load from cache
    } else {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data.results);
          localStorage.setItem("pokemonData", JSON.stringify(data.results)); // Save to cache
        })
        .catch((error) => console.error("Error fetching Pokémon:", error));
    }
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(pokemon.length / pokemonPerPage);

  // Get current Pokémon
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Function to handle pagination clicks
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      {/* Pokémon Grid */}
      <h2 className="text-center mb-3">You can search specific Pokémon</h2>
      <div className="row">
        {currentPokemon.map((poke, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-3">
            <a
              href={`/pokemon/${poke.name}`} // The URL to the Pokémon details
              // Open in a new tab
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <div className="card p-3 shadow-sm text-center border border-warning border-5 rounded">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + indexOfFirstPokemon + 1
                  }.png`}
                  alt={poke.name}
                  className="img-fluid"
                />
                <h5 className="mt-2 text-capitalize">{poke.name}</h5>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination - Mobile Friendly */}
      <nav className="d-flex justify-content-center mt-3">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>

          {/* Show first page */}
          {currentPage > 2 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => goToPage(1)}>
                  1
                </button>
              </li>
              {currentPage > 3 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {/* Show current page, previous, and next */}
          {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
            .filter((page) => page >= 1 && page <= totalPages)
            .map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => goToPage(page)}>
                  {page}
                </button>
              </li>
            ))}

          {/* Show last page */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => goToPage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => goToPage(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
