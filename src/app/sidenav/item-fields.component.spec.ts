import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldsComponent } from './item-fields.component';

describe('ItemFieldsComponent', () => {
  let component: ItemFieldsComponent;
  let fixture: ComponentFixture<ItemFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
