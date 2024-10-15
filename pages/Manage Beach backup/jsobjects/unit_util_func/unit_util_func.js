export default {
	isUnitCreated: false,
	isProcessing: false,
	
	isRequiredFieldsComplete: () =>{
		if(!unit_name.isValid) return false
		if(!unit_rate.isValid) return false
		if(!unit_details.isValid) return false
		return true;
	},

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
		const newBlock = {
			"id": this.currentIndex,
			"name": "name" + this.currentIndex,
			"details": "details"  + this.currentIndex,
			"rate": "rate"  + this.currentIndex,
			"complete": false
		};
		this.metadata.push(newBlock);
	},
	
	removeAndUpdateIds: () => {
		if(this.currentIndex <= 0 || unit_list.triggeredItem.complete == true) return
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
	},
	
	updateUnitName: ()=>{
		this.metadata[unit_list.triggeredItem.id].name = unit_list.currentItemsView[unit_list.triggeredItem.id].unit_name.text
	},
	
		updateUnitRate: ()=>{
		this.metadata[unit_list.triggeredItem.id].rate = unit_list.currentItemsView[unit_list.triggeredItem.id].unit_rate.text
	},
	
			updateUnitDetails: ()=>{
		this.metadata[unit_list.triggeredItem.id].details = unit_list.currentItemsView[unit_list.triggeredItem.id].unit_details.text
	}
}