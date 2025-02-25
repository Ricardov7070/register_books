# Usa a imagem oficial do Node.js como base
FROM node:22-slim

# Configurando o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências para instalação antecipada
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Instalando o Vite globalmente no container
RUN npm install -g vite

# Copiando todos os arquivos do projeto para dentro do container
COPY . .

# Expondo a porta usada pelo Vite
EXPOSE 5173

# Comando para iniciar o servidor do React com Vite
CMD ["npm", "run", "dev", "--", "--host"]
