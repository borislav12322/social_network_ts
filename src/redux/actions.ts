import {ActionMessageType} from "./messages-reducer";
import {ActionProfileType} from "./profile-reducer";
import {InitialStateType} from "./users-reducer";

export type dispatchType = ActionMessageType | ActionProfileType | InitialStateType