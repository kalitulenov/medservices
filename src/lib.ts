import { SessionOptions } from "iron-session";


export interface SessionData {
    userId?: string;
    userorg?: string;
    userorgkod?: number;
    username?: string;
    usertype?: string;      // признак типа пользователя
    isOpen?: boolean;       // признак открыт меню
    isLoggedIn: boolean;    // признак авторизации
    isBlocked?: boolean;    // признак блокировки акаунта админом
    isAdd?: boolean;        // признак добавление записи в БД (POST)
}

// создаем сеанс по умолчанию чтобы использовать в первый раз
export const dafaultSession: SessionData = {
    isLoggedIn: false,
    isOpen: false,
    isAdd: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "daua-session",                // любое имя
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
        // Можно еще добавить срок жизни сессий
    }
}

