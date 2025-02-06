let position = $state({ x: 0, y: 0 });

export function getPosition() {
	
	function setPosition(p) {
		position = p
	}

	return {
		get position() {
			return position;
		},
		setPosition,
	};
}