# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package.json package-lock.json ./

# Instala TODAS as dependências antes de copiar o restante dos arquivos
RUN npm install --legacy-peer-deps

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Garante que o Vite seja instalado corretamente
RUN npm install -g vite

# Expondo a porta usada pelo Vite
EXPOSE 5173

# Inicia o servidor do React com Vite dentro do container
CMD ["npm", "run", "dev", "--", "--host"]

