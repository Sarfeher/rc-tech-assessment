import { StatusName } from "./value-object/status-name";

type StatusDbProperties = {
    id: number;
    name: string;
    board_id: number;
    position: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

type StatusProperties = {
    id: string;
    name: StatusName;
    board_id: string;
    position: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

type ViewProperties = {
    id: string;
    name: string;
    boardId: string;
    position: number;
    active: boolean;
}

export class Status {
    constructor(private properties: StatusProperties) {}

    public get id(): string {
        return this.properties.id;
    }

    public get name(): StatusName {
        return this.properties.name;
    }

    public get boardId(): string {
        return this.properties.board_id;
    }

    public get position(): number {
        return this.properties.position;
    }

    public isActive(): boolean {
        return !this.properties.deletedAt;
    }

    public toView(): ViewProperties {
        return {
            id: this.id,
            name: this.name.getValue(),
            boardId: this.boardId,
            position: this.position,
            active: this.isActive()
        };
    }

    static fromPersistence(dbProps: StatusDbProperties): Status {
        return new Status({
          id: dbProps.id.toString(),
          name: new StatusName(dbProps.name),
          board_id: dbProps.board_id.toString(),
          position: dbProps.position,
          createdAt: dbProps.created_at,
          updatedAt: dbProps.updated_at,
          deletedAt: dbProps.deleted_at,
        });
      }
    
    static fromInput(status: StatusProperties): Status {
        return new Status(status);
    }
}