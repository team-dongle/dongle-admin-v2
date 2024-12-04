import jwt from "jsonwebtoken";

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as {
      exp: number;
      [key: string]: string | number;
    } | null;

    if (decoded) return decoded.exp < Date.now() / 1000;

    return true;
  } catch {
    return true;
  }
};
