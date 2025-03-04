import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/Pokemon.css";
import {
  faFire,
  faBolt,
  faTint,
  faLeaf,
  faSnowflake,
  faHandRock,
  faSkull,
  faMountain,
  faFeather,
  faBrain,
  faBug,
  faGem,
  faGhost,
  faDragon,
  faMoon,
  faCog,
  faStar,
  faArrowsAltV,
  faWeight,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderColor, setBorderColor] = useState("#000");
  const [typeIcon, setTypeIcon] = useState(faStar);
  const [typeColor, setTypeColor] = useState("#000");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        );
        if (!response.ok) throw new Error("Pokémon not found");
        const data = await response.json();
        setPokemon(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        setEvolutionChain(evolutionData);

        const primaryType = data.types[0].type.name;
        const typeData = {
          normal: { color: "#A8A77A", icon: faStar },
          fire: { color: "#EE8130", icon: faFire },
          water: { color: "#6390F0", icon: faTint },
          electric: { color: "#F7D02C", icon: faBolt },
          grass: { color: "#7AC74C", icon: faLeaf },
          ice: { color: "#96D9D6", icon: faSnowflake },
          fighting: { color: "#C22E28", icon: faHandRock },
          poison: { color: "#A33EA1", icon: faSkull },
          ground: { color: "#E2BF65", icon: faMountain },
          flying: { color: "#A98FF3", icon: faFeather },
          psychic: { color: "#F95587", icon: faBrain },
          bug: { color: "#A6B91A", icon: faBug },
          rock: { color: "#B6A136", icon: faGem },
          ghost: { color: "#735797", icon: faGhost },
          dragon: { color: "#6F35FC", icon: faDragon },
          dark: { color: "#705746", icon: faMoon },
          steel: { color: "#B7B7CE", icon: faCog },
          fairy: { color: "#D685AD", icon: faStar },
        };

        setBorderColor(typeData[primaryType]?.color || "#000");
        setTypeColor(typeData[primaryType]?.color || "#000");
        setTypeIcon(typeData[primaryType]?.icon || faStar);

        setLoading(false);
      } catch (err) {
        setError("Pokémon not found");
        setLoading(false);
      }
    }
    fetchData();
  }, [name]);

  if (loading)
    return (
      <div class="item">
        <div class="ball"></div>
        <div class="half-ball"></div>
        <div class="big-button"></div>
        <div class="small-button"></div>
        <div class="horizon"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 text-center">
      <h2 className="text-primary">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="img-fluid"
        style={{
          width: "200px",
          border: `5px solid ${borderColor}`,
          borderRadius: "50%",
          padding: "5px",
        }}
      />
      <table className="table table-bordered mt-3">
        <thead>
          <tr style={{ backgroundColor: typeColor, color: "white" }}>
            <th>Attribute</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon icon={typeIcon} style={{ color: typeColor }} />{" "}
              Type
            </td>
            <td>{pokemon.types.map((t) => t.type.name).join(", ")}</td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={faBolt} /> Abilities
            </td>
            <td>{pokemon.abilities.map((a) => a.ability.name).join(", ")}</td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={faArrowsAltV} /> Height
            </td>
            <td>{pokemon.height / 10} m</td>
          </tr>
          <tr>
            <td>
              <FontAwesomeIcon icon={faWeight} /> Weight
            </td>
            <td>{pokemon.weight / 10} kg</td>
          </tr>
          {species && (
            <>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faChartLine} /> Growth Rate
                </td>
                <td>{species.growth_rate.name.replace("-", " ")}</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faLeaf} /> Habitat
                </td>
                <td>{species.habitat ? species.habitat.name : "Unknown"}</td>
              </tr>
            </>
          )}
          {evolutionChain && (
            <tr>
              <td>Evolution Chain</td>
              <td>
                {evolutionChain.chain.species.name}
                {evolutionChain.chain.evolves_to.map((evo) => (
                  <span key={evo.species.name}> → {evo.species.name}</span>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Pokemon;
