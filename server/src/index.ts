import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import morgan from "morgan"
import dashboardRoutes from "./routes/dashboardRoutes";
/*Routes*/

/*configureations*/
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

/*Routes*/
app.use("/dashboard", dashboardRoutes);
/*Server*/
const port = process.env.PORT||3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

