# Movie Management System (MovieProjectExpress)

A RESTful backend API for managing a movie database with poster image uploads. Built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **Multer** following the **MVC (Model-View-Controller)** architectural pattern.

---

## Features

- **MVC Architecture**: Clean separation between routing, controllers, models, and middleware.
- **Movie Management (CRUD)**:
  - Add new movies with text metadata and optional poster images.
  - View all movies with a total count.
  - View details of a single movie by its ID.
  - Update movie metadata and optionally replace the poster image.
  - Delete an entire movie and its associated image from the server.
  - Delete only the poster image while retaining the movie record.
- **File Uploads with Multer**:
  - Image files stored directly on disk (`uploads/` folder).
  - Unique timestamp-based filenames (`Date.now() + "-" + originalname`) to prevent name collisions.
  - Static file serving so uploaded posters can be viewed directly in the browser.
- **Storage Cleanup**: Safely checks and deletes previous/unused images from disk using Node's `fs` module to prevent orphan files.

---

## Tech Stack

- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **Environment Management**: Dotenv
- **Dev Tool**: Nodemon

---

## Project Structure

```text
MovieProjectExpress/
│
├── config/
│   └── db.js                 # MongoDB connection using Mongoose
├── controllers/
│   └── movieController.js    # Business logic for all 7 endpoints
├── middleware/
│   └── upload.js             # Multer diskStorage configuration
├── models/
│   └── Movie.js              # Mongoose schema and model definition
├── routes/
│   └── movieRoutes.js        # API endpoints and route mappings
├── uploads/                  # Uploaded movie poster images
├── views/                    # Presentation layer directory
├── .env                      # Environment configuration variables
├── .gitignore                # Files excluded from git
├── package.json              # Project dependencies and scripts
└── server.js                 # Main server entrypoint
```

---

## API Endpoints Reference

| Method | Endpoint | Description | Request Format |
| :---: | :--- | :--- | :--- |
| **GET** | `/` | Welcome message | None |
| **POST** | `/addMovie` | Create new movie with optional poster | `multipart/form-data` or `JSON` |
| **GET** | `/movies` | Get list of all movies and count | None |
| **GET** | `/movies/:id` | Get details of a single movie | Route parameter `:id` |
| **PUT** | `/editMovie/:id` | Update details & optional new poster | `multipart/form-data` or `JSON` |
| **DELETE** | `/deleteMovie/:id` | Delete movie and remove poster file | Route parameter `:id` |
| **DELETE** | `/deleteImage/:id` | Delete only the poster file | Route parameter `:id` |

---

## Environment Variables

Create a `.env` file (if not exists) in the root directory with the following variables:

```env
PORT=your-port-number
MONGO_URL=your-mongo-db-url
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB
Ensure MongoDB is running locally on port `27017` (via MongoDB service or MongoDB Compass).

### 3. Run Development Server
```bash
npm run server
```
The server will start on `http://localhost:1212`.

---

## Testing in Postman / Thunder Client

### Add Movie (`POST /addMovie`)
- **Body Type**: `Form-data` (or raw `JSON`)
- **Fields**:
  - `movieName` (Text): `Avengers Endgame`
  - `director` (Text): `Anthony Russo`
  - `category` (Text): `Action`
  - `releaseYear` (Text / Number): `2019`
  - `poster` (File): Choose an image file from your computer

### Accessing Uploaded Images
Once uploaded, poster images can be accessed in any web browser at:
```text
http://localhost:1212/uploads/<poster-filename>
```

