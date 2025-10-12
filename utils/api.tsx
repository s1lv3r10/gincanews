import { CronogramaType, UsuarioType } from "./types"

export class Api {
    constructor() {

    }
    private defaultUrl: string = 'https://functions-tcc-egcnbkhrg6e5cnfu.brazilsouth-01.azurewebsites.net/api'
    
    public async getCronos(em_crono: string = 'EM0'): Promise<CronogramaType[]> {
        const req = await fetch(`${this.defaultUrl}/crono/get?em_crono=${em_crono}`, {
            method: 'GET'
        })
        const json: CronogramaType[] = await req.json()

        return json
    }

    public async AuthUsuario(email: string, senha: string): Promise<UsuarioType> {
        const req = await fetch(`${this.defaultUrl}/usuarios/auth`, {
            method: 'POST',
            body: JSON.stringify({
                email_user: email,
                senha_user: senha,
            })
        })
        if (req.ok) {
            const json: UsuarioType & { authorized: boolean } = await req.json()
            return json
        } else {
            throw Error('Autenticação falhou!')
        } 
    }

    public async RegisterUsuario(
        email: string,
        senha: string,
        login: string,
        em: string,
        nome: string,
    ) {
        const req = await fetch(`${this.defaultUrl}/usuarios/register`, {
            method: 'POST',
            body: JSON.stringify({
                email_user: email,
                senha_user: senha,
                login_user: login,
                em_user: em,
                nome_user: nome
            })
        })
    }
}