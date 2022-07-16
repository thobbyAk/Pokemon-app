import React from "react";
import Card from "../../components/card/card";
import EmptyState from "../../components/emptySate/empyState";
import Loader from "../../components/loader/loader";
import BaseRoutesService from "../../services/routes.ts";
import axios from "axios";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonName, setPokemonName] = useState("");

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

	const getAllPokemon = async () => {
		setLoadingData(true);
		await axios
			.get(url)
			.then((response) => {
				if (response) {
					// console.log("GRE", response?.data);
					setNextUrl(response?.data?.next);
					setPrevUrl(response?.data?.previous);
					sortPokemonData(response?.data?.results);
					setLoadingData(false);
				}
			})
			.catch(function (error) {
				if (error.response) {
					// console.log("response");
				}
			});
	};

	const sortPokemonData = async (res) => {
		res.map(async (item) => {
			const result = await axios.get(item.url);
			setPokemonData((state) => {
				state = [...state, result.data];
				state.sort((a, b) => (a.id > b.id ? 1 : -1));
				const uniqueObjects = [
					...new Map(state.map((item) => [item.id, item])).values(),
				];
				// console.log("uniqueObjects,", uniqueObjects);

				return uniqueObjects;
			});
		});
	};

	const filterPokemonName = (name) => {
		let newArray = pokemonData.filter((item) =>
			item.species.name.includes(name.toLowerCase())
		);
		setPokemonData(newArray);
		// console.log(newArray);
	};

	const searchPokemon = () => {
		setLoading(true);
		BaseRoutesService.searchMethod(pokemonName)
			.then((response) => {
				// console.log("polk", response);
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
									<div className="">
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
						placeholder="Search"
						onChange={(event) => {
							filterPokemonName(event.target.value);
						}}
					/>
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
