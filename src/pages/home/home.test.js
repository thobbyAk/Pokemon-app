import React from "react";
import {
	render,
	waitForElementToBeRemoved,
	screen,
	within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";
import Card from "../../components/card/card";

let mockpokemonData = [
	{
		id: 1,
		species: {
			name: "bulbasaur",
		},
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
		},
		weight: 61,
		height: 4,
	},
	{
		id: 2,
		species: {
			name: "ninetales",
		},
		sprites: {
			front_default:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
		},
		weight: 69,
		height: 7,
	},
];

describe("<Home/>", () => {
	test("render home", () => {
		render(<Home />);
		const inputEl = screen.getByTestId("search-input");
		expect(inputEl).toBeInTheDocument();
		expect(inputEl).toHaveAttribute("type", "text");
	});
	test("should be able to search pokemon and display pokemon", async () => {
		render(<Home />);
		const inputEl = screen.getByTestId("search-input");
		userEvent.type(inputEl, "ninetales");
		expect(screen.getByTestId("search-input")).toHaveValue("ninetales");

		//Initiate the search request
		const searchBtn = screen.getByRole("button", { name: "Search" });
		expect(searchBtn).not.toBeDisabled();
		userEvent.click(searchBtn);

		//Loading state displays and gets removed once results are displayed
		await waitForElementToBeRemoved(() => screen.getByRole("alert"));

		expect(screen.getByText("Number: 38")).toBeInTheDocument();
	});
	test("should render card component in the parent component ", async () => {
		const { getByTestId } = await render(<Home />);
		const parent = getByTestId("parent");
		await waitForElementToBeRemoved(() => screen.getByRole("alertDialog"));
		const child = getByTestId("child");

		expect(child).not.toContainElement(parent);
		expect(within(parent).queryByTestId("child")).not.toBeNull();
		// const inputEl = screen.getByTestId("search-input");
		// userEvent.type(inputEl, "ninetales");
		// expect(screen.getByTestId("search-input")).toHaveValue("ninetales");
	});
});
