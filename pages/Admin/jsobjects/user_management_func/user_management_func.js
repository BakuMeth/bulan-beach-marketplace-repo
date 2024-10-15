export default {
	getAllUsers: async () =>{
		try{
			await get_users.run();
		}catch(error){
			showAlert('Error fetching data', 'error');
		}
	},
	updateUserProfileByID: async () =>{
		try{
			await update_user_profile_by_id.run();
			this.getAllUsers();
		  await closeModal(user_edit_modal.name);
			showAlert('User updated.', 'success');
		}catch(error){
			showAlert('Error updating user data', 'error');
		}
	},
		deleteUserByID: async () =>{
		try{
			await delete_user_by_id.run();
			this.getAllUsers();
			await closeModal(user_edit_modal.name);
			await closeModal(confirm_delete_modal.name);
			showAlert('User deleted.', 'success');
		}catch(error){
			showAlert('Error deleting user data', 'error');
		}
	}
}