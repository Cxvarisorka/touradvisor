import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.json("test ok");
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword // Store the hashed password
        });

        res.status(200).json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, userDoc.password);

        if (isPasswordValid) {
            res.status(200).json("Login successful");
        } else {
            res.status(401).json("Invalid password");
        }
    } else {
        res.status(404).json("User not found");
    }
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
