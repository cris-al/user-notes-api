const { v2: cloudinary } = require('cloudinary');
const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });

const uploadFileToCloudinary = async (b64) => {
    const result = await cloudinary.uploader.upload(b64, {
        folder: 'jbc-productions',
        resource_type: 'video'
    });
    return result;
}

const deleteFileFromCloud = async (publicIdSong, publicIdImage) => {
    const res1 = await cloudinary.uploader.destroy(publicIdSong);
    if(publicIdImage!==''){
        await cloudinary.uploader.destroy(publicIdImage);
    }
    return res1;
}

module.exports = { uploadFileToCloudinary, deleteFileFromCloud };