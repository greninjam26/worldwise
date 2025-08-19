import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./index.css";

import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				{/* this is only an additional to the JSX, there are more element outside the <BrowserRouter>, then they will always stay in the page */}
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="login" element={<Login />} />
						<Route path="app" element={<AppLayout />}>
							{/* this is the alternative of navigating when useNavigate() will not work */}
							<Route index element={<Navigate replace to="cities" />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
