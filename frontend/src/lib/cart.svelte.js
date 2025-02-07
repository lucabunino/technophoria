let dialog = $state(true);
let id = $state();
let items = $state([]);
let checkoutUrl = $state();

export function getCartStore() {
	
	function setDialog(d) {
		dialog = d
	}
	function setId(i) {
		id = i
	}
	function setItems(i) {
		items = i
	}
	function setCheckoutUrl(c) {
		checkoutUrl = c
	}

	return {
		get dialog() {
			return dialog;
		},
		get id() {
			return id;
		},
		get items() {
			return items;
		},
		get checkoutUrl() {
			return checkoutUrl;
		},
		setDialog,
		setId,
		setItems,
		setCheckoutUrl,
	};
}