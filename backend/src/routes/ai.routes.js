const express = require("express");
const {
  optimizeResumeController,
  keywordMatchController,
  suggestJobsController,
} = require("../controllers/ai.controller");

const router = express.Router();

// POST /api/ai/optimize
router.post("/optimize", optimizeResumeController);

// POST /api/ai/match
router.post("/match", keywordMatchController);

// POST /api/ai/suggest-jobs
router.post("/suggest-jobs", suggestJobsController);


module.exports = router;
