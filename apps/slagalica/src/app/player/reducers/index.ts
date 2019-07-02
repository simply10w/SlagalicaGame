import * as fromAuth from '@slagalica-app/auth/reducers';
import { createSelector } from '@ngrx/store';
import { ClientGameRoomOptionsDto } from '@slagalica/data';

export const getPlayer = createSelector(
  fromAuth.getUser,
  fromAuth.getToken,
  (user, token) =>
    <ClientGameRoomOptionsDto>{
      userName: user.userName,
      userId: user._id,
      token
    }
);
