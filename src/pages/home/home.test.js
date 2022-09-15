import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home";

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
		await waitFor(() => screen.getByTestId("newchild"), {
			timeout: 10000,
		});

		expect(screen.getByText("#38")).toBeInTheDocument();
	});
	test("should render card component in the parent component ", async () => {
		const { getByTestId } = await render(<Home />);
		const parent = getByTestId("parent");
		await waitFor(() => screen.getByTestId("child"), {
			timeout: 10000,
		});
		const child = getByTestId("child");

		expect(child).not.toContainElement(parent);
		expect(within(parent).queryByTestId("child")).not.toBeNull();
	});
	test("should be able to filter pokemondata", async () => {
		render(<Home />);
		await waitFor(() => screen.getByTestId("child"), {
			timeout: 10000,
		});
		const inputEl = screen.getByTestId("filter-input");
		userEvent.type(inputEl, "bulbasaur");
		expect(screen.getByTestId("filter-input")).toHaveValue("bulbasaur");
		const newCards = await within(screen.getByTestId("child")).findAllByTestId(
			"pokemeonCard"
		);

		expect(newCards.length).toBeGreaterThanOrEqual(1);
	});
});
