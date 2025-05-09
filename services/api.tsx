import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários", error);
        return null;
    }
};
