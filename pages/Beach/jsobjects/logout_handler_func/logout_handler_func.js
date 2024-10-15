export default {
	logout: async () =>{
		try{
			await logout.run();
			this.deleteStore();
			storeValue("isSession", false);
			navigateTo('Authentication')
		}catch(error){
			showAlert('Error occured during logging out.', 'error');
		}
	},
	deleteStore: () => {
		removeValue("access_token");
		removeValue("token_type");
		removeValue("expires_in");
		removeValue("expires_at");
		removeValue("refresh_token");
		removeValue("type");
		removeValue("provider_token");
		removeValue("userID");
		removeValue("userEmail");
		removeValue("userProfile");
	}
}