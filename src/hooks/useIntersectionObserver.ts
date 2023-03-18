import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = 0;

export const useIntersectionObserver = (
	callback: () => void,
	options?: IntersectionObserverInit
) => {
	const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
	const threshold = options?.threshold ?? DEFAULT_THRESHOLD;

	const rootRef = useRef<Element | null>(null);
	const nodeRef = useRef<Element | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const [hasScrolled, setHasScrolled] = useState(false);

	const handleScrollEvent = () => setHasScrolled(true);

	useEffect(() => {
		// Listening for scroll event to prevent unnecessary fetches on initial content load.
		window.addEventListener("scroll", handleScrollEvent);

		return () => {
			window.removeEventListener("scroll", handleScrollEvent);
			if (observerRef.current) observerRef.current.disconnect();
			observerRef.current = null;
		};
	}, []);

	const initObserver = useCallback(() => {
		if (observerRef.current) observerRef.current.disconnect();
		observerRef.current = null;

		const node = nodeRef.current;
		if (!node) return;
		const root = rootRef.current;
		const options = { root, rootMargin, threshold };

		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			if (!hasScrolled) return;
			callback();
		}, options);

		observer.observe(node);
		observerRef.current = observer;
	}, [callback, rootMargin, threshold]);

	const nodeRefCallback = useCallback(
		(node: Element | null) => {
			nodeRef.current = node;
			initObserver();
		},
		[initObserver]
	);

	const rootRefCallback = useCallback(
		(rootNode: Element | null) => {
			rootRef.current = rootNode;
			initObserver();
		},
		[initObserver]
	);

	return { nodeRefCallback, rootRefCallback };
};
