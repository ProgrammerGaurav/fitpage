import { useState, useEffect } from "react";
import "./App.css";
import ChartsList from "./components/ChartsList";
import ChartDetail from "./components/ChartDetail";
import ChartVariable from "./components/ChartVariable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	const [scans, setScans] = useState([]);

	useEffect(() => {
		fetch("https://mobile-app-challenge.herokuapp.com/data")
			.then((res) => res.json())
			.then((data) => setScans(data));
	}, []);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<ChartsList scans={scans} />} />
					<Route path="/:id" element={<ChartDetail scans={scans} />} />
					<Route path="/:id/:criteria/:va" element={<ChartVariable scans={scans} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
