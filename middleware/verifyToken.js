import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" });
            }

            // Put user info inside req.user
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
