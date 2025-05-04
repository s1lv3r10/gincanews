import { Request, Response } from "express";
import db from "../database/db";

export const getUsers = (req: Request, res: Response) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const createUser = (req: Request, res: Response) => {
    const { nome, email } = req.body;
    db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome, email });
    });
};

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    db.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário atualizado!" });
    });
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário deletado!" });
    });
};
