import { NoRecordCreated } from "../../infrastructure/error/no-record-created.error";
import { NoRecordFound } from "../../infrastructure/error/no-record-found";
import { NoRecordUpdated } from "../../infrastructure/error/no-record-updated.error";
import { RecordNameInvalid } from "../../infrastructure/error/record-name-invalid.error";
import { db } from "../../infrastructure/sqlite/db";
import { CreateStatusProperties } from "../../shared/types";
import { Status } from "../status.entity";

export class StatusRepository implements StatusRepository {
    async findAllByBoardId(boardId: string): Promise<Status[]> {
        const database = await db;
        const rows = await database.all(
            "SELECT * FROM statuses WHERE board_id = ? AND delete_at IS NULL",
            [boardId]
        );
        return rows.map(Status.fromPersistence);
    };

    async getById(id: string): Promise<Status> {
        const database = await db;
        const row = await database.get(
            "SELECT * FROM statuses WHERE id = ?",
            [id]
        );

        if (!row) {
            throw new NoRecordFound(id);
        }

        return Status.fromPersistence(row)
    };
    async create(properties: CreateStatusProperties): Promise<Status> {
        const database = await db;
        const { name, position, boardId } = properties
        try {
            const created = await database.get(
                "INSERT INTO statuses (name, position, board_id) VALUES (?, ?, ?) RETURNING *",
                [name, position, boardId]
            )

            if (!created) {
                throw new NoRecordCreated();
            }

            return Status.fromPersistence(created);
        } catch (error) {
            const sqliteError = error as { code?: string };

            if (sqliteError.code === "SQLITE_CONSTRAINT") {
                throw new RecordNameInvalid(name);
            }
            throw error;
        }
    };
    async update(status: Status): Promise<Status> {
        const database = await db;
        const {position, id} = status
        const name = status.name.getValue();

        try {
            const updated = await database.get(
                "UPDATE statuses SET name = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
                [name, position, id]
            )

            if (!updated) {
                throw new NoRecordUpdated(id);
            }

            return Status.fromPersistence(updated);
        } catch (error) {
            const sqliteError = error as { code?: string };

            if (sqliteError.code === "SQLITE_CONSTRAINT") {
                throw new RecordNameInvalid(name);
            }
            throw error;
        }
    };
    async delete(id: string): Promise<void> {
        const database = await db;
        const deleted = await database.run(
            "UPDATE statuses SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
            [id]
        );
        if (deleted.changes === 0) {
            throw new NoRecordUpdated(id);
        }
    };
}