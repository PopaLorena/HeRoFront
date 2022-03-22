import { User } from "./user";

export class Member {
    constructor(
        public id?: number,
        public name?: string,
        public birthDate?: Date,
        public telNumber?: string,
        public email?: string,
        public photoUrl?: string,
        public startDate?: Date,
        public statutChangeDate?: Date,
        public university?: string,
        public userId?: number,
        public user?: User,
        public statut?: string
    ) { }
}
