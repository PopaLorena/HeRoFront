import { Meeting } from "./meeting";
import { Member } from "./member";

export class MemberMeeting {
    constructor(
        public id?: number,
        public memberId?: number,
        public member?: Member,
        public meetingId?: number,
        public meeting?: Meeting
    ) { }
}