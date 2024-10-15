export default {
	
	defaultTab: 'Tab 1',
	
	setDefaultTab: (newTab) => {
		this.defaultTab = newTab;
	},
	
	adult: 1,
	child: 0,
	infant: 0,
	pet: 0,
	
	updateGuest:() => {
		let guest = this.adult > 1 ? `${this.adult} Guests ` : `${this.adult} Guest`
		let infant = ''
		let pet = ''
		
		if(this.child > 0) guest = `${this.child + this.adult} Guests`
		
		if(this.infant > 0) infant = this.infant > 1 ? `, ${this.infant} Infants` : `, ${this.infant} Infant`
		
		if(this.pet > 0) pet = this.pet > 1 ? `, ${this.pet} Pets` : `, ${this.pet} Pet`
		
		return `${guest}${infant}${pet}`
	}
}