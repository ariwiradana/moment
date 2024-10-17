import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "622p6HVzUZ9CvqvwoaJ2on2kP6qGjMzwJgwAtpBy9J3HhFgdIT9ZgYwTBBfww0emU0wTvT4ABm2D6L1jbrckJyJLxmuQ9S2Zgwmf";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;

  const decoded = jwt.decode(token) as DecodedToken | null;

  if (decoded && decoded.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  return true;
};
