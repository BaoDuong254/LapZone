# MVC User Management Application

## API Endpoints

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/`                       | Display all users       |
| GET    | `/create-user`            | Show create user form   |
| POST   | `/handle-create-user`     | Create a new user       |
| GET    | `/handle-view-user/:id`   | View/edit user details  |
| POST   | `/handle-update-user/:id` | Update user information |
| POST   | `/handle-delete-user/:id` | Delete a user           |

## Database Schema

The application uses a simple User model with the following fields:

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String?   @db.VarChar(255)
  email     String?   @db.VarChar(255)
  address   String?   @db.VarChar(255)
}
```

## Usage

1. **View Users**: Navigate to the home page to see a list of all users
2. **Create User**: Click "Create a new user" to add a new user
3. **View/Edit User**: Click "View" next to any user to see details or edit
4. **Delete User**: Click "Delete" next to any user (with confirmation prompt)
