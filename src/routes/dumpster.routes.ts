import express, { Router } from 'express';
import DumpsterController from '../controllers/dumpster.controller';

const router: Router = express.Router();
const dumpsterController = new DumpsterController();

router
  .route('/')
  .get(dumpsterController.getDumpsters)
  .post(dumpsterController.createDumpster);
router
  .route('/:id')
  .get(dumpsterController.getDumpsterByID)
  .put(dumpsterController.updateDumpster)
  .delete(dumpsterController.deleteDumpster);

export default router;
