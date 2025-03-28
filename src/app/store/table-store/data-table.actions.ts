import { createAction, props } from '@ngrx/store';

interface ItemElement {
    id:number,
    color: string;
    name: string;
    createDate: string;
    lastUpdate: string;
    createdBy: string;
  }

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