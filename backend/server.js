const express = require('express');
const cors = require('cors');
const path = require('path');
const sentimentRoutes = require('./routes/sentimentAI');
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');
const guideRoutes = require('./routes/guide');
const { testConnection, initializeTables } = require('./config/database');
const chatbotRoutes = require('./routes/chatBot'); // Fixed: removed duplicate import and renamed
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for CORS
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:5174', 
        'http://localhost:3000', 
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware for parsing JSON bodies with increased limit for base64 images
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Jharkhand Tourism Feedback API is running.',
        status: 'ok',
        timestamp: new Date().toISOString(),
        endpoints: {
            sentiment: '/api/sentiment',
            feedback: '/api/feedback',
            feedbackStats: '/api/feedback/stats',
            chatbot: '/api/chatbot', // Fixed: removed 'api' duplication
            auth: {
                register: '/api/auth/register',
                login: '/api/auth/login',
                profile: '/api/auth/profile',
                logout: '/api/auth/logout',
                refreshToken: '/api/auth/refresh-token'
            },
            guide: {
                register: '/api/guide/register',
                find: '/api/guide/find',
                findByQR: '/api/guide/findByQR',
                all: '/api/guide/all',
                stats: '/api/guide/stats',
                health: '/api/guide/health'
            }
        }
    });
});

// Mount routes
app.use('/api', sentimentRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', authRoutes);
app.use('/api', guideRoutes);
app.use('/api', chatbotRoutes); // Fixed: use proper route variable name

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start the server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your database configuration.');
            process.exit(1);
        }

        // Initialize database tables
        const tablesInitialized = await initializeTables();
        if (!tablesInitialized) {
            console.error('❌ Failed to initialize database tables.');
            process.exit(1);
        }

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server started on http://localhost:${PORT}`);
            console.log('📊 Database: Connected and tables initialized');
            console.log('🔐 Authentication: Ready');
            console.log('🤖 Chatbot: Ready at /api/chatbot');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();