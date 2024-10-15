export default {

	// UNIT CREATION
	isUnitCreated: false,
	isProcessing: false,

	isRequiredFieldsComplete: () =>{
		
		if(!unit_name.isValid) return false
		if(!unit_rate.isValid) return false
		if(!unit_details.isValid) return false
		return true;
	},

	resetUnitCreateForm: ()=> {
		this.metadata = [
			{
				"id": "0",
				"name": "name",
				"details": "details",
				"rate": "price",
				"complete": false
			}
		];
		this.currentUnitListIndex = 0;
		this.currentIndex = 0;
	},

	currentUnitListIndex: 0,
	currentIndex: 0,

	metadata: [
		{
			"id": "0",
			"name": "name",
			"details": "details",
			"rate": "price",
			"complete": false
		}
	],

	addToList: () => {
		if(this.metadata[this.currentIndex].complete === false) return
		this.currentIndex++;
		this.currentUnitListIndex++;
		if (this.currentUnitListIndex >= 2) this.currentUnitListIndex = 0;
		const newBlock = {
			"id": this.currentIndex,
			"name": "name" + this.currentIndex,
			"details": "details"  + this.currentIndex,
			"rate": "rate"  + this.currentIndex,
			"complete": false
		};
		this.metadata.push(newBlock);
		this.isUnitCreated = false;
	},

	removeAndUpdateIds: () => {
		if(this.currentIndex <= 0 || unit_list.triggeredItem.complete == true) return
		if (this.currentUnitListIndex > 0) this.currentUnitListIndex--;
		// Remove the object with the specified id
		const indexToRemove = this.metadata.findIndex(item => item.id === unit_list.triggeredItem.id);
		if (indexToRemove !== -1) {
			this.metadata.splice(indexToRemove, 1);
		}

		// Update the IDs of the remaining objects
		this.metadata.forEach(item => {
			if (parseInt(item.id) > parseInt(unit_list.triggeredItem.id)) {
				item.id = (parseInt(item.id) - 1).toString();
			}
		});
		this.currentIndex--
		this.isUnitCreated = true;
	},

	updateUnitName: ()=>{
		let idx = this.currentUnitListIndex
		this.metadata[idx].name = unit_list.currentItemsView[idx].unit_name.text
	},
	updateUnitRate: ()=>{
		let idx = this.currentUnitListIndex
		this.metadata[idx].rate = unit_list.currentItemsView[idx].unit_rate.text
	},
	updateUnitDetails: ()=>{
		let idx = this.currentUnitListIndex
		this.metadata[idx].details = unit_list.currentItemsView[idx].unit_details.text
	},


	// MAIN
	isUnitImageProcessing: false,

	deleteUnitImage: async ()=>{
		if(beach_util_func.mainUnitData.length <= 1 ) return
		this.isUnitImageProcessing = true;
		const triggeredListItem = unit_photos_list.triggeredItem;
		try{
			await delete_single_image.run({
				bucket: triggeredListItem.bucket,
				path: triggeredListItem.path,
				file_name: triggeredListItem.file_name
			});
		}catch(error){
			showAlert('Error while deleting image from the storage', 'error');
			this.isUnitImageProcessing = false;
			return;
		}
		try{
			await delete_unit_asset_by_id.run({
				id: triggeredListItem.id
			})
		}catch(error){
			showAlert('Error while deleting unit asset from DB', 'error');
			this.isUnitImageProcessing = false;
			resetWidget('unit_photos_list', true)
			return;
		}
		beach_util_func.mainUnitData = beach_util_func.mainUnitData.filter(
			item => item.id !== triggeredListItem.id);
		showAlert('Image successfully deleted', 'success');
		resetWidget('unit_photos_list', true)
		this.isUnitImageProcessing = false;
	},

	addNewUnitImage: async ()=>{
		this.isUnitImageProcessing = true;
		const triggeredListItem = unit_photos_list.triggeredItem;
		try{
			for (const file of add_new_unit_image_filepickr.files) {
				await upload_unit_photos.run({
					bucket: triggeredListItem.bucket,
					path: triggeredListItem.path,
					file: file,
					file_name: file.name,
					content_type: file.type
				});
				await add_unit_asset.run({
					unitID: triggeredListItem.unit_id,
					file_name: file.name,
					bucket: triggeredListItem.bucket,
					path: triggeredListItem.path
				}) 
			}
		}catch(error){
			showAlert('Error uploading unit photos.', 'error');
			resetWidget('unit_photos_list', true);
			this.isUnitImageProcessing = false;
			return
		}
		showAlert('Unit images uploaded.', 'success');
		beach_util_func.loadUnitImageURL(unit_table.selectedRow.id);
		resetWidget('unit_photos_list', true)
		this.isUnitImageProcessing = false;
	},

	isUnitAddProcessing: false,
	isAddUnitRequiredFieldsComplete: () =>{
		if(!add_new_unit_name.isValid) return false
		if(!add_new_unit_rate.isValid) return false
		if(!add_new_unit_details.isValid) return false
		return true;
	},

	addNewUnit: async () => {
		this.isUnitAddProcessing = true;
		const beachID = beach_table.selectedRow.id;
		const bucket = 'media_bucket'
		let unitID = '';

		// Create the unit to the Database
		try{
			const response = await add_beach_unit.run({
				beachID: beachID,
				name: add_new_unit_name.text,
				rate: add_new_unit_rate.text,
				details: add_new_unit_details.text
			})
			unitID = response[0].id
		}catch(error){
			showAlert('Error creating unit to DB.', 'error');
			this.isUnitAddProcessing = false;
			return
		}

		// Upload photos to the storage and saving its storage metadata
		// to Database one photo at a time
		try{
			for (const file of add_new_unit_filepicker.files) {
				await upload_unit_photos.run({
					bucket: bucket,
					path: 'beach/' + beachID + '/Unit/' + unitID,
					file: file,
					file_name: file.name,
					content_type: file.type
				});
				await add_unit_asset.run({
					unitID: unitID,
					file_name: file.name,
					bucket: bucket,
					path: 'beach/' + beachID + '/Unit/' + unitID
				}) 
			}
		}catch(error){
			showAlert('Error while uploading assets.', 'error');
			this.isUnitAddProcessing = false;
			return
		}
		showAlert('Unit added successfully.', 'success');
		resetWidget('add_new_unit_modal', true)
		this.isUnitAddProcessing = false;
		beach_util_func.loadUnits(beach_table.selectedRow.id)
	},

	isUnitDeleteProcessing: false,
	deleteUnit: async () => {
		this.isUnitDeleteProcessing = true;

		async function deleteUnitAssets() {
			try {
				const response = await get_unit_asset_url_by_unit_id.run({
					unit_id: unit_table.selectedRow.id
				});

				const deletePromises = response.map(asset => {
					return delete_single_image.run({
						bucket: asset.bucket,
						path: asset.path,
						file_name: asset.file_name
					}).catch(error => {
						if (delete_single_image.data.statusCode === '404') {
							console.warn(`Asset not found in storage: ${asset.file_name}, skipping deletion.`);
						} else {
							throw error; // Re-throw the error if it's not a 404
						}
					});
				});
				await Promise.all(deletePromises);
			} catch (error) {
				if (error.status === 404) {
					console.warn('No assets found for this unit, skipping asset deletion.');
				} else {
					throw error;
				}
			}
		}

		try {
			await deleteUnitAssets();
			await delete_unit_by_id.run({
				id: unit_table.selectedRow.id
			});
			showAlert('Unit successfully deleted', 'success');
		} catch (error) {
			showAlert('Error while deleting unit from DB', 'error');
		} finally {
			this.isUnitDeleteProcessing = false;
			beach_util_func.loadUnits(beach_table.selectedRow.id)
		}
	},

	updateUnitInfo: async ()=>{
		try{
			await update_unit.run({
				id: unit_table.selectedRow.id,
				name: edit_unit_name.text,
				rate: edit_unit_rate.text,
				details: edit_unit_details.text,
			});
    }catch(error){
			showAlert('Error while updating unit info', 'success');
			return;
    }
		showAlert('Unit updated successfully', 'success');
		beach_util_func.loadUnits(beach_table.selectedRow.id);
	}
}