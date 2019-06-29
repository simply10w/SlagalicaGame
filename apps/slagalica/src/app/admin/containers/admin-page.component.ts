import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@slagalica/data';
import { Store, select } from '@ngrx/store';
import * as fromAdmin from '@slagalica-app/admin/reducers';
import { AdminPageActions } from '@slagalica-app/admin/actions';

@Component({
  selector: 'sla-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent implements OnInit {
  pendingUsers$ = this.store.pipe(select(fromAdmin.getAllUsers));
  query = '';

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(AdminPageActions.getPendingUsers());
  }

  accept(user: User) {
    this.store.dispatch(AdminPageActions.acceptPendingUser({ user: user._id }));
  }

  reject(user: User) {
    this.store.dispatch(AdminPageActions.rejectPendingUser({ user: user._id }));
  }
}
