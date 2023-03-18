import { forwardRef } from "react";
import { useBreadCrumbs } from "../hooks/useBreadCrumbs";
import { useNavigate } from "react-router-dom";

type UserProps = {
	user: UserType;
};

const UserCard = forwardRef<HTMLElement, UserProps>(({ user }, ref) => {
	const { id, name, lastName, prefix, title, imageUrl } = user;

	const fullName = `${prefix} ${name} ${lastName}`;

	const navigate = useNavigate();
	const { breadCrumbs, setBreadCrumbs } = useBreadCrumbs()!;

	const handleCardClick = () => {
		// Could also set the state with callback function down here.
		setBreadCrumbs([
			...breadCrumbs,
			{ url: `/user/${user.id}`, display: fullName },
		]);
		navigate(`/user/${id}`);
	};

	return (
		<button
			type="button"
			className="border border-gray-500"
			onClick={handleCardClick}
			ref={ref as React.ForwardedRef<HTMLButtonElement>}
		>
			<div className="w-full h-auto overflow-hidden">
				<img
					className="w-full h-full object-cover"
					src={`${imageUrl}?id=${id}`} // In the example different users had different pictures, using this "hacky" way to achieve that.
					alt="user image"
				/>
			</div>
			<div className="px-3 py-2">
				<strong></strong>
				<div>{title}</div>
			</div>
		</button>
	);
});

export default UserCard;
