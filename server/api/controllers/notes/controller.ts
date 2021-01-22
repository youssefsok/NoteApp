import { Request, Response } from 'express';
import NotesServices from '../../services/notes.service';
import L from '../../../common/logger';
export class Controller {
  create(req: Request, res: Response): void {
    NotesServices.create(req.body.name, req.body.description).then((r) =>
      res.status(201).location(`/api/v1/notes`).json(r)
    );
  }
  all(req: Request, res: Response): void {
    NotesServices.all().then((r) => res.json(r));
  }

  cpu(req: Request, res: Response): void {
    L.info('cpu load');
    let rand = Math.random();
    for (let index = 1; index < 100; index++) {
      rand *= index;
    }
    res.status(200).json(rand);
  }
}
export default new Controller();
