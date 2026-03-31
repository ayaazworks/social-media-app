import User from "../models/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"
import Notification from "../models/notification.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate("posts loops posts.author posts.comments story following")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` })
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: `get suggested user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const sameUserWithUserName = await User.findOne({ userName }).select("-password")

        if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
            return res.status(400).json({ message: "username already exist" })
        }

        let profileImage;
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }
        user.name = name
        user.userName = userName
        if (profileImage) {
            user.profileImage = profileImage
        }

        user.bio = bio
        user.profession = profession
        user.gender = gender

        await user.save()

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `edit profile error ${error}` })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName }).select("-password")
            .populate("posts loops followers following");
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get profile error ${error}` })
    }
}

export const follow = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const targetUserId = req.params.targetUserId;

        if (!targetUserId) {
            return res.status(400).json({ message: "Target user not found" });
        }

        if (currentUserId.toString() === targetUserId.toString()) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if already following
        const isFollowing = currentUser.following.includes(targetUserId);

        if (isFollowing) {
            // UNFOLLOW LOGIC
            currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
            
            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                following: false,
                message: "Unfollowed successfully"
            });
        } else {
            // FOLLOW LOGIC
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentUserId);

            // Notification Logic (Wrapped in try/catch so it doesn't break the follow action)
            try {
                const notification = await Notification.create({
                    sender: currentUserId,
                    receiver: targetUserId,
                    type: "follow",
                    message: "started following you"
                });

                // Note: Ensure getSocketId and io are imported/available here
                // If they are in your index.js, you may need to export them or use a helper
                if (typeof getSocketId === 'function' && typeof io !== 'undefined') {
                    const receiverSocketId = getSocketId(targetUserId);
                    if (receiverSocketId) {
                        const populatedNotification = await Notification.findById(notification._id).populate("sender receiver");
                        io.to(receiverSocketId).emit("newNotification", populatedNotification);
                    }
                }
            } catch (notiError) {
                console.error("Notification failed but follow succeeded:", notiError);
            }

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({
                following: true,
                message: "Followed successfully"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Follow error: ${error.message}` });
    }
}

export const followingList = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("following");
        // This returns just the array of IDs
        return res.status(200).json(user.following || []);
    } catch (error) {
        return res.status(500).json({ message: `Following list error: ${error.message}` });
    }
}

export const search = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) {
            return res.status(200).json([]);
        }

        const users = await User.find({
            $or: [
                { userName: { $regex: keyword, $options: "i" } },
                { name: { $regex: keyword, $options: "i" } }
            ]
        })
            .select("name userName profileImage") 
            .lean();

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Search Error" });
    }
}

export const getAllNotification = async (req,res)=>{
    try {
        const notifications = await Notification.find({
            receiver:req.userId
        }).populate("sender receiver post loop").sort({createdAt:-1})
        return res.status(200).json(notifications)
    } catch (error) {
         return res.status(500).json({ message: `get notification error ${error}` })
    }
}

export const markAsRead = async (req,res)=>{
    try {
        const {notificationId} = req.body
        if(Array.isArray(notificationId)){

            await Notification.updateMany(
                {_id:{$in: notificationId}, receiver: req.userId},
                { $set: {isRead: true}}
            );
        } else {

            await Notification.findOneAndUpdate(
                {_id:{$in: notificationId},receiver: req.userId},
                { $set: {isRead: true}}
            )
        }
        return res.status(200).json({message:"marked as read"})
    } catch (error) {
        return res.status(500).json({ message: `read notification error ${error}` })
    }
}
