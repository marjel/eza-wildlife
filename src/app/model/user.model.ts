import { UserType } from "./user-type.enum";

export interface User {
    name: string;
    type: UserType;
    email?: string;
}