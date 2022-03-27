import { Timestamp } from "firebase/firestore";

export interface User {

    name: string,
    id: string,
    timestamp: string,

}

export interface Comment {
    name: string,
    comment: string,
    timestamp: Timestamp,
}

