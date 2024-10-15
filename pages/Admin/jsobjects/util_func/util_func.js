export default {
	defaultTab: 'Announcements',

	setDefaultTab: (newTab) => {
		this.defaultTab = newTab;
		console.log(newTab)
		users_table
	},
	translateStatusCd: (code)=>{
		let status = ''
		switch(code){
			case '000': 
				status = 'Awaiting Approval';
				break;
			case '001':
				status = 'Approved';
				break;
			case '003':
				status = 'Declined';
				break;
		}
		return status
	},
	operational: 
	[
		{
			"name": "Operational",
			"code": true
		},
		{
			"name": "Maintenance",
			"code": false
		}
	]
	,
	isOperational: (isTrue) => {

	},

	formatDate: (data) =>{
		const date = new Date(data);

		return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${
		date.getDate().toString().padStart(2, '0')}/${
		date.getFullYear().toString().slice(-2)} - ${
		date.getHours().toString().padStart(2, '0')}:${
		date.getMinutes().toString().padStart(2, '0')}`
	},

	_2023 : [
		{
			"x": "Jan",
			"y": 63
		},
		{
			"x": "Feb",
			"y": 30
		},
		{
			"x": "Mar",
			"y": 22
		},
		{
			"x": "Apr",
			"y": 73
		},
		{
			"x": "May",
			"y": 111
		},
		{
			"x": "Jun",
			"y": 159
		},
		{
			"x": "Jul",
			"y": 55
		},
		{
			"x": "Aug",
			"y": 22
		},
		{
			"x": "Sept",
			"y": 34
		},
		{
			"x": "Oct",
			"y": 44
		},
		{
			"x": "Nov",
			"y": 23
		},
		{
			"x": "Dec",
			"y": 123
		}
	],
	_2024 : [
		{
			"x": "Jan",
			"y": 74
		},
		{
			"x": "Feb",
			"y": 26
		},
		{
			"x": "Mar",
			"y": 44
		},
		{
			"x": "Apr",
			"y": 88
		},
		{
			"x": "May",
			"y": 143
		},
		{
			"x": "Jun",
			"y": 92
		},
		{
			"x": "Jul",
			"y": 46
		},
		{
			"x": "Aug",
			"y": 32
		},
		{
			"x": "Sept",
			"y": 21
		},
		{
			"x": "Oct",
			"y": 27
		},
		{
			"x": "Nov",
			"y": 56
		},
		{
			"x": "Dec",
			"y": 98
		}
	],

	defaultYear: this._2024,

	setYear: (newYear) => {
		if(newYear === '_2023'){
			this.defaultYear = this._2023
		}else this.defaultYear = this._2024

	}
}