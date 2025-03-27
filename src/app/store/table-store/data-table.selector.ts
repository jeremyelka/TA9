import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './data-table.reducer';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const selectAllItems = createSelector(selectItemState, (state: ItemState) => state.items);
export const selectLoading = createSelector(selectItemState, (state: ItemState) => state.loading);