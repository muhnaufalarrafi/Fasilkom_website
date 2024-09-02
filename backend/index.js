import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import NewsRoute from "./routes/NewsRoute.js";
import EventRoute from "./routes/EventRoute.js";
import ProjectRoute from "./routes/ProjectRoute.js";
import JournalRoute from "./routes/JournalRoute.js";
import DiscussionRoute from "./routes/DiscussionRoute.js";

dotenv.config();

const app = express();

// (async () => {
//    await db.sync();
// })();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(NewsRoute);
app.use(EventRoute);
app.use(ProjectRoute);
app.use(JournalRoute);
app.use(DiscussionRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});
