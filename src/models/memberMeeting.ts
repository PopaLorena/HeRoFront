import { Meeting } from "./meeting";
import { Member } from "./member";

export class MemberMeeting {
    constructor(
        public Id?: number,
        public MemberId?: number,
        public Member?: Member,
        public MeetingId?: number,
        public Meeting?: Meeting
    ) { }
}