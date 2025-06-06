## Colinha de comandos Git e Convenções

### Comandos Git

__1. Clonando o repositório__

Sempre que forem trabalhar no repositório e fazer qualquer alteração, **NÃO BAIXEM!** Ao invés disso, utilizem o comando `git clone` da seguinte forma:

```sh
> git clone <url_do_repositório>
```

Para adquirir essa URL, clique no botão verde escrito Code na tela inicial do Github e cole a URL. Lembre-se: esqueça das abas SSH e Github CLI; utilizem apenas HTTPS!

__2. Fazendo suas mudanças__

Antes de começar qualquer coisa, verifique se seu repositório local está devidamente atualizado 
com o Github. Isso vale tanto para quando você acabou de clonar o repositório, quanto para se você
deixou o repositório guardado no PC da sua casa e quer atualizar os arquivos. Use o seguinte
comando:

```sh
> git fetch # ou git pull, aqui tanto faz 
```

Depois disso, crie o branch em que você fará suas mudanças. Nada foi decidido formalmente ainda,
mas minha opinião é que todo mundo devia criar um branch com o nome e usar ele pra fazer todas
as mudanças que quiser, a hora que quiser! Independentemente, você faz isso dessa forma:

```sh
# caso seu branch ainda não tenha sido criado...
> git checkout -b <nome_do_seu_branch> origin/dev
# caso contrário:
> git checkout <nome_do_seu_branch>
```

Após isso, é só fazer suas mudanças! Ao final de tudo, é preciso fazer o _commit_ das mudanças
que você fez. No futuro, esse commit **se tornará um Pull Request**, que fará com que o que 
você fez seja integrado ao branch `dev` e, posteriormente, ao `main`:

```sh
# navegue até a raiz do projeto;
> git add . 
> git commit -am "<mensagem_de_commit>"
> git push origin dev
```

Não se preocupe tanto com a mensagem agora; apenas (POR FAVOR) seja descritive! Após isso,
abra o Pull Request no Github e nos avise. Iremos dar uma olhadinha no que você fez e, caso tudo
esteja certo, suas mudanças vão pro `dev`! Quando implementarmos um certo conjunto de mudanças,
enviaremos elas ao branch `main`, e o ciclo se repete.

__3. Fiz bosta! E agora?!__

Não se preocupe, ainda tem salvação! Caso você tenha feito uma cagada grande o suficiente pra não
valer a pena salvar nada que você escreveu, a melhor solução as vezes é só dar um tiro de
misericórdia e resetar seu branch. Isso é feito com o comando

```sh
> git reset --hard origin/dev
```

Se tudo correr certo, é pro seu branch estar uma cópia exata da versão mais recente do `dev`. Se
não, sinceramente não sei o que fazer também 😭