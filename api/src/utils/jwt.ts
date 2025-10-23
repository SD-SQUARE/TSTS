import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "8d",
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  } catch (error) {
    return null;
  }
};
