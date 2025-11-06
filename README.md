# Video Upload API

RESTful API for managing video records using Node.js, Express, MongoDB, and Mongoose. Deployed on Vercel.

## Live URL
- **Production**: https://project-api-vert.vercel.app

## How to Install and Run
- **Clone & Install**
  ```bash
  git clone https://github.com/avinash23em/project-api
  cd project-api
  npm install
  ```
- **Environment variable**: create `.env.local`
  ```bash
  MONGODB_URI="<your MongoDB Atlas connection string>"
  ```
- **Start the server**
  ```bash
  npm start
  ```
- **Local base URL**: `http://localhost:3000`

## Deployment Notes
- Set the same `MONGODB_URI` in your Vercel project settings before deploying.
- Push this repo to GitHub and import it into Vercel (framework preset: **Other**).

## Test the Deployed API
- **GET** endpoint
  ```bash
  curl https://project-api-vert.vercel.app/api/videos
  ```
- **POST** endpoint
  ```bash
  curl -X POST https://project-api-vert.vercel.app/api/videos \
    -H "Content-Type: application/json" \
    -d '{"title":"Test Video","description":"Testing deployed API","videoUrl":"https://example.com/video.mp4"}'
  ```

## API Endpoints with Sample Requests
- **Base URL (local)**: `http://localhost:3000`
- **Base URL (deployed)**: `https://project-api-vert.vercel.app`
- **GET** `https://project-api-vert.vercel.app/`
  ```bash
  curl https://project-api-vert.vercel.app/
  ```
- **GET** `/api/videos`
  ```bash
  curl https://project-api-vert.vercel.app/api/videos
  ```
- **GET** `/api/videos/:id`
  ```bash
  curl https://project-api-vert.vercel.app/api/videos/<videoId>
  ```
- **POST** `/api/videos`
  ```bash
  curl -X POST https://project-api-vert.vercel.app/api/videos \
    -H "Content-Type: application/json" \
    -d '{"title":"Demo","videoUrl":"https://example.com/video.mp4","description":"optional"}'
  ```
- **PUT** `/api/videos/:id`
  ```bash
  curl -X PUT https://project-api-vert.vercel.app/api/videos/<videoId> \
    -H "Content-Type: application/json" \
    -d '{"title":"Demo Updated","videoUrl":"https://example.com/new.mp4","description":"updated"}'
  ```
- **DELETE** `/api/videos/:id`
  ```bash
  curl -X DELETE https://project-api-vert.vercel.app/api/videos/<videoId>
  ```

### Sample Responses
- **GET /api/videos** (200)
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "6508f912c8e4c4a1e17b49b2",
        "title": "JavaScript Basics",
        "description": "Learn JS fundamentals",
        "videoUrl": "https://example.com/video1.mp4",
        "createdAt": "2025-10-28T14:00:00Z"
      }
    ]
  }
  ```
- **POST /api/videos** (201)
  ```json
  {
    "success": true,
    "message": "Video added successfully!",
    "data": {
      "_id": "6508f912c8e4c4a1e17b49b2",
      "title": "JavaScript Basics",
      "description": "Learn JS fundamentals",
      "videoUrl": "https://example.com/video1.mp4",
      "createdAt": "2025-10-28T14:00:00Z"
    }
  }
  ```
- **Validation error** (400)
  ```json
  {
    "success": false,
    "message": "Title and videoUrl are required fields"
  }
  ```

## Tech Stack
- Node.js, Express, MongoDB Atlas, Mongoose, Vercel


