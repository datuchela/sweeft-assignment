import { useEffect, useState } from "react";

export const useFetch = <T>(url: string | URL | null) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (!url) return;
		setIsLoading(true);
		setIsError(false);

		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const res = await fetch(url, { signal: controller.signal });
				const data = (await res.json()) as T;
				setData(data);
			} catch (err) {
				if (controller.signal.aborted) return;
				setIsError(true);
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, isLoading, isError };
};
