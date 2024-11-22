import { StatusRepository } from "../../../domain/repository/status.repository";
import { Status } from "../../../domain/status.entity";

export class SqliteStatusRepository implements StatusRepository{
   async findAllByBoardId(board_id: string): Promise<Status[]> {
        throw new Error("Method not implemented.");
    }
   async findById(id: string): Promise<Status> {
        throw new Error("Method not implemented.");
    }
   async create(status: Status): Promise<Status> {
        throw new Error("Method not implemented.");
    }
   async update(status: Status): Promise<Status> {
        throw new Error("Method not implemented.");
    }
   async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}