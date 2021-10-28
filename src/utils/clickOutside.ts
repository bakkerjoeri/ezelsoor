/** Dispatch event on click outside of node */
export function clickOutside(node: Node, callback: () => any) {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented
		) {
			callback();
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		update(newCallbackFunction: () => any) {
			callback = newCallbackFunction;
		},
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
