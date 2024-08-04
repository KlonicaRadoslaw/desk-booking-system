# Desk Booking System

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Screenshots](#screenshots)

## Project Description

The Desk Booking System is a comprehensive solution designed to manage desk reservations in an office environment. It provides both administrative and user functionalities, allowing users to create, view, and manage desk reservations, while administrators have additional capabilities to manage desks and locations.

## Features

- **User Authentication:** Secure login and registration.
- **Desk Management:** Admins can create, update, and delete desk information.
- **Reservation Management:** Users can create and manage their reservations.
- **Location Management:** Admins can manage office locations.
- **Responsive Design:** User-friendly interface that works on both desktop and mobile devices.

## Tech Stack

### Frontend:
- React
- TypeScript
- CSS

### Backend:
- ASP.NET Core
- Entity Framework Core
- JWT for authentication

## Installation

### Prerequisites:
- Node.js and npm
- .NET SDK

### Steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/KlonicaRadoslaw/desk-booking-system.git
    cd desk-booking-system
    ```

2. **Install frontend dependencies:**
    ```sh
    cd frontend
    npm install
    ```

3. **Install backend dependencies:**
    ```sh
    cd ../backend
    dotnet restore
    ```

4. **Set up the database:**
    Update the connection string in `appsettings.json` to point to your database. Then, apply the migrations:
    ```sh
    dotnet ef database update
    ```

5. **Run the backend server:**
    ```sh
    dotnet run
    ```

6. **Run the frontend application:**
    ```sh
    cd ../frontend
    npm start
    ```

## Usage

1. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

2. **Login or Register:**
    - If you don't have an account, register a new one.
    - Log in with your credentials.

3. **Admin Functionality:**
    - As an admin, you can manage desks and locations from the admin panel.

4. **User Functionality:**
    - As a user, you can create new reservations, view your reservations, and browse available desks.

## Running Tests

```sh
dotnet test
```

## Screenshots

### Home Page
![Home Page](screenshots/home.png)

### New Reservation
![New Reservation](screenshots/newReservation.png)

### Locations
![Locations](screenshots/locations.png)

### Available Desks
![Available Desks](screenshots/availableDesks.png)