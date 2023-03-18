import { useEffect, useState } from "react";

export const BASE_URL =
	"http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/";

export const useUsers = (userId?: string) => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(false);

	// using fetch, could've used axios, but for the sake of this exercise I want to use the least amount of dependencies possible.
	const fetchUsers = async (
		pageNum: number = 1,
		signal?: AbortController["signal"]
	) => {
		setIsLoading(true);
		setIsError(false);

		try {
			let params = `/user/${pageNum}/20`;
			if (userId) {
				params = `/user/${userId}/friends/${pageNum}/20`;
			}
			const url = new URL(params, BASE_URL);
			const res = await fetch(url, {
				signal,
			});
			const data = (await res.json()) as UsersDataType;
			setUsers((prev) => [...prev, ...data.list]);
			setHasNextPage(Boolean(data.list.length));
		} catch (err) {
			if (signal?.aborted) return;
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		fetchUsers(1, controller.signal);

		return () => {
			controller.abort();
		};
	}, []);

	return { getUsersByPage: fetchUsers, users, isLoading, hasNextPage, isError };
};
