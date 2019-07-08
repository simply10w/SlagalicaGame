import * as fromPlayer from '@slagalica-app/singleplayer/reducers';
import { createSelector } from '@ngrx/store';
import { Dictionary } from 'lodash';

const getGame = fromPlayer.getSpojniceGame;

const getIsFinished = createSelector(
  getGame,
  game => game.finished
);

const getConnections = createSelector(
  getGame,
  game => game.connections
);

const getLeftSide = createSelector(
  getGame,
  game => game.leftSide
);

const getConnectionsTables = createSelector(
  getConnections,
  connections =>
    connections.reduce(
      (tables, conn) => {
        tables.from[conn.from] = true;
        tables.to[conn.to] = true;
        return tables;
      },
      {
        from: {} as Dictionary<boolean>,
        to: {} as Dictionary<boolean>
      }
    )
);

const getLeftSideTiles = createSelector(
  getLeftSide,
  getConnectionsTables,
  (leftSide, tables) =>
    leftSide.map((text, index) => ({
      text,
      color: tables.from[index]
    }))
);

const getRightSide = createSelector(
  getGame,
  game => game.rightSide
);

const getRightSideTiles = createSelector(
  getRightSide,
  getConnectionsTables,
  (rightSide, tables) =>
    rightSide.map((text, index) => ({
      text,
      color: tables.to[index]
    }))
);

const getPlayerPoints = createSelector(
  getGame,
  game => game.points
);

const _getCurrentIndex = createSelector(
  getGame,
  game => game.currentIndex
);

const getCurrentIndex = createSelector(
  _getCurrentIndex,
  getIsFinished,
  (index, finished) => (finished ? -1 : index)
);
export const selectors = {
  getCurrentIndex,
  getConnections,
  getLeftSideTiles,
  getRightSideTiles,
  getPlayerPoints
};
