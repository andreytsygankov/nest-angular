import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly address: string;
    readonly email: string;
    readonly password: string;
}
