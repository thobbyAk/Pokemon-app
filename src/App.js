import { GlobalProvider } from "./context/GlobalState";
import Home from "./pages/home/home";

function App() {
	return (
		<GlobalProvider>
			<Home />
		</GlobalProvider>
	);
}

export default App;
