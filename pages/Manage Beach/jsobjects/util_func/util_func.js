export default {
	defaultTab: 'Beach Info',

	setDefaultTab: (newTab) => {
		this.defaultTab = newTab;
	},
	
	defaultMainTab: 'EmptyTab',
		setDefaultMainTab: (newTab) => {
		this.defaultMainTab = newTab;
	},
	checkOwnedBeach: async() =>{
		const response = await get_owned_beach.run({
			userID: appsmith.store.userID
		});
		if(response.length > 0){
			this.setDefaultMainTab('BeachTab')
		}else this.setDefaultMainTab('EmptyTab')
	}
}