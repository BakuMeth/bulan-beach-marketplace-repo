export default {
	verifyAccessTokenExpired() {
		console.log(
			"time left",
			( appsmith.store.expires_at - 
			 Math.floor(Date.now() / 1000)) / 60,
			"mins",
		);
		return (
			(Math.floor(Date.now() / 1000)) >
			appsmith.store.expires_at
		);
	},
	async getRefreshToken() {
		try {
			const data = await refreshToken.run()
			if(data){
				delete data.user;
				Object.keys(data).forEach(i => {
					storeValue(i, data[i]);
				});
				storeValue("isSession", true)
				showAlert('Token refresh successful.', 'success');
				await navigateTo('Admin')
			}
		} catch (error) {
			storeValue("isSession", false)
			showAlert('Token refresh error, Please sign in again.', 'error');
			navigateTo('Authentication');
		}
	},
	async onPageLoad () {
		if(appsmith.store.isSession !== true || appsmith.store.userProfile !== 'administrator') navigateTo('Dashboard');
		if(this.verifyAccessTokenExpired()){
			this.getRefreshToken()
		}
	}
}