export interface Critic {
    _id: string;
    issue: string;
    description: string;
    content: string;
    category: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
}

export interface CounterCritic {
    critics: object[];
    critic: object;
    trends: object[];
}

export interface CriticCreate {
    issue: string;
    description: string;
    content: string;
    category: string;
}

export interface CriticUpdate{
    _id?: string;
    issue: string;
    description: string;
    content: string;
    category: string;
}