# Imagem base do Node.js
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Gerar build (NestJS compila TS para JS em dist/)
RUN npm run build

# Expor a porta que o app usa
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "run", "start:prod"]
