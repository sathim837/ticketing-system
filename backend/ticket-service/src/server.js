import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {

    res.status(200).json({
        success : true,
        service: "ticket-service",
        message : "fit"
    });

});

app.get("/protected", authenticateUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("MySQL connection established successfully.");

        app.listen(PORT, () => {
            console.log(`Ticket Service is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL:", error.message);
        process.exit(1);
    }
};
startServer();