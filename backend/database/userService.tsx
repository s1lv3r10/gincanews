import db from "../database/db"; //importa a conexão

const getUsers = (callback) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

export default getUsers; //exporta a função (padrão export default, module.export não funciona)
