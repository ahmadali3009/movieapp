# MovieApp

A modern React application for discovering and exploring movies and TV shows.

## Features

- Browse popular movies and TV shows
- Search for specific titles
- View detailed information about movies and TV shows
- User authentication with JWT
- Responsive design for all devices
- Modern UI with smooth animations

## Docker Setup

This project includes Docker configuration for easy deployment.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

1. Build and run the Docker container:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   Open your browser and navigate to `http://localhost:80`

### Environment Variables

You can customize the application by setting environment variables in the `docker-compose.yml` file:

- `API_URL`: URL of the backend API
- `APP_ENV`: Environment (development, production, etc.)

## Development Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- React Query
- JWT Authentication
- CSS3 with custom animations

## ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
