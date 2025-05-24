import User from "../routes/user.routes.js" 

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

        const students = await User.find();
  
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};



export {
    getAllUsers,
    getUserById,
};
