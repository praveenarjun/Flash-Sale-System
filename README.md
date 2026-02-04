# Flash Sale System

A microservices-based E-commerce Flash Sale application built with Java Spring Boot and Next.js.

## Architecture

The system consists of the following microservices:

| Service | Technology | Port | Database | DB Port |
| :--- | :--- | :--- | :--- | :--- |
| **Product Service** | Spring Boot (Java 21) | 8080 | MongoDB | 27017 |
| **Order Service** | Spring Boot (Java 21) | 8081 | MySQL | 3308 |
| **Inventory Service** | Spring Boot (Java 21) | 8082 | MySQL | 3307 |
| **Frontend** | Next.js (React) | 3000 | - | - |

## Prerequisites

*   **Java 21** or higher
*   **Node.js** (v18+ recommended)
*   **Docker** & **Docker Compose**

## Getting Started

Follow these steps to set up and run the application.

### 1. Start Databases

You need to start the databases for each service using Docker Compose.

**Product Service (MongoDB):**
```bash
cd "Product Service"
docker-compose up -d
cd ..
```

**Order Service (MySQL):**
```bash
cd order-service
docker-compose up -d
cd ..
```

**Inventory Service (MySQL):**
```bash
cd Inventory-Service
docker-compose up -d
cd ..
```

### 2. Start Backend Services

Open separate terminals for each service and start them.

**Product Service:**
```bash
cd "Product Service"
./mvnw spring-boot:run
```

**Order Service:**
```bash
cd order-service
./mvnw spring-boot:run
```

**Inventory Service:**
```bash
cd Inventory-Service
./mvnw spring-boot:run
```

### 3. Start Frontend

Open a new terminal for the frontend.

```bash
cd frontend
npm install
npm run dev
```

The application should be running at [http://localhost:3000](http://localhost:3000).

### 4. Seed Data

To populate the Product Service with some initial data, you can run the provided seed script. This requires the Product Service to be running on port 8080.

```bash
cd scripts
npm install axios
node seed_products.js
```

*Note: The seed script uses RapidAPI. You might need to check the script content if you run into API limits or need to configure keys.*

## Project Structure

*   `Product Service`: Manages product information.
*   `order-service`: Handles order placement.
*   `Inventory-Service`: Manages stock levels.
*   `frontend`: User interface built with Next.js.
*   `scripts`: Utility scripts (e.g., data seeding).
