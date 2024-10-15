export default {

	uploadImage: () => {
		FilePicker1.files.forEach(async (file, index) => {
			const response = await this.uploadFileToSupabase(file);
			console.log(response);
		});
	},


	uploadFileToSupabase : async (file) => {
		const response = await fetch(`https://ifthncqcxbdnyjcrwhlq.supabase.co/storage/v1/object/media_bucket/${file.name}`, {
			method: 'POST',
			headers: {
				'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdGhuY3FjeGJkbnlqY3J3aGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzOTU5MzIsImV4cCI6MjA0MTk3MTkzMn0.30s0M78xOKiU-cgHh-n57ItkIF-YQ9fb0w7jrSWsL4U',
				'Authorization': 'Bearer '+ appsmith.store.access_token,
				'Content-Type': 'multipart/form-data'
			},
			body: {
				"file": file,
				"file_name": file.name,
				"content_type": file.type
			}

		});
		return response.json();
	}

}