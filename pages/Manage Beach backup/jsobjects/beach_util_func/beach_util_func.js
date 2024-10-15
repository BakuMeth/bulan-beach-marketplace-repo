export default {
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
	}
}
