import { CronogramaType, FullUsuarioType, NoticiaType, UsuarioType } from "./types"

type NoticiaRequest = {
    data: NoticiaType,
    filename_orig: string,
    img: string,
    file_mime: string,
}

export class Api {
    constructor() {

    }
    private defaultUrl: string = 'https://functions-tcc-egcnbkhrg6e5cnfu.brazilsouth-01.azurewebsites.net/api'
    
    public async getCronos(em_crono: string): Promise<CronogramaType[]> {
        const req = await fetch(`${this.defaultUrl}/crono/get?em_crono=${em_crono}`, {
            method: 'GET'
        })
        console.log(req.url)
        const json: CronogramaType[] = await req.json()

        return json
    }

    public async deleteCrono(id_crono: number, xUserLogged: number) {
        await fetch(`${this.defaultUrl}/crono/delete`, {
            method: 'DELETE',
            headers: {
                "x-user-logged": xUserLogged.toString()
            },
            body: JSON.stringify({
                id_crono: id_crono,
            }),
        })
    }

    public async registerCrono(desc_cono: string, data_crono: string, em_crono: string, xUserLogged: number) {
        await fetch(`${this.defaultUrl}/crono/register`, {
            method: 'POST',
            headers: {
                "x-user-logged": xUserLogged.toString()
            },
            body: JSON.stringify({
                desc_cono: desc_cono,
                em_crono: em_crono,
                data_crono: data_crono,
            }),
        })
    }

    public async updateCrono(
        id_crono: number, 
        desc_cono: string, 
        data_crono: string, 
        em_crono: string, 
        xUserLogged: number
    ) {
        try {
            console.log('[UPDATE] try reached')
            const data = { 
                id_crono: id_crono,
                em_crono: em_crono,
                data_crono: data_crono,
                desc_cono: desc_cono,
            }
            console.log(data)
            const req = await fetch(`${this.defaultUrl}/crono/update`, {
                method: 'POST',
                headers: {
                    "x-user-logged": xUserLogged.toString()
                },
                body: JSON.stringify({
                    id_crono: id_crono,
                    em_crono: em_crono,
                    data_crono: data_crono,
                    desc_cono: desc_cono,
                }),
            })
            console.log('[UPDATE] request made')
            if (req.status != 200) throw Error(req.status.toString())
        } catch (e) {
            console.log(`[UPDATE] something went wrong: ${e.message}`)
        }
    }

    public async getUsuario(id_user: number): Promise<FullUsuarioType> {
        const req = await fetch(`${this.defaultUrl}/usuarios/get?id=${id_user}`)
        const user: FullUsuarioType = await req.json()

        console.log(user)

        return user
    }

    public async getAllNews(limit: number = 0): Promise<NoticiaType[]> {
        const req = await fetch(`${this.defaultUrl}/noticias/all`)
        const news: NoticiaType[] = await req.json()

        if (limit > 0) {
            let ret: NoticiaType[] = []

            for (let i = 0; i < limit; i++) {
                ret.push(news[i])
            }

            return ret
        } else return news
    }

    public async registerNews(data: NoticiaRequest, xUserLogged: number) {
        const req = await fetch(`${this.defaultUrl}/noticias/register`, {
            method: 'POST',
            headers: {
                "x-user-logged": xUserLogged.toString()
            },
            body: JSON.stringify({
                mmanchete_not: data.data.mmanchete_not,
                desc_not: data.data.desc_not,
                data_not: data.data.data_not,
                img: data.img,
                file_mime: data.file_mime,
                filename_orig: data.filename_orig
            }),
        })
        return req.status
    }

    public async AuthUsuario(username: string, senha: string): Promise<UsuarioType> {
        const req = await fetch(`${this.defaultUrl}/usuarios/auth`, {
            method: 'POST',
            body: JSON.stringify({
                nome_user: username,
                senha_user: senha,
            })
        })
        console.log(req.status)
        if (req.ok) {
            const json: UsuarioType & { authorized: boolean } = await req.json()
            return json
        } else if (req.status == 401) {
            throw Error('AUTH FAIL')
        }
        else {
            throw Error('UNKNOWN')
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

    public async updateUsuario(
        id: number,
        email: string,
        senha: string,
        login: string,
        em: string,
        nome: string,
    ): Promise<number> {
        const req = await fetch(`${this.defaultUrl}/usuarios/update`, {
            method: 'POST',
            body: JSON.stringify({
                id_user: id,
                email_user: email,
                senha_user: senha,
                login_user: login,
                em_user: em,
                nome_user: nome
            })
        })

        return req.status
    }
}