import express from "express";
import cors from "cors";
import * as path from "path";
import { connect } from "./database/database";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static('public'));

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
connect();

app.listen(port, () => console.log(`Server is up at port ${port}`));
