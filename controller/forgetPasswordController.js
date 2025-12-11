import Admin from "../module/Adminschema.js";
import Student from "../module/StudentSchema.js";
import Teacher from "../module/TeacherSchema.js";
import Otp from "../module/otpSchema.js"
export const forget_password = async(req,res)=>{
    try{
        const { from } = req.params;
        const { loginId } = req.body;
        if(!from) return res.status(404).json({message:"from is required",isSucces:false});

        if(!loginId) return res.status(404).json({message:"login-id is required",isSucces:false});

        let Model;

        if (from === "admin") Model = Admin;
        if (from === "teacher") Model = Teacher;
        if (from === "student") Model = Student;

        const findUser = await Model.findOne({loginId});
        if(!findUser) return res.status(409).json({message:"user not finded",isSucces:false});
        const phone = findUser.phone;
        const name = findUser.fullName;
        return res.status(200).json({message:"find user" , phone,isSucces:true,name})
    }catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" ,isSucces:false});
  }
}
export const sentOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone)
      return res.status(404).json({ message: "phone is required", isSucces: false });

    // Generate OTP
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    await Otp.create({
      phone,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // Send SMS here
    // await sendSMS(phone, otp);

    return res.status(200).json({
      message: "OTP generated",
      otp, 
      isSucces: true
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error", isSucces: false });
  }
};

