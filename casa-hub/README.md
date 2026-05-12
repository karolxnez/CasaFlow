# Casa Hub

MVP visual de um sistema de organizacao domestica para 3 pessoas e o cachorro Snoopy. A interface foi pensada como um app de uso diario no celular, com navegacao inferior, perfis por morador e dados mockados.

## Stack

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- Dados locais centralizados para futura troca por Firebase ou Supabase

## Como rodar

### Previa rapida por link local

No Windows, abra o arquivo:

```txt
abrir-casa-hub.bat
```

Ele sobe um servidor local simples e abre:

```txt
http://127.0.0.1:4173
```

Essa previa usa `preview/index.html` e serve para visualizar o MVP imediatamente, mesmo antes de instalar as dependencias do Next.js.

### Projeto Next.js

```bash
npm install
npm run dev
```

Depois abra:

```bash
http://localhost:3000
```

## O que foi implementado

- Dashboard com contas, eventos, compras urgentes, Snoopy, filmes, financas e viagem.
- Tela inicial de perfis em estilo streaming para Karina, Kaleb e Karolyne.
- Aba Adicionar para registrar rapidamente qualquer item da casa.
- Lista de compras interativa com adicionar, marcar como comprado, remover e limpar comprados.
- Comidas com filtros, campo "o que temos em casa?", favoritos, ingredientes e preparo resumido.
- Calendario simples com tipos visuais: evento, conta, pet e viagem.
- Financas com total do mes, pago, pendente, contas, parcelas e meta de viagem.
- Viagens com destino, orcamento, valor guardado, checklist e status.
- Filmes e Series com tipo, plataforma, sugestao, status, nota e noite de filme.
- Snoopy com racao, banho, vacina, vermifugo, gastos e observacoes.
- Bem-estar com humor, energia, sono, habitos leves e recados.
- Configuracoes com perfis dos 3 moradores, cores, notificacoes e categorias.

## Estrutura

```txt
src/
  app/                 rotas e paginas principais
  components/
    features/          componentes especificos de funcionalidades
    layout/            navegacao, shell do app e perfis
    ui/                cards, botoes, status e elementos reutilizaveis
  data/                dados mockados
  lib/                 formatacao e configuracao futura de banco
  types/               tipos TypeScript do dominio
```

## Preparado para Firebase ou Supabase

Hoje os dados ficam em `src/data/mock.ts`. Para evoluir:

1. Configure `.env.local` usando `.env.example`.
2. Troque `NEXT_PUBLIC_DATABASE_PROVIDER` para `firebase` ou `supabase`.
3. Crie services por modulo, por exemplo `src/lib/services/shopping.ts`.
4. Substitua as leituras diretas de `src/data/mock.ts` por chamadas aos services.
5. Mantenha os tipos em `src/types/domain.ts`, assim a UI continua estavel.

## GitHub

Quando o Git estiver disponivel no computador:

```bash
git init
git add .
git commit -m "Cria MVP visual do Casa Hub"
git branch -M main
git remote add origin https://github.com/karolxnez/CasaFlow.git
git push -u origin main
```
