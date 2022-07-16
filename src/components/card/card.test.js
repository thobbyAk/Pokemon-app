import React from "react";
import { render, screen } from "@testing-library/react";

import Card from "./card";

let mockpokemonData = {
	id: 1,
	name: "bulbasaur",
	sprites: {
		front_default:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
	},
	weight: 69,
	height: 7,
};

describe("<Card/>", () => {
	it("renders mock pokemon data with card component", async () => {
		render(<Card pokemonData={mockpokemonData} />);
		const pokemonName = await screen.findByText("bulbasaur");
		expect(pokemonName).toBeInTheDocument();
	});
});
