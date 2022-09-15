import React, { createContext, useReducer } from "react";

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
