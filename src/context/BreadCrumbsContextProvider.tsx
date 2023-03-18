import { createContext, useState } from "react";

export type BreadCrumbType = {
	url: string;
	display: string;
};

export type BreadCrumbContextType = {
	breadCrumbs: BreadCrumbType[];
	setBreadCrumbs: React.Dispatch<BreadCrumbType[]>;
};

export const BreadCrumbsContext = createContext<BreadCrumbContextType>({
	breadCrumbs: [],
	setBreadCrumbs: () => {}, // doing this, so typescript doesn't scream at us.
});

const BreadCrumbsContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumbType[]>([]);

	return (
		<BreadCrumbsContext.Provider value={{ breadCrumbs, setBreadCrumbs }}>
			{children}
		</BreadCrumbsContext.Provider>
	);
};

export default BreadCrumbsContextProvider;
