import UserCard from "./UserCard";

type FriendListProps = {
	friends: UserType[];
	nodeRefCallback: (node: Element | null) => void;
};

export const FriendList = ({ friends, nodeRefCallback }: FriendListProps) => {
	const content = friends?.map((user, index) => {
		if (index === friends.length - 1) {
			return (
				<UserCard
					ref={nodeRefCallback}
					key={user.id}
					user={user}
				/>
			);
		}
		return (
			<UserCard
				key={user.id}
				user={user}
			/>
		);
	});

	return (
		<div className="max-w-7xl mx-auto py-8">
			<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">{content}</div>
		</div>
	);
};
