const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for contact submissions
const contactSubmissions = [];

// Sample project data endpoint
const projectData = {
  healthConnect: {
    title: "Health Connect Appointment Hub",
    tagline: "Healthcare Analytics & Smart Appointment Booking Platform",
    image: "assets/images/health_connect.png",
    problem: "High appointment drop-off rates, scheduling latency, and lack of real-time clinic throughput insights for healthcare administrators.",
    tools: ["Python", "FastAPI", "PostgreSQL", "Power BI", "JavaScript", "HTML/CSS"],
    results: [
      "Reduced appointment scheduling processing time by 45%",
      "Improved clinic slot utilization rate by 30%",
      "Engineered automated ETL scripts syncing 10k+ appointment logs daily"
    ],
    github: "https://github.com/naga-012/health-connect-hub",
    demo: "#"
  },
  mriTumor: {
    title: "MRI-Based Tumor Detection Using Deep Learning",
    tagline: "Convolutional Neural Network Diagnostic Classifier with Grad-CAM Visual Heatmaps",
    image: "assets/images/mri_detection.png",
    problem: "Long diagnostic turn-around time and high manual inspection variability in detecting early brain lesions from high-resolution MRI scans.",
    tools: ["Python", "PyTorch / TensorFlow", "OpenCV", "FastAPI", "Streamlit", "Power BI"],
    results: [
      "Achieved 94.8% classification accuracy across brain tumor categories",
      "Sub-second model inference time (<400ms per scan volume)",
      "Provided interpretable diagnostic heatmaps decreasing radiologist review time by 50%"
    ],
    github: "https://github.com/naga-012/MRI_BASED_ON_BRAIN_TUROM",
    demo: "http://localhost:8080"
  },
  mensStore: {
    title: "MENSVERSE — 3D Animated Men's Fashion Store",
    tagline: "Dark Luxury E-Commerce Platform with Interactive 3D Mannequin Fitting Room",
    image: "assets/images/mens_store.png",
    problem: "Traditional 2D e-commerce fashion stores fail to provide interactive 3D product previews, causing lower customer engagement, fit uncertainty, and higher return rates.",
    tools: ["React.js (Vite)", "Three.js / React Three Fiber", "Node.js", "Express.js", "MongoDB", "Zustand", "Framer Motion"],
    results: [
      "Sub-second 3D canvas viewport rendering powered by R3F and Three.js optimization",
      "Slide-over cart drawer with dynamic address collection and payment flow",
      "Real-time storefront and 3D model synchronization via Admin Portal without rebuilds"
    ],
    github: "https://github.com/naga-012/men-s_store",
    demo: "https://github.com/naga-012/men-s_store"
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: projectData });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message fields are required.'
    });
  }

  const submission = {
    id: Date.now(),
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  contactSubmissions.push(submission);
  console.log('📬 New Contact Form Submission:', submission);

  res.status(201).json({
    success: true,
    message: `Thank you ${name}! Your message has been received on the backend server.`,
    data: submission
  });
});

module.exports = app;
