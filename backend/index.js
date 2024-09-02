import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
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

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

 // (async()=>{
  //   await db.sync();
 // })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(NewsRoute);  // Integrasi NewsRoute
app.use(EventRoute);  // Integrasi EventRoute
app.use(ProjectRoute);  // Integrasi ProjectRoute
app.use(JournalRoute);  // Integrasi JournalRoute
app.use(DiscussionRoute);  // Integrasi DiscussionRoute

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
