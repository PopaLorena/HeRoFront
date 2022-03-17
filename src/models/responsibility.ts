import { Events } from "./events";
import { Member } from "./member";

export class Responsibility {
    constructor(
        public Id?: number,
        public Name?: string,
        public StartDate?: Date,
        public Description?: string,
        public EndDate?: Date,
        public ResponsibleId?: number,
        public Responsible?: Member,
        public EventId?: number,
        public Event?: Events,
    ) { }
}