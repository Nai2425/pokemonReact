import { useEffect } from "react";

function About() {
  return (
    <div className=" overflow-auto flex items-center justify-center">
      <div className="p-4 md:p-6 w-full max-w-3xl mx-auto text-center bg-yellow-100 rounded-xl shadow-lg border-4 border-yellow-400">
        {/* Pikachu Image */}
        <div className="relative flex justify-center w-full">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
            className="w-10 h-10 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-bounce max-w-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-lg md:text-2xl lg:text-3xl text-yellow-700 mb-4 font-bold font-pokemon">
          About This Project
        </h1>

        {/* Description */}
        <p className="text-xs md:text-sm lg:text-lg text-gray-700 mb-4 font-pokemon leading-relaxed">
          This website is created for educational purposes only. It is designed
          to help me learn and explore various aspects of web development,
          React.js, and API integration.
        </p>
        <p className="text-xs md:text-sm lg:text-lg text-gray-700 mb-4 font-pokemon leading-relaxed">
          All data and information displayed on this site are retrieved from an
          external API. I do not claim ownership of any content provided by the
          API.
        </p>

        {/* Credits */}
        <p className="text-sm md:text-md lg:text-lg font-semibold text-yellow-800">
          Credits:
          <br />
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            PokéAPI
          </a>
          – for providing the Pokémon data.
          <br />
          <a
            href="https://dribbble.com/shots/3014076-Pokeball-Loading"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Henry Lim
          </a>
          – for sharing his amazing pokeball animation.
        </p>
      </div>
    </div>
  );
}

export default About;
