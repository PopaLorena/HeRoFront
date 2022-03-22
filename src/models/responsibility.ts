import { Events } from "./events";
import { Member } from "./member";

export class Responsibility {
    constructor(
        public id?: number,
        public name?: string,
        public startDate?: Date,
        public description?: string,
        public endDate?: Date,
        public responsibleId?: number,
        public responsible?: Member,
        public eventId?: number,
        public event?: Events,
    ) { }
}