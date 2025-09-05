const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Notion API proxy endpoint
app.post('/api/notion/test', async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    
    const options = {
        hostname: 'api.notion.com',
        port: 443,
        path: '/v1/users/me',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    };
    
    const notionReq = https.request(options, (notionRes) => {
        let data = '';
        
        notionRes.on('data', (chunk) => {
            data += chunk;
        });
        
        notionRes.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (notionRes.statusCode === 200) {
                    res.json({ success: true, user: response });
                } else {
                    res.status(notionRes.statusCode).json({ 
                        error: response.message || 'Failed to connect to Notion' 
                    });
                }
            } catch (error) {
                res.status(500).json({ error: 'Invalid response from Notion' });
            }
        });
    });
    
    notionReq.on('error', (error) => {
        res.status(500).json({ error: 'Network error: ' + error.message });
    });
    
    notionReq.end();
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Artist Management Hub is running',
        timestamp: new Date().toISOString()
    });
});

// Handle all other routes by serving the main app (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎵 Artist Management Hub running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
});
