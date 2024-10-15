export default {
	client: supabase.createClient('https://ifthncqcxbdnyjcrwhlq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdGhuY3FjeGJkbnlqY3J3aGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzOTU5MzIsImV4cCI6MjA0MTk3MTkzMn0.30s0M78xOKiU-cgHh-n57ItkIF-YQ9fb0w7jrSWsL4U', {
		headers: {
			Authorization: `Bearer ${appsmith.store.access_token}`,
		},
	}),

	deleteBeach: async (beach_Id) => {
		const bucketName = 'media_bucket'

		async function	deleteUnitFiles  (bucketName, beachId, unitId){
			const folderPath = `beach/${beachId}/Unit/${unitId}`;

			// List all files in the unit folder
			const { data: files, error: listError } = await this.client
			.storage
			.from(bucketName)
			.list(folderPath);

			if (listError) {
				console.error('Error listing files:', listError);
				return;
			}

			// Map file names to their full paths
			const filePaths = files.map(file => `${folderPath}/${file.name}`);

			console.log('filePaths', filePaths)

			// Delete all files in the folder
			for (const file of files) {
				const filePath = `${folderPath}/${file.name}`;

				await delete_file.run({
					bucket : bucketName,
					path : filePath
				})

				// const { error: deleteError } = await this.client
				// .storage
				// .from(bucketName)
				// .remove([filePath]);

				// if (deleteError) {
				// console.error(`Error deleting file ${filePath}:`, deleteError);
				// } else {
				// console.log(`File ${filePath} deleted successfully`);
				// }
			}
		}

		async function deleteFeaturedFiles(bucketName, beachId){
			const folderPath = `beach/${beachId}/Featured`;

			// List all files in the Featured folder
			const { data: files, error: listError } = await this.client
			.storage
			.from(bucketName)
			.list(folderPath);

			if (listError) {
				console.error('Error listing files:', listError);
				return;
			}

			// Map file names to their full paths
			const filePaths = files.map(file => `${folderPath}/${file.name}`);

			console.log('filePaths', filePaths)

			// Delete all files in the folder
			for (const file of files) {
				const filePath = `${folderPath}/${file.name}`;

				await delete_file.run({
					bucket : bucketName,
					path : filePath
				})
			}
		}
		const { data: units, error: queryError } = await this.client
		.from('unit')
		.select('id')
		.eq('beach_id', beach_Id);

		if (queryError) {
			console.error('Error querying units:', queryError);
			return;
		}

		for (const unit of units) {
			await deleteUnitFiles(bucketName, beach_Id, unit.id);
		}

		deleteFeaturedFiles(bucketName, beach_Id);
		
		await delete_beach_by_id.run({
			id : beach_Id
		});
		
		util_func.checkOwnedBeach();
		showAlert('Beach data successfully delete', 'success')
	}
}