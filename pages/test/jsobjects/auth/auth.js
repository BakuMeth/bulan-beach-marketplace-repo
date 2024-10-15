export default {
	signIn: () => {
		return sign_in.run()
			.then(data =>{
			delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i])
			})
		})
			.then(() => navigateTo('App'));
	},
	continue: async () => {
		if(!appsmith.URL.fullPath.includes('#access_token=')) return;
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=');
			storeValue(key, value);
		});
		navigateTo('App');
	}
}