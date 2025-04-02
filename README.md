# WHOOP MCP Server

An MCP (Machine Conversation Protocol) server implementation for the WHOOP API.

## Overview

This project provides a server that interfaces with the WHOOP API, allowing you to interact with your WHOOP fitness data. It follows the MCP architecture pattern, which enables interoperability with AI assistants.

## Features

- Access to WHOOP user profile data
- Retrieve sleep data and analytics
- Fetch workout information
- Get recovery metrics
- View cycle data

## Prerequisites

- Node.js (v16+)
- WHOOP account with API access
- WHOOP API key (obtained from [WHOOP Developer Portal](https://developer.whoop.com/))

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/RyanLisse/whoop-mcp-server.git
   cd whoop-mcp-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` template:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file and add your WHOOP API key and other configuration options.

## Usage

### Starting the Server

```
npm start
```

For development with auto-restart:
```
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000).

### API Endpoints

All API endpoints require authentication with your WHOOP API key.

#### User Profile
- `GET /whoop/profile` - Get user profile information

#### Sleep Data
- `GET /whoop/sleep?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Get sleep data for the specified date range

#### Workout Data
- `GET /whoop/workouts?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Get workout data for the specified date range

#### Recovery Data
- `GET /whoop/recovery?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Get recovery data for the specified date range

#### Cycle Data
- `GET /whoop/cycles?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Get cycle data for the specified date range

## Authentication

Add your WHOOP API token to the Authorization header in your requests:

```
Authorization: Bearer YOUR_WHOOP_API_TOKEN
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
