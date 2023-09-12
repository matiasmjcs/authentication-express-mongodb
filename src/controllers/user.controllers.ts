import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.models'; // Asegúrate de importar correctamente tu modelo User
import jwt from "jsonwebtoken";
import { connect } from '../database/database';

export class UserService {
    async signUp(req: Request, res: Response) {
        try {
            connect()
            const requestBody = req.body; // No necesitas await aquí
            const { username, password, email } = requestBody;
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            return res.status(201).json({ message: 'User created successfully', success: true, savedUser });
        } catch (error: any) {
            console.error(error); // Imprime el error en la consola para depuración
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req: Request, res: Response) {
        try {
            connect()
            const reqBody = req.body; // No necesitas await aquí
            const { email, password } = reqBody;

            // Verificar si el usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }

            // Verificar si la contraseña es correcta
            const validPassword = await bcryptjs.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            // Crear datos del token
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email,
            };

            // Crear token
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
                expiresIn: '1d',
            });

            // Configurar la cookie del token
            res.cookie('token', token, {
                httpOnly: true,
            });

            return res.status(200).json({ message: 'Login successful', success: true });
        } catch (error: any) {
            console.error(error); // Imprime el error en la consola para depuración
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
