# Use Node for building the React app
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Start the React dev server
CMD ["npm", "start"]

EXPOSE 3000
