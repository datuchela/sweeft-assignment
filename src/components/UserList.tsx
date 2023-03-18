import { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useUsers } from "../hooks/useUsers";
import UserCard from "./UserCard";

function UserList() {
	const [pageNum, setPageNum] = useState(1);

	const { users, isLoading, hasNextPage, isError, getUsersByPage } = useUsers();

	const { nodeRefCallback } = useIntersectionObserver(() => {
		if (isLoading) return;
		if (!hasNextPage) return;
		const nextPageNum = pageNum + 1;
		getUsersByPage(nextPageNum);
		setPageNum(nextPageNum);
	});

	if (isError)
		return <div className="text-red-600">ERROR: Something went wrong</div>;

	const content = users?.map((user, index) => {
		if (index === users.length - 1) {
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
		<>
			<main className="max-w-7xl mx-auto py-8">
				<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
					{content}
				</div>
				{isLoading && <div className="text-lg">Loading...</div>}
			</main>
		</>
	);
}

export default UserList;
