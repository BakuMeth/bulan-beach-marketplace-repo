export default {
  uploadFiles: async () => {
    for (const file of FilePicker1.files) {
      await this.postToSupabase(file);
    }
  },

  postToSupabase: async (file) => {
    console.log(file.name);
    const response = await upload_image_bulk.run({
      file: file,
      file_name: file.name,
      content_type: file.type
    });
    
    console.log(response);
  }
}