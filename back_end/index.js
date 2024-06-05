import express  from "express";
import cors from 'cors'
import rootRouter from "./router/rootRouter.js";
import bodyParser from 'body-parser';
const app = express();

app.use(cors({
    origin:["http://127.0.0.1:5500","http://127.0.0.1:5501"]
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())
app.use(rootRouter)

app.listen(5000, () => {console.log('Server is running on port 3000');});