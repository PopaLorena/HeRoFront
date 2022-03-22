import { Member } from "./member";
import { Training } from "./training";

export class MemberTraining {
    constructor(
        public id?: number,
        public memberId?: number,
        public member?: Member,
        public trainingId?: number,
        public training?: Training
    ) { }
}