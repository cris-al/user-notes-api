const { Publicinfo } = require('../db');

const getInfo = async (req, res) => {
    try {
        const info = await Publicinfo.findAll();
        res.status(200).json({
            success: true,
            count: 1,
            data: info,
            msg: "successfully"
        });

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const postInfo = async (req, res) => {
    const { welcomeText, name, descriptionHome, descriptionContact,
        instagramUrl, facebookUrl } = req.body;
    try {
        if(!welcomeText) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: "welcomeText is require"
        });
        if(!name) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: "name is require"
        });
        if(!descriptionHome) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: "descriptionHome is require"
        });

        const info = await Publicinfo.create({ welcomeText, name, descriptionHome,
            descriptionContact, instagramUrl, facebookUrl });

        res.status(200).json({
            success: true,
            count: 1,
            data: info,
            msg: "successfully"
        });

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
};

const updateInfo = async (req, res) => {
    const { id } = req.params;
    const { welcomeText, name, descriptionHome, descriptionContact,
        instagramUrl, facebookUrl } = req.body;

    try {
        if(!id) return res.status(400).json({
            success: false,
            count: 0,
            data: {},
            msg: "id is require"
        });

        const result = await Publicinfo.findByPk(id);
        if(!result) return res.status(404).json({
            success: false,
            count: 0,
            data: {},
            msg: "is not found"
        });

        if(welcomeText) await Publicinfo.update({ welcomeText }, { where: { id }});
        if(name) await Publicinfo.update({ name }, { where: { id }});
        if(descriptionHome) await Publicinfo.update({ descriptionHome }, { where: { id }});
        if(descriptionContact) await Publicinfo.update({ descriptionContact }, { where: { id }});
        if(instagramUrl) await Publicinfo.update({ instagramUrl }, { where: { id }});
        if(facebookUrl) await Publicinfo.update({ facebookUrl }, { where: { id }});

        const infoUpdate = await Publicinfo.findByPk(id);

        res.status(200).json({
            success: true,
            count: 1,
            data: infoUpdate,
            msg: "successfully"
        });

    } catch (error) {
        res.status(400).json({success: false, msg: error});
    }
}

module.exports = { getInfo, postInfo, updateInfo };