# Cat NG Application
Angular Cat Management Application

A modern Angular application that consumes the Cat API and provides a simple interface to manage cats (Create, View, Update, Delete).

This project demonstrates modern Angular architecture and best practices using:
    Angular 21
    Standalone components
    Signals-based state management
    Angular Material UI
    Strict TypeScript
    Zoneless change detection
    Feature-based folder structure

The goal of the assignment was to build a frontend application that consumes the provided Cat API and demonstrates clean architecture, maintainable code, and modern Angular patterns.

# Tech Stack:
    Technology	Purpose
    Angular 21	Frontend framework
    Angular Signals	State management
    Angular Material	UI components
    TypeScript (strict)	Type safety
    Express.js	Lightweight proxy server
    Node.js	Runtime for proxy server
    Application Features

# The application implements all API endpoints:

 # Feature	Endpoint
    List all cats	GET /list
    View cat details	GET /list?id=
    Create a new cat	POST /create
    Update cat	PUT /update?id=
    Delete cat	DELETE /delete?id=

 # UI Features:
  # Responsive Material card grid
    Cat detail view
    Create/Edit cat form
    Loading states
    Error handling
    Empty state UI
    Confirmation dialog for delete
    Project Architecture

# The application follows a feature-based architecture commonly used in large Angular applications.
    src/
    └── app/
        ├── core/
        │     ├── api/
        │     │     └── cat.service.ts
        │     │
        │     ├── store/
        │     │     └── cat.store.ts
        │     │
        │     └── models/
        │           └── cat.model.ts
        │
        ├── features/
        │     ├── cat-list/
        │     ├── cat-detail/
        │     └── cat-form/
        │
        ├── shared/
        │     └── components/
        │           └── confirm-dialog/
        │
        ├── app.routes.ts
        ├── app.config.ts
        └── app.component.ts

# Architecture Explanation
    core/
        Contains application-wide logic:
    API services
        Application state (Signals store)
    Data models
        These are singletons used across the application.
    features/
        Feature modules representing screens:
        cat-list → displays all cats
        cat-detail → shows cat details
        cat-form → create and edit cat
        Each feature contains its own UI and logic.
    shared/
        Reusable UI components.

# Responsibilities:
    Layer	    Responsibility
    Component	UI rendering
    Store	    State management
    Service	    API communication

This separation keeps the UI clean and maintainable.

# Proxy Server

While implementing the application, the Create / Update / Delete endpoints returned a 502 error when called directly from the browser due to how the API Gateway handles browser-origin requests.

To solve this, a lightweight Express proxy server was added to forward requests to the Cat API.

This ensures the Angular application can consume the API correctly.

Proxy Implementation
Angular App
      ↓
Express Proxy (localhost:3000)
      ↓
Cat API (AWS)

The proxy forwards requests to the API while avoiding browser-origin issues.

Proxy file:

server.js

Example proxy endpoint:

POST /api/create
PUT /api/update?id=
DELETE /api/delete?id=
GET /api/list

Running the Application
1 Install dependencies
npm install
2 Start the proxy server
node server.js

Server will run at:

http://localhost:3000

3 Start Angular
ng serve

Angular will run at:

http://localhost:4200

Angular Version
Angular CLI       : 21.2.2
Angular           : 21.2.4
Node.js           : 24.14.0
npm               : 11.9.0
UI Design

The UI uses Angular Material components:
    MatCard
    MatButton
    MatIcon
    MatSpinner
    MatDialog
    MatFormField
    MatInput

Cats are displayed in a card grid layout as required by the assignment.
    Tables were intentionally avoided.
    Key Angular Features Used
    Standalone Components
    Angular Signals
    Strict TypeScript
    Reactive Forms
    Feature-based architecture
    Zoneless change detection
    Material UI

# Notes:
    This project focuses on:
    maintainable Angular architecture
    clean separation of concerns
    modern Angular best practices

