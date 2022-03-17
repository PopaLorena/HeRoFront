import { Member } from "./member";
import { Training } from "./training";

export class MemberTraining {
    constructor(
        public Id?: number,
        public MemberId?: number,
        public Member?: Member,
        public TrainingId?: number,
        public Training?: Training
    ) { }
}