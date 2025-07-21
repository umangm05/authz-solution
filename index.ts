import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/signup', async (req, res) => {
    // Handle signup with Ory Kratos (passwordless or Google OAuth)
});

app.post('/login', async (req, res) => {
    // Handle login with Ory Kratos
});

app.get('/profile', verifyToken, async (req, res) => {
    // Return profile info if authenticated
});

app.get('/admin', verifyToken, verifyRole('admin'), async (req, res) => {
    // Only admins can access this route
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
