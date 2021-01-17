import { Request, Response } from 'express';
import NotesServices from '../../services/notes.service'
export class Controller{

    create(req: Request, res: Response): void {
        NotesServices.create(req.body.name,req.body.description).then((r) =>
          res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
        );
      }

}
export default new Controller();