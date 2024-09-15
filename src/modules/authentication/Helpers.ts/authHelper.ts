import * as jwt from 'jsonwebtoken';

// Replace this with your actual secret key or use environment variables
const JWT_SECRET = 'process.env.JWT_SECRET';

interface TokenPayload {
  // Define the structure of your token payload
  userId: string;
  role: string;
  // Add other fields as needed
}

export default async function decodeToken(
  request: any,
  headerName: string,
): Promise<TokenPayload | null> {
  try {
    // console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
    console.log('token', request.headers);

    const token = request.headers[headerName] || request.cookies[headerName];

    if (!token) {
      throw new Error('No token provided');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;

    return decoded;
  } catch (error) {
    console.error('Token decoding error:', error.message);
    return null; // or throw an error if you prefer to handle it higher up
  }
}
