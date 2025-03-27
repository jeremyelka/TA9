import { createAction, props } from '@ngrx/store';

export const loadItems = createAction('[Item List] Load Items');
export const loadItemsSuccess = createAction('[Item List] Load Items Success', props<{ items: any[] }>());
export const loadItemsFailure = createAction('[Item List] Load Items Failure', props<{ error: any }>());