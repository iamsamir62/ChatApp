import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmpassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmpassword || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Password do not match",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const maleprofilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const femaleprofilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleprofilePhoto : femaleprofilePhoto,
      gender
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    })


  } catch (error) {
    console.log(error);
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are requred" })
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "User not exist",
        success: false
      })
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password doesnot match",
        success: false
      })
    };
    const tokenData = {
      userId: user._id
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        success: true,
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });



  } catch (error) {
    console.log(error);
  }
}

const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully."
    })
  } catch (error) {
    console.log(error);
  }
}

const getOtherUsers = async (req, res) => {
  try {
    const loggedinUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password");
    return res.status(200).json(otherUsers)

  } catch (error) {
    console.log(error);


  }

}



export { register, login, logout, getOtherUsers }