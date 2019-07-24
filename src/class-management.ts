import { Express } from "express";
import * as express from "express";
import { connect , set } from "mongoose";
import schoolManagementRouter from "./routes";
import * as cors from 'cors';
import { InitialDefaultData } from "./init-default-data";
export class ClassManagement {
  app: Express;

  constructor() {
    this.app = express();
    this.init();
  }

  // initial app.
  private init() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(schoolManagementRouter);
    // this.useErrorHandler();
    InitialDefaultData();
  }

  // assign error handlers.
  useErrorHandler() {
    process.on('uncaughtException' , err => {
      console.log(err);
    });
  }

  // start application method.
  start(port, dbConnectionString) {
    this.app.listen(port, () => {
      console.log(`Class management is running on port ${port}`);
      // set mongoose configurations;
      set('useFindAndModify' , false);
      set('useCreateIndex' , true);
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
