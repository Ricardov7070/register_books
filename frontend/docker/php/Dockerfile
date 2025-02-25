# Imagem base com Node 22.00 pré-instalado
FROM node:22-slim

# Configurando o diretório de trabalho
WORKDIR /app

# Copiando o arquivo package.json para o container
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando arquivos do projeto para o container
COPY . .

# Expondo a porta 5173
EXPOSE 5173

# Comando para iniciar o servidor embutido do Node
CMD ["npm", "run", "dev", "--", "--host"]
