import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

async function encryptPassword(password) {
    const SALT_ROUNDS = 10;
    return await bcrypt.hash(password, SALT_ROUNDS)
}

async function comparePassword(password: string, savedPassword: string) {
    return await bcrypt.compare(password, savedPassword);
}

function generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      })
}

export { encryptPassword, comparePassword, generateToken }