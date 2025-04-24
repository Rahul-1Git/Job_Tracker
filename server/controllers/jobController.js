import Job from "../models/job.js";

//POST
export const createJob = async (req, res) => {
  try {
    const jobData = new Job(req.body); // build from request
    const savedData = await jobData.save(); // save to DB
    res.status(201).json(savedData); // success!
  } catch (error) {
    res.status(400).json({ message: "Error adding job", error: error.message }); // send 400 Bad Request
  }
};

// GET
export const getAllJob = async (req, res) => {
  try {
    const jobData = await Job.find();
    if (!jobData) {
      return res.status(404).json({ message: "job data not found" });
    }
    res.status(200).json(jobData, { message: "Job added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding job", error: error.message });
  }
};

// GET by ID
export const getJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExist = await Job.findById(id);
    if (!jobExist) {
      return res.status(404).json({ message: "job not found" });
    }
    res.status(200).json(jobExist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding job", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExist = await Job.findById(id);
    if (!jobExist) {
      return res.status(404).json({ message: "Job not found" });
    }
    const updateData = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in Updating the data", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobExist = await Job.findById(id);
    if (!jobExist) {
      return res.status(404).json({ message: "job not exist" });
    }
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting job", error: error.message });
  }
};
