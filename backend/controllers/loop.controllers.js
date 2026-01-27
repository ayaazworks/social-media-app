import uploadOnCloudinary from "../config/cloudinary.js";
import Loop from "../models/loop.model.js";
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
export const uploadLoop = async (req, res) => {
    try {
        const { caption } = req.body
        let media;
        if (req.file) {
            media = await uploadOnCloudinary(req.file.path)
        } else {
            return res.status(400).json({ message: "media is required" })
        }
        const loop = await Loop.create({
            caption, media, author: req.userId
        })
        const user = await User.findById(req.userId)
        user.loops.push(loop._id)
        await user.save()
        const populatedLoop = await Loop.findById(loop._id).populate("author", "name userName profileImage")
        res.status(201).json(populatedLoop)
    } catch (error) {
        return res.status(500).json({ message: `uploadLoop Controller error ${error}` })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.userId }).populate("author", "name userName profileImage")
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ message: `getAllPosts Controller error ${error}` })
    }
}

export const likeLoop = async (req, res) => {
    try {
        const loopId = req.params.postId
        const loop = await Loop.findById(loopId)
        if (!loop) {
            return res.status(400).json({ message: "Loop not Found" })
        }

        const alreadyLiked = loop.likes.some(id => id.toString() == req.userId.toString())

        if (alreadyLiked) {
            loop.likes = loop.likes.filter(id => id.toString() !== req.userId.toString())
        } else {
            loop.likes.push(req.userId)
        }
        await loop.save()
        loop.populate("author", "name userName profileImage")
        return res.status(200).json(loop)
    } catch (error) {
        return res.status(500).json({ message: `likeLoop Controller error ${error}` })
    }
}

export const comment = async (req, res) => {
    try {
        const { message } = req.body
        const loopId = req.params.loopId
        const loop = await Post.findById(loopId)
        if (!loop) {
            return res.status(400).json({ message: "Loop not Found" })
        }
        loop.comments.push({
            author: req.userId,
            message
        })
        await loop.save()
        loop.populate("author", "name userName profileImage");
        loop.populate("comments.author")
        return res.status(200).json(loop)
    } catch (error) {
        return res.status(500).json({ message: `LoopComment Controller error ${error}` })
    }
}

export const getAllLoops = async (req, res) => {
    try {
        const loops = await Loop.find({}).populate("author", "name userName profileImage")
        .populate("comments.author")
        return res.status(200).json(loops)
    } catch (error) {
        return res.status(500).json({ message: `getAlLoops Controller error ${error}` })
    }
}