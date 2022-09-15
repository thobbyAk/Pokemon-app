import React from "react";
import Card from "../../components/card/card";
import EmptyState from "../../components/emptySate/empyState";
import Loader from "../../components/loader/loader";
import BaseRoutesService from "../../services/routes.ts";
import axios from "axios";
import "./home.scss";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
	const [showReset, setShowReset] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonName, setPokemonName] = useState("");
	const [filterName, setFilterName] = useState("");
	const [pokemonAvailable, setPokemonAvailable] = useState(true);
	const [pokemonDetails, setPokemonDetails] = useState({
		name: "",
		species: "",
		img: "",
		number: "",
		type: "",
		attack: "",
		defense: "",
	});

	const [nextUrl, setNextUrl] = useState("");

	const [prevUrl, setPrevUrl] = useState("");

	// fetch all pokemon data fro api
	const getAllPokemon = async () => {
		setShowReset(false);
		setLoadingData(true);
		setFilterName("");
		await axios
			.get(url)
			.then((response) => {
				if (response) {
					setNextUrl(response?.data?.next);
					setPrevUrl(response?.data?.previous);
					sortPokemonData(response?.data?.results);
					setLoadingData(false);
				}
			})
			.catch(function (error) {
				if (error.response) {
				}
			});
	};

	// fetch each pokemon data based on the url and sort the data in an inreasing order based on id
	const sortPokemonData = async (res) => {
		res.map(async (item) => {
			const result = await axios.get(item.url);
			setPokemonData((state) => {
				state = [...state, result.data];
				state.sort((a, b) => (a.id > b.id ? 1 : -1));
				const uniqueObjects = [
					...new Map(state.map((item) => [item.id, item])).values(),
				];

				return uniqueObjects;
			});
		});
	};

	//filter pokemon data based on name inputed in the search field
	const filterPokemonName = (name) => {
		let newArray = pokemonData.filter((item) =>
			item.species.name.includes(name.toLowerCase())
		);
		setPokemonData(newArray);
		setShowReset(true);
	};

	//search pokemon data based on name inputed in the search field
	const searchPokemon = () => {
		setLoading(true);
		BaseRoutesService.searchMethod(pokemonName)
			.then((response) => {
				if (response) {
					setPokemonAvailable(true);
					setPokemonDetails({
						name: pokemonName,
						species: response?.data.species.name,
						img: response?.data.sprites.front_default,
						type: response?.data.types[0].type.name,
						number: response?.data?.id,
						attack: response?.data?.stats[1].base_stat,
						defense: response?.data?.stats[2].base_stat,
					});
					setLoading(false);
				} else {
					setPokemonAvailable(false);
				}
			})
			.catch(function (error) {
				if (error.response) {
					console.log(error.response);
					setLoading(false);
					setPokemonAvailable(false);
				}
			});
	};

	useEffect(() => {
		getAllPokemon();
	}, [url]);

	return (
		<div className="grid-container" data-testid="parent">
			<div className="grid-item-1">
				<div className="pokemonTop">
					<h3 className="title">Find your pokemon</h3>

					<input
						placeholder="Enter pokemon fullname"
						data-testid="search-input"
						type="text"
						onChange={(event) => {
							event.target.value === ""
								? setPokemonDetails({})
								: setPokemonName(event.target.value);
						}}
					/>
					<button name="Search" onClick={searchPokemon}>
						Search
					</button>
				</div>
				<div className="pokemonBody">
					{loading ? (
						<div role="alert" className="loaderBody">
							<Loader />
						</div>
					) : (
						<>
							{pokemonAvailable ? (
								<>
									<div data-testid="newchild">
										{pokemonName ? (
											<>
												<h4>{pokemonName} </h4>

												<h6>Species: {pokemonDetails?.species}</h6>
												<img src={pokemonDetails?.img} alt={pokemonDetails?.img} />

												<h6>Number: {pokemonDetails?.number}</h6>
												<h6>Type: {pokemonDetails?.type}</h6>
												<h6>Attack: {pokemonDetails?.attack}</h6>
												<h6>Defense: {pokemonDetails?.defense}</h6>
											</>
										) : (
											<>
												<h3>Please enter a pokemon name</h3>
											</>
										)}
									</div>
								</>
							) : (
								<>
									{pokemonName && (
										<>
											<EmptyState />
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
			</div>
			<div className="grid-item">
				<h3 className="headerText">All Pokemons</h3>
				<div className="search">
					<input
						data-testid="filter-input"
						type="text"
						placeholder="Filter pokemon by name"
						value={filterName}
						onChange={(event) => {
							filterPokemonName(event.target.value);
							setFilterName(event.target.value);
						}}
					/>
					{showReset && <button onClick={getAllPokemon}>Reset</button>}
				</div>
				{loadingData ? (
					<div role="alertDialog" className="grid-loader">
						<Loader />
					</div>
				) : (
					<>
						<div className="cardView" data-testid="child">
							{pokemonData.map((data) => {
								return <Card key={data.id} pokemonData={data} />;
							})}
						</div>
						<div className="buttons">
							{prevUrl && (
								<button
									onClick={() => {
										setPokemonData([]);
										setUrl(prevUrl);
									}}
								>
									Previous
								</button>
							)}

							{nextUrl && (
								<button
									onClick={() => {
										setPokemonData([]);
										setUrl(nextUrl);
									}}
								>
									Next
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
export default Home;
