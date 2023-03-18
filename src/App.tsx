import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BreadCrumbsContextProvider from "./context/BreadCrumbsContextProvider";
import DetailedUserPage from "./routes/DetailedUserPage";
import HomePage from "./routes/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/user/:userId",
				element: <DetailedUserPage />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<BreadCrumbsContextProvider>
				<RouterProvider router={router} />
			</BreadCrumbsContextProvider>
		</>
	);
}

export default App;
