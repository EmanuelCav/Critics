export interface User {
    _id: string;
    name: string;
    surname: string;
    tag: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface CounterUser {
    user: object;
    isAuth: boolean;
}

export interface SignUpUser {
    name: string;
    surname: string;
    tag: string;
    email: string;
    password: string;
    confirm: string;
}

export interface SignInUser {
    email: string;
    password: string;
}
