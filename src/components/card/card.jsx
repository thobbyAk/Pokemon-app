import React from "react";
import "./card.scss";

function Card({ pokemonData }) {
	return (
		<div data-testid="pokemeonCard">
			<div className="pokemeonCard">
				<span className="pokmanCard__Number">{pokemonData?.id}</span>
				<img
					className="pokemonCard__Image"
					src={pokemonData?.sprites?.front_default}
					alt={pokemonData?.sprites?.front_default}
				/>
				<h1 className="pokemonCard__Title">{pokemonData?.name}</h1>
			</div>
		</div>
	);
}

export default Card;
