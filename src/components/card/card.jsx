import React from "react";
import "./card.scss";

function Card({ pokemonData }) {
	return (
		<div data-testid="pokemeonCard" className="pokemeon__wrapper">
			<div className="pokemeon__card">
				<span className="pokemeon__Number">#{pokemonData?.id}</span>
				<img
					className="pokemon__Image"
					src={pokemonData?.sprites?.front_default}
					alt={pokemonData?.sprites?.front_default}
				/>
				<p className="pokemeon__Title">{pokemonData?.name}</p>
			</div>
		</div>
	);
}

export default Card;
