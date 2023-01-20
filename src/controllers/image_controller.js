const { Image } = require('../db');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

const getImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json({
            success: true,
            count: images.length,
            data: images,
            msg: "successfully"
        });
    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const postImage = async (req, res) => {
    const { imageB64, text } = req.body;
    try {
        if(!imageB64) return res.status(400).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: 'image base64 is require'
                                });

        if(!text) return res.status(400).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: 'text is require'
                                });

        const response = await uploadImage(imageB64);
        if(!response) return res.status(400).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: 'upload image error'
                                });

        const image = await Image.create({
            publicId: response.public_id,
            url: response.secure_url,
            text: text
        });

        if(!image) return res.status(400).json({
                                success: false,
                                count: 0,
                                data: {},
                                msg: 'create image error'
                            });

        res.status(200).json({
            success: true,
            count: 0,
            data: image,
            msg: 'successfully'
        });

    } catch (error) {
        res.status(404).json({success: false, msg: error});
    }
};

const destroyImage = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) return res.status(400).json({
                            success: false,
                            count: 0,
                            data: {},
                            msg: "id is require"
                        });
        
        const image = await Image.findByPk(id);
        if(!image) return res.status(404).json({
                                    success: false,
                                    count: 0,
                                    data: {},
                                    msg: "image is not found"
                                });
        const response = await deleteImage(image.publicId);
        const imageDelete = await Image.destroy({ where: { id } });
        if(response.result !== 'ok' && !imageDelete) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: response
        });

        res.status(200).json({
            success: true,
            count: 1,
            data: imageDelete,
            msg: "successfully"
        });
    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const showOrNotImage = async (req, res) => {
    const { id } = req.params;
    try {
        if(!id) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: "id is require"
        });
        let image = await Image.findByPk(id);
        if(!image) return res.status(404).json({
            success: false,
            count: 0,
            data: {},
            msg: "is not found"
        });

        if(image.show === true) await Image.update({ show: false }, { where: { id } });
        else await Image.update({ show: true }, { where: { id } });

        image = await Image.findByPk(id);

        res.status(200).json({
            success: true,
            count: 0,
            data: image,
            msg: "successfully"
        });

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

module.exports = { getImages, postImage, destroyImage, showOrNotImage };