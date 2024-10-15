export default {
	defaultBeachName: 'BEACH_NAME',
	defaultOwnerName: 'OWNER_NAME',
	defaultBeachAddress: 'BEACH_ADDRESS',
	defaultBeachDescription: 'BEACH_DESCRIPTION',

	getBeachData: async ()=>{
		const response = await get_beach_data.run({
			beachID: appsmith.URL.queryParams.beachID
		})
		const data = response[0];

		this.defaultBeachName = data.name;
		this.defaultOwnerName = data.owner_name;
		this.defaultBeachAddress = data.address;
		this.defaultBeachDescription = data.description;

		console.log(response)
	},
	getFeaturedPhotosURLs: async () => {
		const response = await get_featured_photos_data.run({
			beachID: appsmith.URL.queryParams.beachID
		})
		const urls = response.map(item => item.file_url);
		return urls;
	},

	unitCollageData: [],
	unitReserveData: [],

	getBeachUnitData: async () => {
		const response = await get_beach_unit.run({
			beachID: appsmith.URL.queryParams.beachID
		});
		const updatedResponse = await Promise.all(response.map(async (data) => {
			data.imageURL = await this.getUnitImageURL(data.id);
			return data;
		}));
		this.unitCollageData = this.createUnitCollageData(updatedResponse);
		this.unitReserveData = this.createUnitReserveData(updatedResponse);
		console.log(this.unitReserveData);
	},

	getUnitImageURL: async (id) => {
		const fileURL = [];
		const response = await get_unit_asset_url.run({
			unit_id: id
		});
		response.forEach(data => {
			fileURL.push(data.file_url);
		});
		return fileURL;
	},
	createUnitCollageData: (data) =>{
		return data.map(unit => {
			return {
				name: `<h3>${unit.name}</h3>`,
				rate: `<h4>${unit.rate}</h4>`,
				description: `<p>${unit.details}</p>`,
				imageDivs: unit.imageURL.map((url, index) => 
																		 `<div class="gallery-item vertical"><img src="${url}" alt="Image ${index + 1}" "></div>`
																		)
			};
		})
	},
	createUnitReserveData: (data) =>{
		return data.map(unit => {
			return {
				name: unit.name,
				id: unit.id,
			}
		})
	}
}