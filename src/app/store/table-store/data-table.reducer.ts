import { createReducer, on } from '@ngrx/store';
import * as ItemActions from './data-table.actions';

export interface ItemState {
  items: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItems, state => ({ ...state, loading: true })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, loading: false, items })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);