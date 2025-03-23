import { signToken } from '../utils/auth';

// Test JWT token generation and structure
try {
  // Test data
  const testUsername = 'testuser';
  const testEmail = 'test@example.com';
  const testId = '123456789012';
  
  // Create a user object
  const user = {
    _id: testId,
    username: testUsername,
    email: testEmail
  };
  
  // Generate token
  const token = signToken(testUsername, testEmail, testId);
  
  // Validate token format
  if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
    throw new Error('Generated token does not match JWT format');
  }
  
  console.log('✅ JWT authentication token generation works correctly');
  process.exit(0);
} catch (error) {
  console.error('❌ Authentication test failed:', error);
  process.exit(1);
}