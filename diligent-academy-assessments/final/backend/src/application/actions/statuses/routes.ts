import { FastifyInstance } from "fastify";
import { createStatusAction } from "./create-status.action";

export default async function (fastify: FastifyInstance) {
/*     fastify.get("/boards", getAllAction);
 */    fastify.post("/boards/:id/statuses", createStatusAction);
    /* fastify.get("/boards/:id", getAction);
    fastify.patch("/boards/:id", updateAction);
    fastify.delete("/boards/:id/delete", deleteAction); */
  }
  