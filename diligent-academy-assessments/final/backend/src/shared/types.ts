import { BoardName } from "../domain/value-object/board-name";
import { StatusName } from "../domain/value-object/status-name";

export type CreateBoardProperties = {
  name: BoardName;
  description?: string;
};

export type CreateStatusProperties = {
  name: StatusName;
  position: number;
  boardId: string;
}
