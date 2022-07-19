import React from "react";
import "./card.css";

function Card({ pokemonData }) {
	return (
		<div data-testid="pokemeonCard">
			<div className="pokemeonCard">
				<h3>{pokemonData?.id}</h3>
				<img
					src={pokemonData?.sprites?.front_default}
					alt={pokemonData?.sprites?.front_default}
				/>
				<h3>{pokemonData?.name}</h3>
			</div>
		</div>
	);
}

export default Card;
