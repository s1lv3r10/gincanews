import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/usercontrollers";

const router = Router();

router.get("/users", getUsers);         // 🔹 Listar usuários
router.post("/users", createUser);      // 🔹 Criar novo usuário
router.put("/users/:id", updateUser);   // 🔹 Atualizar um usuário específico
router.delete("/users/:id", deleteUser);// 🔹 Deletar um usuário

export default router;
