# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Create .env file once 
# Exposing the env just for the sake of the case study and will use secure way to store the keys in real world
RUN echo "VITE_NEWS_ORG_API_KEY=9a59cef3ba0340489ec59c466c1a425c" >> .env && \
    echo "VITE_NYT_API_KEY=HZv1uNihbE7POgFbccrCTyTF71XbS3rL" >> .env && \
    echo "VITE_GUARDIAN_API_KEY=0928d91d-c13a-4407-89f3-5aedf6de580e" >> .env && \
    echo "VITE_NEWS_ORG_API=https://newsapi.org/v2/everything" >> .env && \
    echo "VITE_NEWS_ORG_CATEGORY_API=https://newsapi.org/v2/top-headlines" >> .env && \
    echo "VITE_NEW_YORK_TIMES_API=https://api.nytimes.com/svc/search/v2/articlesearch.json" >> .env && \
    echo "VITE_GAURDIAN_API=https://content.guardianapis.com/search" >> .env

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:18-alpine AS development
WORKDIR /app

# Copy the .env file from build stage
COPY --from=build /app/.env ./.env

# Install dependencies again for development
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY . ./

# Expose port for the development server
EXPOSE 5173
CMD ["npm","run","dev"]

# Stage 3: Production environment
FROM nginx:alpine AS production

# Copy the production build artifacts from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]