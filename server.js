const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/podcast';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB successfully!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Video Schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Video = mongoose.model('Video', videoSchema);

// POST API - Add a new video
app.post('/api/videos', async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;

    // Validation
    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and videoUrl are required fields'
      });
    }

    // Create new video
    const newVideo = new Video({
      title,
      description,
      videoUrl
    });

    const savedVideo = await newVideo.save();

    res.status(201).json({
      success: true,
      message: 'Video added successfully!',
      data: {
        _id: savedVideo._id,
        title: savedVideo.title,
        description: savedVideo.description,
        videoUrl: savedVideo.videoUrl,
        createdAt: savedVideo.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding video',
      error: error.message
    });
  }
});

// GET API - Retrieve all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching videos',
      error: error.message
    });
  }
});

// GET API - Retrieve single video by ID
app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching video',
      error: error.message
    });
  }
});

// PUT API - Update video by ID (Bonus)
app.put('/api/videos/:id', async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description, videoUrl },
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video updated successfully!',
      data: updatedVideo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating video',
      error: error.message
    });
  }
});

// DELETE API - Delete video by ID (Bonus)
app.delete('/api/videos/:id', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);

    if (!deletedVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully!',
      data: deletedVideo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting video',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Video Upload API',
    endpoints: {
      'GET /api/videos': 'Get all videos',
      'GET /api/videos/:id': 'Get single video',
      'POST /api/videos': 'Add new video',
      'PUT /api/videos/:id': 'Update video',
      'DELETE /api/videos/:id': 'Delete video'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;