export default {
	updateUserNameByID: async () =>{
		if(!update_user_fname.isValid || !update_user_lname.isValid){
			showAlert('Your First and Last name is required', 'error');
			return;
		}
		try{
			await update_user_name_by_id.run();
			await get_user_by_id.run();
			util_func.setDefaultTab_name('Tab 1');
			showAlert('Update Complete.', 'success');
		}catch(error){
			showAlert('Error updating user data', 'error');
		}
	},
	updateUserEmailByID: async () =>{
		if(!update_user_email.isValid){
			showAlert('Invalid email format', 'error');
			return;
		}
		try{
			await update_user_email_by_id.run();
			await get_user_by_id.run();
			util_func.setDefaultTab_email('Tab 1');
			showAlert('Update Complete.', 'success');
		}catch(error){
			showAlert('Error updating user data', 'error');
		}
	},
	updateUserPhoneByID: async () =>{
		if(!update_user_phone.isValid){
			showAlert('Invalid phone number format', 'error');
			return;
		}
		try{
			await update_user_phone_by_id.run();
			await get_user_by_id.run();
			util_func.setDefaultTab_phone('Tab 1');
			showAlert('Update Complete.', 'success');
		}catch(error){
			showAlert('Error updating user data', 'error');
		}
	},
	updateUserAddressByID: async () =>{
		if(!update_user_address.isValid){
			showAlert('Your address is required', 'error');
			return;
		}
		try{
			await update_user_address_by_id.run();
			await get_user_by_id.run();
			util_func.setDefaultTab_address('Tab 1');
			showAlert('Update Complete.', 'success');
		}catch(error){
			showAlert('Error updating user data', 'error');
		}
	}
}