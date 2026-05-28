const Resume = require("../models/resume.model");
const imagekit = require("../utils/imagekit");
const { parseResume } = require("../services/resumeParser");

// ---------------- Upload Resume ---------------- //
const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    

    // Detect file type
    let fileType = "";
    if (req.file.mimetype === "application/pdf") fileType = "pdf";
    else if (
      req.file.mimetype === "application/msword" ||
      req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) fileType = "docx";
    else return res.status(400).json({ success: false, message: "Unsupported file type. Only PDF or DOC/DOCX allowed." });

    // ---------------- Parse Resume FIRST ---------------- //
    let parsedData = {};
    try {
      parsedData = await parseResume(req.file.buffer, fileType);
    } catch (parseError) {
      console.warn("⚠️ Resume parsing failed:", parseError.message);
    }

    // ---------------- THEN Upload to ImageKit with Local Fallback ---------------- //
    let fileUrl = "";
    let fileId = "";

    try {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}_${req.file.originalname}`,
      });
      fileUrl = uploadResponse.url;
      fileId = uploadResponse.fileId;
    } catch (ikError) {
      console.warn("⚠️ ImageKit upload failed, falling back to local storage:", ikError.message);
      
      const fs = require("fs");
      const path = require("path");
      const uploadsDir = path.join(__dirname, "../../uploads");

      // Ensure directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const fileName = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);

      fileUrl = `http://localhost:3000/uploads/${fileName}`;
      fileId = `local_${Date.now()}`;
    }

    // Save to DB
    const resume = new Resume({
      user: req.user.id,
      fileUrl,
      fileId,
      originalName: req.file.originalname,
      parsedData,
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: "Resume uploaded & parsed successfully",
      data: resume,
    });
    

  } catch (error) {
    console.error("Error uploading resume:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

// ---------------- Get User Resumes ---------------- //
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Delete Resume ---------------- //
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    if (resume.user.toString() !== req.user.id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    // Delete from storage (Local or ImageKit)
    if (resume.fileId) {
      if (resume.fileId.startsWith("local_")) {
        try {
          const fs = require("fs");
          const path = require("path");
          const fileName = resume.fileUrl.split("/").pop();
          const filePath = path.join(__dirname, "../../uploads", fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (localDelError) {
          console.error("Failed to delete local file:", localDelError.message);
        }
      } else {
        try {
          await imagekit.deleteFile(resume.fileId);
        } catch (ikError) {
          console.error("Failed to delete from ImageKit:", ikError.response?.body || ikError.message);
          // Let database deletion continue even if cloud deletion fails
        }
      }
    }

    // Delete from DB
    await Resume.deleteOne({ _id: resume._id });

    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadResume, getUserResumes, deleteResume };
