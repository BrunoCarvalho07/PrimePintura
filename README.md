# Prime Serviços de Pintura

Site institucional da **Prime Serviços de Pintura**, empresa de pintura residencial e comercial em São Paulo - SP. Site estático, responsivo e otimizado para SEO, construído sem frameworks — apenas HTML, CSS e JavaScript puros.

🔗 **Domínio:** [pinturasprime.com.br](https://www.primepintura.com.br)

---

## 📋 Sobre o projeto

Landing page de página única (one-page) pensada para converter visitantes em orçamentos, com identidade visual em tons dourado/preto, tipografia editorial (Playfair Display + Manrope) e microinterações que reforçam a sensação de acabamento premium — alinhado ao posicionamento da marca.

## ✨ Funcionalidades

- **Tema claro/escuro** com preferência salva no navegador (`localStorage`)
- **Menu responsivo** (desktop e mobile em tela cheia)
- **Rolagem suave** para as âncoras internas do menu
- **Galeria de projetos** e **carrossel de avaliações do Google** arrastáveis (mouse/touch), reaproveitando o mesmo componente de drag
- **Barra de progresso de rolagem** com ícone de rolo de tinta, alusiva ao logo da marca
- **Animações de entrada (scroll reveal)** via `IntersectionObserver`, incluindo um efeito de profundidade nos cards em telas de celular
- **Botões flutuantes** de WhatsApp e Instagram com destaque animado
- **Acessibilidade**: `aria-label`s, hierarquia de headings, respeito à preferência `prefers-reduced-motion`
- **SEO técnico**: meta tags completas, Open Graph/Twitter Card, dados estruturados (Schema.org `HousePainter`/`LocalBusiness`), `robots.txt` e `sitemap.xml`

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis nativas, Grid, Flexbox, `scroll-snap`) — sem pré-processadores
- JavaScript (Vanilla, ES6+) — sem frameworks ou dependências externas
- [Google Fonts](https://fonts.google.com/) (DM Mono, Manrope, Playfair Display)

## 📁 Estrutura de arquivos

```
.
├── index.html        # Marcação e conteúdo do site
├── style.css          # Estilos, temas e animações
├── script.js           # Interatividade (tema, menu, drag, scroll reveal)
├── robots.txt          # Diretivas de rastreamento para buscadores
├── sitemap.xml         # Mapa do site para indexação
└── assets/             # Imagens (logo, fotos de projetos)
```

## 🚀 Rodando localmente

Por ser um site 100% estático, não há build nem dependências para instalar. Basta:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

E então abrir o `index.html` diretamente no navegador, ou servir a pasta com qualquer servidor local simples, por exemplo:

```bash
# Python
python3 -m http.server 8000

# Node (com o pacote "serve" instalado globalmente)
npx serve .
```

Depois é só acessar `http://localhost:8000`.

## 🔍 SEO

- Meta tags de título, descrição, `canonical` e `robots` configuradas
- Open Graph e Twitter Card com imagem em URL absoluta
- Dados estruturados `HousePainter` (Schema.org) com endereço, telefone, horário de funcionamento e link do Google Maps
- `sitemap.xml` referenciado no `robots.txt` para facilitar a indexação

## 🗺️ Próximos passos sugeridos

- [ ] Substituir os depoimentos de exemplo da seção de Avaliações pelos avaliações reais do perfil da empresa no Google
- [ ] Criar/verificar o Google Business Profile e o Google Search Console
- [ ] Validar Core Web Vitals (PageSpeed Insights) após o deploy em produção
- [ ] Substituir imagens placeholder por fotos próprias dos projetos concluídos

## 👤 Autor

Desenvolvido por **[Bruno Carvalho](https://www.linkedin.com/in/bruno-carvalho-silvaa)**.

## 📄 Licença

Todos os direitos reservados © 2026 Prime Serviços de Pintura. Este código é de uso exclusivo da empresa e de seu desenvolvedor; a reprodução ou redistribuição não é autorizada sem permissão prévia.
