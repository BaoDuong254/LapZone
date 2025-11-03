# LapZone - Laptop E-commerce Platform

A full-stack laptop e-commerce web application built with Node.js, Express, TypeScript, and MySQL. LapZone specializes in selling laptops with a comprehensive product catalog, user-friendly shopping experience, and powerful admin management system.
> Live demo: [LapZone Live Demo](https://drive.google.com/file/d/1IFBG-zSlu2_rJfQ9PYC3kOh3RrgVWJXO/view?usp=sharing)

## Features

### Laptop Catalog

- Comprehensive laptop product catalog
- Product categorization (Gaming, Business, Student, Ultrabooks, Workstations)
- Detailed product specifications and descriptions
- High-quality product images
- Brand filtering (ASUS, Dell, Lenovo, Apple, LG, Acer)
- Price and specification comparison

### Shopping Experience

- User-friendly product browsing and search
- Detailed product pages with specifications
- Shopping cart functionality with quantity management
- Secure checkout process
- Order tracking and history
- Multiple payment methods support

### User Management

- Customer registration and authentication
- User profile management with avatar support
- Order history and account management
- Role-based access control (Admin/Customer)
- Session management with Prisma Session Store

### Admin Panel

- Comprehensive admin dashboard
- Laptop inventory management
- Product CRUD operations
- User and customer management
- Order management and tracking
- Sales analytics and reporting

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM and migration tool
- **MySQL** - Database management system
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **Bcrypt** - Password hashing

### Frontend

- **EJS** - Server-side templating engine
- **Bootstrap** - CSS framework
- **JavaScript** - Client-side scripting
- **Responsive Design** - Mobile-friendly interface

### Additional Tools

- **Multer** - File upload handling
- **Zod** - Schema validation
- **Nodemon** - Development auto-reload
- **UUID** - Unique identifier generation

## Database Schema

The application uses the following main entities:

- **Users** - Customer accounts with role-based access
- **Roles** - User roles and permissions (Admin/Customer)
- **Products** - Laptop catalog with specifications (name, price, factory/brand, description, quantity, etc.)
- **Cart** - Shopping cart functionality for customers
- **CartDetail** - Individual items in shopping carts
- **Orders** - Order management with customer information and payment details
- **OrderDetail** - Individual laptop items within orders
- **Sessions** - User session management

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd LapZone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   PORT=8080
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   NODE_ENV=development
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate deploy
   ```

5. **Build the application**

   ```bash
   npm run build
   ```

6. **Start the application**

   **Development mode:**

   ```bash
   npm run dev
   ```

   **Production mode:**

   ```bash
   npm run start
   ```

7. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## Authentication & Authorization

The application implements a robust authentication system using:

- **Passport.js** for authentication strategies
- **Express Session** for session management
- **Role-based access control** for authorization
- **Bcrypt** for secure password hashing

### User Roles

- **Admin**: Full system access, laptop inventory management, customer management, sales analytics
- **Customer**: Shopping access, cart management, order placement, account management

## File Upload

The application supports file uploads for:

- Customer avatars
- Laptop product images (multiple angles and specifications)
- Product documentation and manuals

Files are handled using Multer middleware with validation and storage configuration optimized for laptop product imagery.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
