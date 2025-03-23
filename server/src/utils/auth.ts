//copied from activity 24-Stud_Authentication-with-GraphQL-server
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = ({ req }: any) => {
  // Allows token to be sent via req.body, req.query, or headers

  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    return req;
  }

  // Try to verify the token
  try {
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    
  // If the token is valid, attach the user data to the request object
    req.user = data;
  } catch (err) {
    
  // If the token is invalid, log an error message
    console.log('Invalid token');
  }
  
  // Return the request object
  return req;
};
export const signToken = (username: string, email: string, _id: unknown) => {
  // Create a payload with the user information
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables

  // Sign the token with the payload and secret key, and set it to expire in 2 hours
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

//CHANGED CODE TO ORIGINAL CONFIG - 3.18.25
// import { Request } from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// interface TokenUser {
//   _id: string;
//   username: string;
//   email: string;
// }

// interface AuthContext {
//   user?: TokenUser;
//   req: Request;
// }

// // Secret key should be stored in .env file
// const secret = process.env.JWT_SECRET || 'mysecretsshhhhh';
// const expiration = '2h';

// const auth = {
//   // Function to sign token
//   signToken( user : TokenUser): string {
//     const payload = { _id: user._id, username: user.username, email: user.email };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },

//   // Middleware for resolvers
//   authMiddleware({ req }: { req: Request }): AuthContext {
//     // Get token from headers
//     let token = req.headers.authorization || '';

//     // ["Bearer", "<tokenvalue>"]
//     if (token.startsWith('Bearer ')) {
//       token = token.slice(7, token.length).trim();
//     }

//     if (!token) {
//       return { req };
//     }

//     try {
//       // Verify token and get user data
//       const { data } = jwt.verify(token, secret) as { data: TokenUser };
//       return { user: data, req };
//     } catch {
//       console.log('Invalid token');
//       return { req };
//     }
//   },

//   // Helper to verify a user is logged in
//   checkAuth(context: AuthContext): TokenUser {
//     if (!context.user) {
//       throw new Error('You must be logged in to perform this action');
//     }
//     return context.user;
//   },
// };

// export { auth, AuthContext, TokenUser };