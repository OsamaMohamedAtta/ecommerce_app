const userModel = require('../../../../DB/models/user.model')
const cloudinaryConfig = require('../../../services/cloudinary')
const cloudinary = require("cloudinary").v2;
cloudinaryConfig()
const fs = require('fs');

const updateProfilePic = async (req, res) => {
    try {
        if (req.validationErrorImg) {
            res.json({ message: " png او jpg او jpeg يجب ان يكون امتداد الصورة" })
        }
    
        if (req.file) {
            const imageURI = req.file.path;
            const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI, {folder: 'userProfilePic', resource_type: "image", quality: 50});
            fs.unlinkSync(imageURI);
            if (!req.userData.publicPicId) {
                await userModel.findByIdAndUpdate(req.userData._id, {picURL: secure_url, publicPicId: public_id})
                res.json({ message: "success" });
            } else {
                await cloudinary.uploader.destroy(req.userData.publicPicId)
                await userModel.findByIdAndUpdate(req.userData._id, {picURL: secure_url, publicPicId: public_id})
                res.json({ message: 'success' });
            }
        } else {
            res.json({message: 'من فضلك قم برفع صوره بالمواصفات المطلوبة'});
        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = updateProfilePic