import { Link } from "react-router-dom";
import { useBreadCrumbs } from "../hooks/useBreadCrumbs";

export const BreadCrumbs = () => {
	const { breadCrumbs } = useBreadCrumbs();

	return (
		<div>
			{breadCrumbs.map((breadCrumb, index) => (
				<span key={breadCrumb.url + index}>
					<Link
						className="underline text-blue-700"
						to={breadCrumb.url}
					>
						{breadCrumb.display}
					</Link>
					{breadCrumbs.length > 1 && index !== breadCrumbs.length - 1
						? " > "
						: ""}
				</span>
			))}
		</div>
	);
};
