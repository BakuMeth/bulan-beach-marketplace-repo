export default {
	bucket: 'media_bucket',
	beachID: '',
	
	createNewBeach: async ()=>{
		if(featured_photos_filepicker.files.length < 6) {
			showAlert('Please select Six images to upload.', 'error');
			return
		}
		let beachID = '';
		beach_util_func.isProcessing = true;
		
		// Create new Beach in the Database
		if(!beach_util_func.isBeachProfileCreated){
			try{
				const response = await add_new_beach.run({
					name: beach_name.text,
					email: email.text,
					phone_number: phone_number.dialCode + phone_number.value,
					address: address.text,
					description: beach_description.text
				});
				beachID = response[0].id
				beach_util_func.isBeachProfileCreated = true;
				this.beachID = beachID;
				showAlert('Beach profile created.', 'success');
			}catch(error){
				showAlert('Error creating beach profile.', 'error');
				beach_util_func.isProcessing = false;
				return
			}
		}
		// Upload photos to the storage and saving its storage metadata
		// to Database one photo at a time
		try{
			for (const file of featured_photos_filepicker.files) {
				await upload_featured_photos.run({
					bucket: this.bucket,
					path: 'beach/' + beachID + '/Featured',
					file: file,
					file_name: file.name,
					content_type: file.type
				});
				await add_beach_asset.run({
					beachID: beachID,
					file_name: file.name,
					bucket: this.bucket,
					path: 'beach/' + beachID + '/Featured'
				})
			}
			beach_util_func.isFeaturedPhotosUploaded = true;
			showAlert('Featured photos uploaded.', 'success');
    }catch(error){
			showAlert('Error uploading beach photos.', 'error');
			beach_util_func.isProcessing = false;
			return
    }
		
		beach_util_func.isProfileComplete = true;
		beach_util_func.isProcessing = false;
	},


	createNewUnit: async () => {
		unit_util_func.isProcessing = true;
		const currItem = unit_list.triggeredItem.id;
		const beachID = this.beachID;
		let unitID = '';
		
		// Create the unit to the Database
		if(!unit_util_func.isUnitCreated){
			try{
				const response = await add_beach_unit.run({
					beachID: beachID,
					name: unit_util_func.metadata[currItem].name,
					rate: unit_util_func.metadata[currItem].rate,
					details: unit_util_func.metadata[currItem].details
				})
				unitID = response[0].id
				unit_util_func.isUnitCreated = true;
				showAlert('Unit created successfully.', 'success');
			}catch(error){
				showAlert('Error creating unit.', 'error');
				unit_util_func.isProcessing = false;
				return
			}
		}

		// Upload photos to the storage and saving its storage metadata
		// to Database one photo at a time
		try{
			for (const file of unit_photos_filepicker.files) {
				await upload_unit_photos.run({
					bucket: this.bucket,
					path: 'beach/' + beachID + '/Unit/' + unitID,
					file: file,
					file_name: file.name,
					content_type: file.type
				});
				await add_unit_asset.run({
					unitID: unitID,
					file_name: file.name,
					bucket: this.bucket,
					path: 'beach/' + beachID + '/Unit/' + unitID
				}) 
			}
			showAlert('Unit photos uploaded.', 'success');
    }catch(error){
			showAlert('Error uploading unit photos.', 'error');
			unit_util_func.isProcessing = false;
			return
    }
		
		unit_util_func.metadata[currItem].complete = true;
		unit_util_func.isUnitCreated = false;
		unit_util_func.isProcessing = false;
	},
}