import { createReducer, on, Action } from '@ngrx/store';
import * as ItemActions from './data-table.actions';
import { ItemElement } from 'src/app/interfaces/ItemElement.interface';


export interface ItemState {
    items: ItemElement[];
    selectedItem: ItemElement | null;
}

export const initialState: ItemState = {
    items: [],
    selectedItem: null
};

export function itemReducer(state: ItemState | undefined, action: Action) {
    return _itemReducer(state, action);
}

const _itemReducer = createReducer(
    initialState,
    
    on(ItemActions.addOrUpdateItem, (state, { item }) => {
        const index = state.items.findIndex((existing) => existing.id === item.id); // Using id for uniqueness
      
        if (index !== -1) {
          const updatedItems = [...state.items];
          updatedItems[index] = { ...updatedItems[index], ...item };
          return { ...state, items: updatedItems };
        } else {
          return { ...state, items: [...state.items, item] };
        }
      }),

    on(ItemActions.selectItem, (state, { item }) => ({
        ...state,
        selectedItem: item
    })),

    on(ItemActions.addMultipleItems, (state, { items }) => {
        return { ...state, items: [...state.items, ...items] };
      })
    
);
