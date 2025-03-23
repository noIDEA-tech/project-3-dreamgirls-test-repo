import { buildSchema } from 'graphql';
import fs from 'fs';
import path from 'path';

// Simple test to validate GraphQL schema
try {
  // Read the typeDefs file
  const schemaPath = path.join(__dirname, '../schemas/typeDefs.ts');
  const schemaFile = fs.readFileSync(schemaPath, 'utf8');
  
  // Extract the GraphQL schema string
  const schemaMatch = schemaFile.match(/`([^`]+)`/s);
  
  if (!schemaMatch) {
    throw new Error('Could not extract GraphQL schema from typeDefs file');
  }
  
  // Try to build the schema to validate it
  const schema = buildSchema(schemaMatch[1]);
  
  console.log('✅ GraphQL schema is valid');
  process.exit(0);
} catch (error) {
  console.error('❌ GraphQL schema validation failed:', error);
  process.exit(1);
}