import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type ResolverFn = (...args: unknown[]) => unknown;

const SECRET_KEY = process.env.JWT_SECRET_KEY || "secretkey";

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

const comparePasswords = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

const createToken = (admin: { id: number; email: string; role: string }) => {
  return jwt.sign(admin, SECRET_KEY, { expiresIn: "1d" });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

const withRole =
  (allowedRoles: ("ADMIN" | "TEACHER" | "PUPIL")[], resolver: ResolverFn) =>
  (...args: any[]) => {
    const [, , context] = args;
    const user = context.user;

    if (!user || !allowedRoles.includes(user.role)) {
      throw new Error("Unauthorized");
    }

    return resolver(...args);
  };

export { hashPassword, comparePasswords, createToken, verifyToken, withRole };
