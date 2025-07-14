import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import morgan from "morgan";
/*Routes*/
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productroutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";
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
app.get("/", (req, res) => {
  res.send("API is running on Vercel");
});
/*Routes*/
app.use("/dashboard", dashboardRoutes); //tag http://localhost:3001/dashboard
app.use("/products", productRoutes); //tag http://localhost:3001/products
app.use("/users", userRoutes); //tag http://localhost:3001/users
app.use("/expenses", expenseRoutes);
/*Server*/
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
