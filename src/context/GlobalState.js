import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
	pokemons: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	return (
		<GlobalContext.Provider
			value={{
				pokemon: state.pokemon,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
