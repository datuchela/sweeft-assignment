import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { BASE_URL, useUsers } from "../hooks/useUsers";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { DetailedUser } from "../components/DetailedUser";
import { FriendList } from "../components/FriendList";

const DetailedUserPage = () => {
	const { userId } = useParams();

	// Memoizing this value to prevent infinite re-renders, I'm sure there are other ways to solve this, but since I have limited time, this will do.
	const url = useMemo(() => {
		if (!userId) return null;
		return new URL(`/user/${userId}`, BASE_URL);
	}, [userId]);

	const { data: user, isLoading, isError } = useFetch<DetailedUserType>(url);

	// Friends
	const [pageNum, setPageNum] = useState(1);

	const {
		users: friends,
		isLoading: isFriendsLoading,
		isLoading: isFriendsError,
		hasNextPage,
		getUsersByPage: getFriendsByPage,
	} = useUsers(userId);

	const { nodeRefCallback } = useIntersectionObserver(() => {
		if (isFriendsLoading) return;
		if (!hasNextPage) return;
		const nextPageNum = pageNum + 1;
		getFriendsByPage(nextPageNum);
		setPageNum(nextPageNum);
	});

	return (
		<main className="p-16 max-w-7xl mx-auto flex flex-col gap-5">
			{isLoading && <div>Loading...</div>}
			{isError && (
				<div>ERROR: Something went wrong while fetching the user</div>
			)}
			{user ? <DetailedUser user={user} /> : "Couldn't fetch the user"}
			<BreadCrumbs />
			<div>
				{isFriendsLoading && <div>Loading friends...</div>}
				{isFriendsError && (
					<div>ERROR: Something went wrong while fetching friends</div>
				)}
				<FriendList
					friends={friends}
					nodeRefCallback={nodeRefCallback}
				/>
			</div>
		</main>
	);
};

export default DetailedUserPage;
