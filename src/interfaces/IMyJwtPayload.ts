export interface MyJwtPayload {
    fullName: string;  // The full name of the user encoded in the token
    email: string;     // The email of the user encoded in the token
    iat?: number;      // The "issued at" timestamp (optional)
    exp?: number;      // The "expiration" timestamp (optional)
}
