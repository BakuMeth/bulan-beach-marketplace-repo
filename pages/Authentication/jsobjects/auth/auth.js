export default {

	defaultTab: 'Sign In',

	setDefaultTab: (newTab) => {
		this.defaultTab = newTab;
	},
	getUserData: async () =>{
		try {
			const data = await get_user_by_id.run();
			const userFName = data[0].first_name;
			const userLName = data[0].last_name;
			const userEmail = data[0].email;
			const userProfile = data[0].profile;
			storeValue("userEmail", userEmail);
			storeValue("userProfile", userProfile);
			storeValue("userFName", userFName);
			storeValue("userLName", userLName);
		} catch (error) {
			showAlert('Error fetching user data.', 'error');
		}
	},
	signUp: async () =>{
		if(!sign_up_first_name.isValid || !sign_up_last_name.isValid || 
			 !sign_up_email.isValid || !sign_up_phone_number.isValid || !sign_up_address.isValid){
			showAlert('All input fields are required. Please enter a valid value in the fields', 'error');
			return;
		}
		try {
			const data = await sign_up.run();
			const userID = data.user.id;
			delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			});
			storeValue("userID", userID);
			storeValue("isSession", true);
			await this.getUserData();
			showAlert('Registration successful', 'success');
			navigateTo('Dashboard');
		} catch (error) {
			showAlert('An error occurred during account registration. Please try again.', 'error');
		}
	},
	signIn: async () => {
		if(!sign_in_email.isValid) {
			showAlert('Please enter an email address in valid format', 'error');
			return;
		}
		if(!sign_in_password.isValid) {
			showAlert('Password is required', 'error');
			return;
		}
		try {
			const data = await sign_in.run();

			const userID = data.user.id;
			delete data.user;
			Object.keys(data).forEach(i => {
				storeValue(i, data[i]);
			});
			storeValue("userID", userID);
			storeValue("isSession", true);
			await this.getUserData();
			showAlert('Sign-in successful', 'success');
			navigateTo('Dashboard');

		} catch (error) {
			showAlert('Invalid credentials', 'error');
		}
	},
	// When token key is detected on url, Redirect to Dashboard Page
	continue: async () => {
		if(!appsmith.URL.fullPath.includes('#access_token=')) return;
		appsmith.URL.fullPath.split('#')[1].split('&').forEach(i => {
			const [key, value] = i.split('=');
			storeValue(key, value);
		});
		navigateTo('Dashboard');
	}
}