import { APIQUESTIONS } from "../actions";

const QUESTIONS_INITIAL_STATE = {
    questions: {},
};

const user = (state = QUESTIONS_INITIAL_STATE, action) => {
    switch (action.type) {
        case APIQUESTIONS:
            return {
                questions: action.payload,
            };
            default:
                return state;
    }
}
export default user;