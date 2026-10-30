import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {

    res.status(200).json({
        success : true,
        service: "user-service",
        message : "fit"
    });

});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("MySQL connection established successfully.");

        app.listen(PORT, () => {
            console.log(`User Service is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL:", error.message);
        process.exit(1);
    }
};
startServer();

// app.listen(PORT, () => {
//     console.log(`user service is running at ${PORT}`);
// });