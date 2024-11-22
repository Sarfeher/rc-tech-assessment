import { BoardName } from "../domain/value-object/board-name";

export type CreateBoardProperties = {
  name: BoardName;
  description?: string;
};

export type CreateStatusProperties = {
  name: string;
  position: number;
  boardId: string;
}
