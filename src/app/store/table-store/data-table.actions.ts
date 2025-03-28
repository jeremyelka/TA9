import { createAction, props } from '@ngrx/store';
import { ItemElement } from 'src/app/interfaces/ItemElement.interface';

export const addOrUpdateItem = createAction(
  '[Item] Add or Update Item',
  props<{ item: ItemElement }>()
);

export const selectItem = createAction(
    '[Item] Select Item',
    props<{ item: ItemElement }>()
);

export const addMultipleItems = createAction(
    '[Item] Add Multiple Items',
    props<{ items: ItemElement[] }>()
);