const db = require('../models')
//crud routes here

const index = (req,res) =>{
    db.Asset.find({}, (error, assets) =>{
        if (error) return res.status(400).json({error: error.message})

        return res.status(200).json({
            assets,
            requestedAt: new Data().toLocaleString()
        })
    })
}

const create = (req,res) =>{
    db.Assets.create(req.body, (error, createdAsset) =>{
        if (error) return res.status(400).json({error: error.message})
        return res.status(200).json(createdAsset)
    })
}

const update = (req,res) =>{
    db.Asset.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true},
        (error, updatedAsset) =>{
            if (error) return res.status(400).json({error: error.message})
            return res.status(200).json(updatedAsset)
        }
    )
}

const destroy = (req,res) =>{
    db.Asset.findByIdAndDelete(req.params.id, (error, deletedAsset) =>{
        if (error) return res.status(400).json({error: error.message})

        return res.status(200).json({
            message: `Asset ${deletedAsset.name} deleted successfully`
        })
    })
}

module.exports = {
    index,
    create,
    update,
    destroy
}
