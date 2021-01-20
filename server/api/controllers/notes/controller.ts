import { Request, Response } from 'express';
import NotesServices from '../../services/notes.service';
export class Controller {
  create(req: Request, res: Response): void {
    NotesServices.create(req.body.name, req.body.description).then((r) =>
      res.status(201).location(`/api/v1/notes`).json(r)
    );
  }
  all(req: Request, res: Response): void {
    NotesServices.all().then((r) => res.json(r));
  }
}
export default new Controller();
