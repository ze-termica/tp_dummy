export interface Car {
    // car info
    plate: string;
    ownerId: string
    model: string;
    oilSpec: string;
    lastVisit: Date;
    nextVisit: Date;
    history: Array<Service>;
    obs: string;
    // owner info
    email: string;
    displayName: string;
    photoURL: string;
    phone?: string;
}

export interface Service {
    id: string;
    plate: string;
    date: Date;
    itens: Array<string>;
    km: number;
    last_user: string;
}