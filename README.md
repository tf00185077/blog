# Project Name
Blog

## Tech Stack
- **Frontend**: Next.js
- **Backend**: Node.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Development Environment**: Docker Compose

### Prerequisites
- Docker
- Docker Compose

### Environment Setup
Before running the project, make sure to set the `NODE_ENV` environment variable:
- For development: `NODE_ENV=development`
- For production: `NODE_ENV=production`

### Running the Project
1. Start the project using Docker Compose:
```bash
docker-compose up
```

### Stopping the Project
```bash
docker-compose down
```

### Database Management
#### Backup MongoDB Data
To backup your MongoDB data:
> ⚠️ **Important**: Make sure the containers are running before executing the backup command.

1. Ensure containers are running:
```bash
npm run backup-mongo
```

#### Restore MongoDB Data
To restore your MongoDB data, run:
> - **Warning**: Restoring data will overwrite existing database content. Please make sure to backup your current data first if needed to prevent data loss.
```bash
docker-compose --profile init up
```
