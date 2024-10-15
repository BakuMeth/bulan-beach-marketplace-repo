export default {
	// PROFILE CREATION
	isProfileComplete: false,
	isBeachProfileCreated: false,
	isFeaturedPhotosUploaded: false,
	isProcessing: false,
	isRequiredFieldsComplete: () =>{
		if(!beach_name.isValid) return false
		if(!email.isValid) return false
		if(!phone_number.isValid) return false
		if(!address.isValid) return false
		if(beach_description.text.length < 1) return false
		return true;
	},

	resetBeachCreateForm: ()=> {
		resetWidget('beach_name');
		resetWidget('email');
		resetWidget('phone_number');
		resetWidget('address');
		resetWidget('beach_description');
		resetWidget('featured_photos_filepicker')
	},

	// MAIN
	defaultBeachtAb: 'EMPTY',
	mainBeachData: {},
	mainUnitData: [],
	isShowUnits: false,
	beachTableSelectedRow: '-1',	
	setDefaultBeachTab: (newTab) => {

	},

	status: 
	[
		{
			"name": "Operational",
			"code": true
		},
		{
			"name": "Maintenance",
			"code": false
		}
	],

	setBeachTableSelectedRow: () =>{
		const idx = beach_table.triggeredRowIndex;
		beach_table.setSelectedRowIndex(idx);
	},

	loadUnits: async (id) => {
		if(beach_table.selectedRowIndex === -1) return
		this.isShowUnits = true;
		const response = await get_beach_unit.run({
			beach_id: id
		});
		this.mainBeachData = response
		unit_table.setData(this.mainBeachData)
		console.log("loading Units")
	},
	loadUnitImageURL: async (id) =>{
		let response = await get_unit_asset_url_by_unit_id.run({
			unit_id: id
		});
		this.mainUnitData.splice(0, this.mainUnitData.length, ...response);
		showModal(unit_image_edit_modal.name)
	},

	featuredImages: [],
	getFeaturePhotos: async (beachID)=>{
		showModal(feature_image_edit_modal.name)
		try{
			const response = await get_beach_asset_url.run({
				beach_id: beachID
			});
			this.featuredImages = response;
		}catch(error){
			showAlert('Error fetching featured image', 'error');
		}
	},

	updateBeachInfo: async () =>{
		try{
			await update_beach.run({
				id : beach_table.selectedRow.id,
				name : edit_beach_name.text,
				email : edit_beach_email.text,
				phone_number : edit_beach_phone_number.dialCode + edit_beach_phone_number.value,
				address : edit_beach_address.text,
				description : edit_beach_description.text
			})
		}catch(error){
			showAlert('Error while updating beach info.', 'error');
			return
		}
		util_func.checkOwnedBeach()
		showAlert('Beach info updated successfully', 'success');
	},

	updateBeachStatus: async () =>{
		try{
			await update_beach_status.run({
				id : beach_table.selectedRow.id,
				operational : beach_change_status_select.selectedOptionValue
			})
		}catch(error){
			showAlert('Error while updating beach status', 'error');
			return
		}
		util_func.checkOwnedBeach()
		showAlert('Beach status updated successfully', 'success');
	},

	replaceFeaturedPhotots: async ()=>{
		const triggeredListItem = featured_image_list.triggeredItem
		const filepickr = replace_featured_filedpickr.files[0]
		try{
			await upload_featured_photos.run({
				bucket: triggeredListItem.bucket,
				path: triggeredListItem.path,
				file: filepickr,
				file_name: filepickr.name,
				content_type: filepickr.type
			});
		}catch(error){
			showAlert('Error while adding the new image', 'error');
			resetWidget('featured_image_list', true)
			return
		}
		try{
			await update_beach_asset_by_id.run({
				id : triggeredListItem.id,
				file_name : filepickr.name,
				bucket : triggeredListItem.bucket,
				path : triggeredListItem.path,
			});
		}catch(error){
			showAlert('Error while updating image data in DB', 'error')
			resetWidget('featured_image_list', true)
			return
		}
		try{
			await delete_single_image.run({
				bucket: triggeredListItem.bucket,
				path: triggeredListItem.path,
				file_name: triggeredListItem.file_name
			})
		}catch(error){
			showAlert('Error while deleting old image', 'error')
			resetWidget('featured_image_list', true)
			return
		}
		showAlert('Image replaced successfully', 'success')
		this.getFeaturePhotos(triggeredListItem.beach_id)
		resetWidget('featured_image_list', true)
	}
}
