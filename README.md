### Stawianie BackEndu (środowisko deweloperskie)
1. ```cd backend```
2. .env.dist przerobic na .env
3. ```npm install```
4. .env => SECRET_ACCESS_TOKEN="```your-secret-access-token```"
5. .env => DATABASE_URL="file:```your-db-file-name```.db"
6. ```npx prisma migrate dev```
7. ```npm run dev```

### Stawianie FrontEndu (środowisko deweloperskie)
1. ```cd frontend```
2. ```npm install```
3. ```npm start```
