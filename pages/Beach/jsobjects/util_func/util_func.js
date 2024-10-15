export default {
	collapseTab: (tab) =>{
		switch(tab){
			case "tab_name":
				this.defaultTab_email = 'Tab 1';
				this.defaultTab_phone = 'Tab 1';
				this.defaultTab_address = 'Tab 1';
				break;
			case "tab_email":
				this.defaultTab_name = 'Tab 1';
				this.defaultTab_phone = 'Tab 1';
				this.defaultTab_address = 'Tab 1';
				break;
			case "tab_phone":
				this.defaultTab_email = 'Tab 1';
				this.defaultTab_name = 'Tab 1';
				this.defaultTab_address = 'Tab 1';
				break;
			case "tab_address":
				this.defaultTab_email = 'Tab 1';
				this.defaultTab_phone = 'Tab 1';
				this.defaultTab_name = 'Tab 1';
				break;
			default:
				break;
		}
	},

	defaultTab_name: 'Tab 1',
	defaultTab_email: 'Tab 1',
	defaultTab_phone: 'Tab 1',
	defaultTab_address: 'Tab 1',

	setDefaultTab_name: (newTab) => {
		this.defaultTab_name = newTab;
		if(newTab === 'Tab 2'){
			this.collapseTab('tab_name');
		}else if(newTab === 'Tab 1'){
			resetWidget("update_user_fname");
			resetWidget("update_user_lname");
		}
	},
	setDefaultTab_email: (newTab) => {
		this.defaultTab_email = newTab;
		if(newTab === 'Tab 2'){
			this.collapseTab('tab_email');
		}else if(newTab === 'Tab 1'){
			resetWidget("update_user_email");
		}
	},
	setDefaultTab_phone: (newTab) => {
		this.defaultTab_phone = newTab;
		if(newTab === 'Tab 2'){
			this.collapseTab('tab_phone');
		}else if(newTab === 'Tab 1'){
			resetWidget("update_user_phone");
		}
	},
	setDefaultTab_address: (newTab) => {
		this.defaultTab_address = newTab;
		if(newTab === 'Tab 2'){
			this.collapseTab('tab_address');
		}else if(newTab === 'Tab 1'){
			resetWidget("update_user_address");
		}
	}
}