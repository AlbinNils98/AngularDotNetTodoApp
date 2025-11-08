
# Fullstack Todo Application
### Overview

This repository contains a fullstack Todo application:

Backend: ASP.NET Core Web API (.NET 9)

Frontend: Angular (latest version)

The application demonstrates a simple Todo list with CRUD operations and a monolithic project structure.

#### Project Structure
```
my-monolith/
├── client/               # Angular frontend
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
├── server/               # ASP.NET Core backend API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Migrations/
│   ├── Program.cs
│   └── Api.csproj
└── Api.sln    # Solution file (open this in Visual Studio)
```

***Notes:***

The .sln file is at the root to make it easy to manage multiple projects (server, tests, future shared libraries).

Visual Studio .vs folder, bin/, obj/ and frontend node_modules/ are ignored in Git.

---

## Getting Started
### Prerequisites

- SQL server
- .NET 9 SDK
- Node.js + npm (for Angular)
- Visual Studio 2022 or newer (optional, for backend)
- Angular CLI (optional, for frontend):
```bash
npm install -g @angular/cli
```
---

### SQL Database setup

#### 1. Ensure your connection string is correct

In server/appsettings.json (or appsettings.Development.json), make sure the connection string points to your local SQL Server:
```
"ConnectionStrings": {
  "DefaultConnection": "{YOUR CONNECTION STRING HERE}"
}
```
#### 2️. Open Package Manager Console in Visual Studio

1. Tools → NuGet Package Manager → Package Manager Console
2. Set Default project to your backend project (Api).

#### 3️. Apply existing migrations

Run:
```bash
Update-Database
```
This will create the database (if it doesn’t exist) and apply all migrations in order.
EF Core will execute the schema changes defined in the existing migration files.

#### 4. Verify in SQL Server Management Studio (SSMS)

Open SSMS and connect to your local SQL Server instance.
Look for the database you specified in the connection string.
Expand Tables → you should see all tables defined in the migrations (Todos, Books, etc.).

---

### Frontend Setup (Angular)

#### 1. Navigate to the client/ folder:
```bash
cd client
```

#### 2. Install dependencies:
```bash
npm install
```

#### 3. Run the Angular development server:
```bash
npm start
```

#### 4. Open your browser at http://localhost:4200.

The frontend communicates with the backend API at https://localhost:7111.

#### Usage
- Add a Todo
- Mark as Completed
- Delete Todo

All changes are persisted via the ASP.NET Core Web API using Entity Framework Core and SQL Server.

---

### Backend Setup (ASP.NET Core API)

1. Go to \server and restore NuGet packages:
```bash
cd server
dotnet restore
```
2. Build the backend:
```bash
dotnet build
```
3. Run the backend:
```bash
dotnet run --project Api.csproj
```

By default, the API will run at https://localhost:7111 or http://localhost:5091.

**Notes:**
You can also run the backend through visual studios integrated run command. (open solution Api.sln)
