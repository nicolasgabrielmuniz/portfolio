# Portfólio — Nicolas Gabriel de Oliveira Muniz

Portfólio pessoal em HTML, CSS e JavaScript puro (sem frameworks/build), com tema escuro premium, glassmorphism, animações e integração ao vivo com a API pública do GitHub.

## Estrutura do projeto

```
portfolio/
├── index.html          # Página única com todas as seções
├── css/
│   └── style.css       # Design tokens, layout e animações
├── js/
│   └── main.js         # Interações, scroll reveal, GitHub API, formulário
├── assets/
│   ├── favicon.svg
│   └── og-cover.svg    # Imagem para Open Graph / redes sociais
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── README.md
```

## Como rodar localmente

Não há dependências nem build — é HTML/CSS/JS estático. Basta servir a pasta com qualquer servidor local (necessário para as chamadas `fetch` da API do GitHub funcionarem corretamente em alguns navegadores):

**Opção 1 — Python (já vem instalado na maioria dos sistemas):**
```bash
cd portfolio
python3 -m http.server 8080
```
Depois acesse `http://localhost:8080`.

**Opção 2 — Node.js:**
```bash
cd portfolio
npx serve .
```

**Opção 3 — VS Code:**
Instale a extensão "Live Server" e clique em "Go Live" com o `index.html` aberto.

## Publicando online (grátis)

O projeto é 100% estático, então funciona em qualquer um destes serviços — basta enviar a pasta `portfolio/`:

- **GitHub Pages**: crie um repositório, suba os arquivos e ative o Pages nas configurações do repositório.
- **Vercel**: `vercel` na pasta do projeto (ou importe o repositório pelo painel).
- **Netlify**: arraste a pasta `portfolio/` no painel do Netlify Drop.

## Personalização

- **Cores e tipografia**: tudo é controlado por variáveis CSS no topo de `css/style.css` (bloco `:root`).
- **Textos das seções**: editar diretamente em `index.html`.
- **Habilidades, projetos de exemplo, timeline e serviços**: são gerados a partir de listas de dados no início de `js/main.js` (constantes `SKILLS`, `FALLBACK_PROJECTS`, `TIMELINE`, `SERVICES`) — edite essas listas para atualizar o conteúdo sem mexer no HTML.
- **Usuário do GitHub**: definido na constante `GITHUB_USERNAME` no topo de `js/main.js`.

## Integração com GitHub

A seção "GitHub" e os cards de "Projetos" consultam a API pública do GitHub em tempo real (`api.github.com`), sem necessidade de chave de API:
- Perfil, seguidores e repositórios: `GET /users/{username}`
- Repositórios públicos: `GET /users/{username}/repos`

Se o usuário não tiver repositórios públicos ou a API estiver indisponível/limitada (rate limit de 60 requisições/hora por IP sem autenticação), o site usa automaticamente projetos de exemplo pré-definidos, para que a seção nunca fique vazia.

## Formulário de contato

O formulário faz validação no navegador (nome, e-mail, assunto e mensagem). Como este é um projeto estático sem backend, o envio abre o cliente de e-mail do visitante (`mailto:`) com a mensagem pré-preenchida para `nicolasgomuniz@gmail.com`. Para enviar de fato pelo próprio site sem redirecionar para o e-mail, integre um serviço como Formspree, EmailJS ou um endpoint próprio e substitua o bloco de envio em `js/main.js` (seção 13).

## Acessibilidade e performance

- Uso de `prefers-reduced-motion` para reduzir animações quando o usuário solicitar.
- Estados de foco visíveis (`:focus-visible`) para navegação por teclado.
- Link "Pular para o conteúdo" no topo da página.
- Imagens com `alt` descritivo e `loading="lazy"` onde aplicável.
- Fontes carregadas com `preconnect` para reduzir latência.
- CSS e JS organizados em arquivos separados, sem dependências pesadas (apenas Font Awesome via CDN para ícones).

## Tecnologias

HTML5 · CSS3 (custom properties, grid, flexbox, glassmorphism) · JavaScript (ES6+, `fetch`, `IntersectionObserver`, Canvas) · Font Awesome · Google Fonts (Inter, Space Grotesk, JetBrains Mono).

---
Nicolas Gabriel de Oliveira Muniz © 2026
