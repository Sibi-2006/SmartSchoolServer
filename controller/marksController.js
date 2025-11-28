import Marks from "../module/MarksSchema.js";

export const addmark = async (req,res)=>{
    try{
        const { studentId } = req.params;
        const { subject , marks , examType , standard,section} = req.body;
        if(!studentId) return res.status(400).json({message:"student id is required"});
        const required ={
            subject , marks , examType , standard,section
        }
        for (const key in required) {
            if (!required[key] || required[key].toString().trim() === "") {
                return res.status(400).json({ message: `${key} is required` });
            }
        }
        const newMarks = {
            subject , marks , examType , standard,section, addedBy:req.teacher._id || null ,studentId
        };

        const addMarks = await Marks.create(newMarks);
        return res.status(200).json({message:"mark added succesfully" , mark:addMarks})
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
}