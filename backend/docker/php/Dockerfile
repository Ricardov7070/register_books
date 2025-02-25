# Imagem base com PHP 8.1 pré-instalado
FROM php:8.1-fpm

# Maintainer do Docker
LABEL maintainer="seu-email@example.com"

# Atualizando o sistema e instalando dependências básicas
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    libzip-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    libxml2-dev \
    procps && \
    apt-get clean

# Instalando extensões PHP adicionais
RUN docker-php-ext-install zip mbstring curl xml bcmath

# Instalando o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalando o Node.js na versão 18.16.0
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g n && \
    n 18.16.0 && \
    apt-get remove -y nodejs && \
    apt-get autoremove -y

# Verificando as versões do PHP e Node.js
RUN php -v && node -v && npm -v

# Configurando o diretório de trabalho
WORKDIR /var/www/laravel

# Copiando arquivos do projeto para o container
COPY . .

# Instalando dependências do Composer
RUN composer install --no-dev --optimize-autoloader

# Gerando a chave do Laravel
RUN php artisan key:generate

# Configurando permissões
RUN chmod -R 775 storage bootstrap/cache && \
    chown -R www-data:www-data /var/www/laravel

# Instalando dependências de frontend do Laravel (opcional, para Laravel Mix ou Vite)
RUN npm install && npm run build

# Instalando extensões PHP adicionais, incluindo pdo_mysql
RUN docker-php-ext-install zip mbstring curl xml bcmath pdo pdo_mysql && \
    docker-php-ext-enable pdo pdo_mysql

# Copiando arquivos do projeto para o container
COPY . .

# Expondo a porta 5000
EXPOSE 5000

# Comando para iniciar o servidor embutido do Laravel
CMD ["php-fpm"]

