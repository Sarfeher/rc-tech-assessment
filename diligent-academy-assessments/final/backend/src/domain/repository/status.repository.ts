import { Status } from "../status.entity";

export interface StatusRepository{
    findAllByBoardId(board_id: string): Promise<Status[]>;
    findById(id: string): Promise<Status>;
    create(status: Status): Promise<Status>;
    update(status: Status): Promise<Status>;
    delete(id: string): Promise<void>;
}