import { FastifyReply, FastifyRequest } from "fastify";
import { operations } from "../../../openapi-spec/types";
import { z } from "zod";
import { SqliteStatusRepository } from "../../../infrastructure/sqlite/repository/status.repository";
import { CreateStatus } from "../../use-cases/create-status";
import { Status } from "../../../domain/status.entity";
import { StatusName } from "../../../domain/value-object/status-name";

type RequestParams = operations["createStatus"]["parameters"]["path"];

export async function createStatusAction(
    req: FastifyRequest<{ Params: RequestParams; }>,
    res: FastifyReply
  ): Promise<void> {
    try {
      const paramsSchema = z.object({ boardId: z.number({coerce: true}) });
      const bodySchema = z.object({
        name: z.string(),
        position: z.number(),
        boardId: z.number({coerce: true}),
      });
  
      const { boardId } = paramsSchema.parse(req.params);
      const body = bodySchema.parse(req.body);
      

      const newStatusProperties = {
        id: "", 
        name: new StatusName(body.name),
        board_id: boardId.toString(),
        position: body.position
        };
  
      const useCase = new CreateStatus(new SqliteStatusRepository());
      const newStatus = await useCase.onRequest(new Status(newStatusProperties));
  
      const response = newStatus.toView();
      return res.status(201).send(response);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }