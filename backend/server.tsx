const express = require("express");
const cors = require("cors");
import getUsers from "./database/userService"; //importa a função
import userRoutes from "./routes/userroutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes); 

app.get("/users", (req, res) => {
    getUsers((err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
