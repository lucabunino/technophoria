let dialog = $state(true);
let idStore = $state();
let itemsStore = $state([]);

export function getCartStore() {
	
	function setDialog(d) {
		dialog = d
	}
	function setIdStore(i) {
		idStore = i
	}
	function setItemsStore(i) {
		itemsStore = i
	}

	return {
		get dialog() {
			return dialog;
		},
		get idStore() {
			return idStore;
		},
		get itemsStore() {
			return itemsStore;
		},
		setDialog,
		setIdStore,
		setItemsStore,
	};
}