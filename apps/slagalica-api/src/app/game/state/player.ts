import { type, Schema } from 'colyseus.js';

interface IPlayerInfo {
  userId: string;
  userName: string;
}
export class Player extends Schema {
  @type('string')
  userName: string;

  @type('string')
  userId: string;

  @type('number')
  totalPoints: number;

  @type('string')
  playerId: string;

  constructor(playerId: string, playerInfo: IPlayerInfo) {
    super();
    this.playerId = playerId;
    this.userName = playerInfo.userName;
    this.userId = playerInfo.userId;
    this.totalPoints = 0;
  }
}
