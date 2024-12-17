# Stage 1: Build the React application
FROM node:18-alpine AS react-build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY keypassUI/package*.json ./
RUN npm install

# Copy the entire application code to the container
COPY keypassUI/ ./

# Run the Vite build process
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY keypassUI/nginx.conf /etc/nginx/conf.d/

# Copy the built React files to the Nginx directory
COPY --from=react-build /app/dist /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
