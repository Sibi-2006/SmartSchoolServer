import CertificateRequest from "../module/CertificateRequestSchema.js";
import mongoose from "mongoose";

export const requestCertificate = async (req, res) => {
  try {
    const {
      student_Id,
      fullName,
      standard,
      section,
      certificateName,
      reason,
    } = req.body;

    // Required field validation
    const requiredFields = {
      student_Id,
      fullName,
      standard,
      section,
      certificateName,
      reason,
    };

    for (const key in requiredFields) {
      if (!requiredFields[key] || requiredFields[key].toString().trim() === "") {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    // Check existing request (only pending or approved)
    const existingRequest = await CertificateRequest.findOne({
      student_Id,
      certificateName,
      status: { $in: ["pending", "approved"] },
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You have already requested this certificate" });
    }

    // Create request
    const newCertificate = new CertificateRequest({
      student_Id,
      fullName,
      standard,
      section,
      certificateName,
      reason,
    });

    await newCertificate.save();

    return res
      .status(201)
      .json({ message: "Certificate request sent to school admin" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllCertificate = async (req, res) => {
  try {
    const allCertificate = await CertificateRequest.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Certificate requests fetched successfully",
      certificates: allCertificate,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//find by id
export const getOneCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    // id validation
    if (!id) {
      return res.status(400).json({ message: "Certificate ID is required" });
    }

    // check valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid certificate ID" });
    }

    const certificate = await CertificateRequest.findById(id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    return res.status(200).json({
      message: "Certificate fetched successfully",
      certificate,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// change certificate status
export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validations
    if (!id) {
      return res.status(400).json({ message: "Certificate ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid certificate ID" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // update
    const certificate = await CertificateRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    return res.status(200).json({
      message: `Certificate ${status} successfully`,
      certificate,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//find certificates by student-id
export const getCertificate_With_studentId = async (req, res) => {
  try {
    const { student_Id } = req.params;
    if (!student_Id)
      return res.status(400).json({ message: "student id is required" });

    const certificates = await CertificateRequest
      .find({ student_Id })
      .sort({ createdAt: -1 });

    if (certificates.length === 0)
      return res.status(404).json({ message: "This student has no certificate requests" });

    return res.status(200).json({
      message: "Certificates fetched successfully",
      certificates
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
