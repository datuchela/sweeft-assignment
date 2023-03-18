import { useContext } from "react";
import { BreadCrumbsContext } from "../context/BreadCrumbsContextProvider";

export const useBreadCrumbs = () => {
	return useContext(BreadCrumbsContext);
};
