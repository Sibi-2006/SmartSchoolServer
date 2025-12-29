import mongoose from "mongoose";

const CertificateRequestSchema = new mongoose.Schema(
  {
    student_Id: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    standard: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    certificateName: {
      type: String,
      enum: [
        "bonafide",
        "study",
        "attendance",
        "character",
        "fee",
      ],
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "CertificateRequest",
  CertificateRequestSchema
);
