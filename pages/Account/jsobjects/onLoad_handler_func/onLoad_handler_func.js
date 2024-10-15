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
					navigateTo('App')
				});
				await storeValue("isSession", true)
				navigateTo('Account', {}, 'SAME_WINDOW')
				await get_user_by_id.run()
				showAlert('Token refresh successful.', 'success');
			}
		} catch (error) {
			showAlert('Token refresh error, Please sign in again.', 'error');
			navigateTo('Authentication');
			storeValue("isSession", false)
		}
	},
	async onPageLoad () {
		if(appsmith.store.isSession !== true) navigateTo('Dashboard');
		if(this.verifyAccessTokenExpired()){
			this.getRefreshToken()
		}
	}
}