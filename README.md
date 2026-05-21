# Landing Page - Mega Suite Lab 🚀

> Site de vendas (landing page) institucional e altamente performático do **Mega Suite Lab**. Desenvolvido em HTML5 e CSS3 Vanilla para garantir tempo de carregamento de milissegundos e maximizar conversões de vendas.

---

## 🛠️ Como Executar Localmente

Como este projeto é independente, você precisará instalar as dependências e iniciar o servidor. Abra um terminal na pasta `c:\projetos\mega_suite_landing` e execute:

1. **Instalar dependências (Vite):**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *O site de vendas abrirá em: `http://localhost:3000` (sem conflitar com a porta `5173` do seu aplicativo principal).*

---

## 🎬 Como Adicionar seus Vídeos Gravados

A Landing Page já possui espaços reservados (*placeholders*) para 5 vídeos no total (1 de apresentação principal na seção Hero e 1 demonstrativo para cada uma das 4 ferramentas).

Para adicioná-los:
1. Abra o arquivo `src/main.js`.
2. Procure pelo objeto `VIDEO_DATABASE` no início do arquivo.
3. Insira o link do seu vídeo gravado no campo `url` correspondente.

**Formatos Suportados:**
* **Vídeos do YouTube:** Use o link de incorporação (`embed`). Exemplo: `https://www.youtube.com/embed/SEU_ID_DO_VIDEO?autoplay=1`
* **Vídeos em MP4 local ou hospedados:** Coloque o caminho relativo ou URL direta do arquivo. Exemplo: `./assets/video-medidas.mp4` ou `https://seu-servidor.com/video.mp4`

---

## 🚀 Como Hospedar no Vercel (Gratuitamente)

Como o projeto é uma Landing Page estática super leve, você pode hospedá-la no Vercel em poucos segundos e sem custos:

1. **Instalar a ferramenta do Vercel globalmente (se não tiver):**
   ```bash
   npm install -g vercel
   ```

2. **Fazer o deploy:**
   Navegue até a pasta `c:\projetos\mega_suite_landing` no seu terminal e digite:
   ```bash
   vercel
   ```
   * Siga as instruções do terminal.
   * Quando perguntado sobre o diretório de build e comandos, o Vercel detectará o Vite automaticamente e fará tudo por você!
   * Digite `vercel --prod` quando quiser enviar as alterações finais para o ar no seu domínio definitivo.
