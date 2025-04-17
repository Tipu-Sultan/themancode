import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
export async function uploadCloudinary(file, type = 'video') {
    try {
      const uploadOptions = {
        resource_type: type,
        folder: `themancode/${type === 'video' ? 'videos' : 'thumbnails'}`,
      };
  
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;
  
      const result = await cloudinary.uploader.upload(dataUri, uploadOptions);
      return {
        url: result.secure_url,
        publicId: result.public_id,
        ...(type === 'video' && { duration: result.duration }),
      };
    } catch (error) {
      throw new Error(`Failed to upload ${type} to Cloudinary: ${error.message}`);
    }
  }

// Delete file from Cloudinary
export async function deleteCloudinary(publicId, type = 'video') {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: type });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete ${type} from Cloudinary: ${error.message}`);
  }
}