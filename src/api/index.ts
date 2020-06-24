import { Router } from "express";

import user from "./user";

const route = Router();
/**
 * @api {put} /tasks/:id Update a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiParam {String} title Task title
 * @apiParam {Boolean} done Task is done?
 * @apiParamExample {json} Input
 *    {
 *      "title": "Work",
 *      "done": true
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
route.use("/user", user);

export default route;
