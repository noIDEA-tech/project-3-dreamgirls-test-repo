import express from 'express';
import path from 'path';
// import { fileURLToPath } from 'url';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Use CommonJS __dirname equivalent in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Use a simpler context function to avoid type issues
import type { Request } from 'express';

const createContext = async ({ req }: { req: Request }) => {
  // Get auth token from request
  const token = req.headers.authorization || '';
  // Use your auth function to get user info
  return authenticateToken({ req });
};

const startServer = async () => {
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo server
  await server.start();
  
  // Initialize database connection
  try {
    await db();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
  
  // Create Express app
  const app = express();
  const PORT = process.env.PORT || 3001;
  
  // Standard middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow these origins
    credentials: true // Allow cookies if needed
  }));
  
  // Set up Apollo Server middleware
  // Using the /graphql endpoint with Express
  app.use(
    '/graphql',
    express.json(),
    
    (req, res, next) => {
      // This is a simple middleware that just passes control // The TypeScript error is in this function, 
    // so we type it as 'any' to bypass the issue
      (expressMiddleware(server, {
        context: createContext
      }) as any)(req, res, next);
    }
  );
  
  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }
  
  // Start Express server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
});




//revised 3.23.25 njw
// import express from 'express';
// import path from 'node:path';
// import type { Request, Response } from 'express';
// import db from './config/connection.js';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { typeDefs, resolvers } from './schemas/index.js';
// import { authenticateToken } from './utils/auth.js';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const startApolloServer = async () => {
//   await server.start();

//   // initialize database connection
//   try {
//     await db();
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error('Database connection error:', err);
//   }

//   const PORT = process.env.PORT || 3001;
//   const app = express();
  
//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());
  
  
//   // Set up Apollo middleware with our authentication context   
//   // Apollo GraphQL endpoint with middleware
//   // Using 'as any' type assertions to bypass TypeScript errors
//   app.use('/graphql', expressMiddleware(server, {
//     context: authenticateToken
//   }) as any); 
  
//   // Serve client/dist files in production
//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));
//     app.get('*', (_req: Request, res: Response) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }
  
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//   });
// };

// startApolloServer();