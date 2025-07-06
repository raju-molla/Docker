
# Docker Setup for MongoDB and Backend (Same Network)

## Step 1: Create Docker Network
docker network create react-node-network

## Step 2: Run MongoDB Container
docker run -d \
  --name mongodb \
  --network react-node-network \
  -p 27017:27017 \
  mongo

## Step 3: Update Backend Connection String
# In your backend code (server.js or .env), use the following MongoDB URI:
mongodb://mongodb:27017/test

## Step 4: Build and Run Backend Container
docker build -t backend-app .

docker run -d \
  --name backend-container \
  --network react-node-network \
  -p 5000:5000 \
  backend-app

## Optional: Run Frontend on Same Network
docker run -d \
  --name frontend-container \
  --network react-node-network \
  -p 3000:3000 \
  frontend-app

# Summary:
# - All containers are on 'react-node-network'
# - Backend connects to MongoDB using hostname 'mongodb'
# - Use docker-compose for simpler multi-container setups (optional)
