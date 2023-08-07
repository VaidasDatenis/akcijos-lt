import { Action } from '@ngrx/store';

export enum ActionTypes {
  Add = '[Cart] Add',
  Remove = '[Cart] Remove',
  Reset = '[Cart] Reset',
}

export class Increment implements Action {
  readonly type = ActionTypes.Add;
}

export class Decrement implements Action {
  readonly type = ActionTypes.Remove;
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}
