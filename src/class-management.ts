import { Express } from "express";
import * as express from "express";
import { connect } from "mongoose";
import schoolManagementRouter from "./routes";

export class ClassManagement {
  app: Express;

  constructor() {
    this.app = express();
    this.init();
  }

  // inital app.
  private init() {
    this.app.use(express.json());
    this.app.use(schoolManagementRouter);
  }

  //
  start(port, dbConnectionString) {
    this.app.listen(port, () => {
      console.log(`Class mangement is runing on port ${port}`);
      // connect to database.
      connect(
        dbConnectionString,
        { useNewUrlParser: true }
      ).then(() =>
        console.log(
          `connected to mongo db with ${dbConnectionString} connection string.`
        )
      );
    });
  }
}
