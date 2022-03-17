import { User } from "./user";

export class Member {
    constructor(
        public Id?: number,
        public Name?: string,
        public BirthDate?: Date,
        public TelNumber?: string,
        public Email?: string,
        public PhotoUrl?: string,
        public StartDate?: Date,
        public StatutChangeDate?: Date,
        public University?: string,
        public UserId?: number,
        public User?: User,
        public Statut?: string
    ) { }
}
