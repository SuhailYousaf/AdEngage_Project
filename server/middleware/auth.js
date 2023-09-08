const jwt = require('jsonwebtoken');
const secret = 'sakdfnsadklfnasdgsdfgsdgfg'; // Replace with your actual secret

const auth = async (req, res, next) => {
    console.log("Authentication middleware");
    try {
       
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.log("not token")
            throw new Error('No authorization token provided');
        }

        // Verify the token
        const decodedData = jwt.verify(token, secret);

        // Attach the decoded data (e.g., user ID) to the request object
        req.userId = decodedData.id;
           console.log("token is here"+req.userId)
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;
