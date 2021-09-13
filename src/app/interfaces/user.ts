export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    phone?: string;
    phone2?: string;
    obs?: string;
    lastVisit?: Date;
}