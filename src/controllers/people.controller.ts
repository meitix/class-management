import { Request, Response } from 'express';
import { Person } from '../models/entities/people.schema';
import { Role } from '../models/entities/role.entity';
import { IPerson } from '../models/interfaces/people/person.interface';
import tokenManager from '../helpers/token.manager';
import { Types, Mongoose } from 'mongoose';
import * as _ from 'lodash';
import { School } from '../models/entities/school.entity';
import { Student } from '../models/entities/student.entity';
import { User } from '../models/entities/user.entity';

export class PeopleController {
  // fetch all.
  async fetch(req: Request, res: Response) {
    let data = null;
    // check if there is id in params read by id.
    if (req.params.id) data = await Person.findById(req.param('id'));
    // find by req.body in lack of id.
    else {
      data = await Person.find(req.query);
    }
    res.send(data);
  }

  // search people by term.
  async search(req: Request, res: Response) {
    const term = req.params.term;
    const schoolId = req.params.id;
    if (!term || !schoolId) {
      res.status(400).end();
      return;
    }

    let teacherRoleId=  await (await Role.findOne( { title: 'معلم' } ))._id;
    let school = await School.findById(schoolId);
    school.personnel = school.personnel.filter(m => {
      return m.roles.find(r => {
        return r.toString() === teacherRoleId.toString();
      });
    });

    // search condition.
    const condition = {
      _id: {
        $in: school.personnel.map(p => p.person)
      },
      $or: [
        { firstname: { $regex: `.*${term}.*` } },
        { lastname: { $regex: `.*${term}.*` } },
        { nationalCode: { $regex: `.*${term}.*` } },
        { mobile: { $regex: `.*${term}.*` } }
      ]
    };

    // search people by term.
    let result = await Person.find(condition);
    res.json(result);
  }

  // create.
  create(req: Request, res: Response) {
    // delete req.body._id;
    const person = new Person(req.body);
    person
      .save()
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // edit.
  update(req: Request, res: Response) {
    const id = req.params.id;
    Person.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    )
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // delete.
  delete(req: Request, res: Response) {
    const id = req.params.id;
    Person.findOneAndDelete({ _id: id })
      .then(r => {
        res.json(r);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  // create student.
  async addStudent(req: Request, res: Response) {
    // begin transaction.
    const ssn = await Person.db.startSession();
    ssn.startTransaction();
    try {
      const schoolId = new Types.ObjectId(req.params.id);
      const studentVM = <IPerson>req.body;
      // fetch parent from db.
      let parent = await Person.findOne({
        nationalCode: studentVM.parent.nationalCode
      });

      //create new parent if is not already exists.
      //create credentials for parent to login;
      if (!parent) {
        parent = new Person(studentVM.parent);
        const user = new User({
          username: req.body.nationalCode,
          password: req.body.nationalCode
        });
        user.info = parent;
        await parent.save();
      }

      const studentInfo = new Person(req.body.info);
      // save person infos of parent and student.
      await studentInfo.save();
      // create student using parent id and student info id.
      Student.create({
        info: studentInfo._id,
        school: schoolId,
        parent: parent._id
      });

      // commit transaction.
      await ssn.commitTransaction();
      //send created response with 201 as status code to user.
      res.status(201).end();
    } catch (e) {
      // abort transaction.
      ssn.abortTransaction();
      res.status(400).send(e);
    }
  }

  // get students by condition.
  async getStudents(req: Request, res: Response) {
    const schoolId = new Types.ObjectId(req.params.id);
    const condition: any = {};
    // add search term to condition.
    if (req.query.query) {
      const term = req.query.query;
      condition.$or = [
        { firstname: { $regex: `.*${term}.*` } },
        { lastname: { $regex: `.*${term}.*` } },
        { nationalCode: { $regex: `.*${term}.*` } },
        { mobile: { $regex: `.*${term}.*` } }
      ];
    }

    try {
      // find people ids who matches the condition.
      const peopleIds = await Person.find(condition, { _id: 1 });
      const students = await Student.find({
        school: schoolId,
        info: { $in: peopleIds.map(p => p._id) }
      })
        .populate('info')
        .exec();

      res.json(students);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // get single student.
  async getStudent(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId;
      const student = await Student.findById(studentId)
        .populate('parent')
        .populate('info')
        .exec();

      res.json(student);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getStudentByCode(req: Request, res: Response) {
    let student;
    let result;
    let parent;
    if (req.params.studentCode.length === 10) {
      try {
        student = await Person.findOne({
          nationalCode: req.params.studentCode
        });
        result = await Student.findOne({ info: student._id })
          .populate('parent')
          .exec();
        if (result) {
          parent = result.parent;
        }
        res.json({ parent, student });
      } catch (err) {
        res.status(400).send(err);
      }
    }
    try {
      student = await Person.findOne({
        code: req.params.studentCode
      });
      result = await Student.findOne({ info: student._id })
        .populate('parent')
        .exec();
      if (result) {
        parent = result.parent;
      }
      res.json({ parent, student });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // update student.
  async updateStudent(req: Request, res: Response) {
    const ssn = await Person.db.startSession();
    ssn.startTransaction();
    try {
      if (req.body.schoolId)
        req.body.schoolId = new Types.ObjectId(req.body.schoolId);
      delete req.body._id;
      await Student.updateOne(
        { _id: new Types.ObjectId(req.params.studentId) },
        { $set: req.body },
        { runValidators: true }
      );

      // update student info - it should update the object using Person schema.
      const personId = new Types.ObjectId(req.body.info._id);
      delete req.body.info._id;
      await Person.updateOne({ _id: personId }, req.body.info, {
        runValidators: true
      });

      // update student parent - it should update the object using Person schema.
      const parentId = new Types.ObjectId(req.body.parent._id);
      delete req.body.parent._id;
      await Person.updateOne({ _id: parentId }, req.body.parent, {
        runValidators: true
      });

      // commit transaction.
      await ssn.commitTransaction();
      res.end();
    } catch (err) {
      ssn.abortTransaction();
      res.status(400).send(err);
    }
  }

  // delete student.
  async deleteStudent(req: Request, res: Response) {
    try {
      const studentId = new Types.ObjectId(req.params.studentId);
      const result = await Student.deleteOne({ _id: studentId });
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  // get personnel of an school with school id.
  async getPersonnel(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const result = await School.findById(schoolId)
        .populate('personnel.person')
        .populate('personnel.roles')
        .select({ personnel: 1 });
      res.json(result.personnel);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getPersonnelById(req: Request, res: Response) {
    const schoolId = req.params.id;
    try {
      const personnelId = new Types.ObjectId(req.params.personnelId);
      const result = await School.findById({ _id: schoolId })
        .populate('personnel.roles')
        .populate({
          path: 'personnel.person',
          match: { _id: personnelId }
        });

      res.json(_.filter(result.personnel, p => p.person)[0]);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getPersonnelByCode(req: Request, res: Response) {
    const schoolId = req.params.id;
    const personalCode = req.params.personnelCode;
    // if user search with national Code
    if (personalCode.length === 10) {
      try {
        const result = await School.findById({ _id: schoolId })
          .populate('personnel.roles')
          .populate({
            path: 'personnel.person',
            match: { nationalCode: personalCode }
          });

        res.json(_.filter(result.personnel, p => p.person)[0]);
      } catch (e) {
        res.status(400).send(e);
      }
    }
    // if user search with Code
    try {
      const result = await School.findById({ _id: schoolId })
        .populate('personnel.roles')
        .populate({
          path: 'personnel.person',
          match: { code: personalCode }
        });

      res.json(_.filter(result.personnel, p => p.person)[0]);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  // add personnel to school.
  async addPersonnel(req: Request, res: Response) {
    let token = req.header('authorization');
    const reqUser = tokenManager.decodeToken(token);

    const adminRole = await Role.findOne({ title: 'ادمین' });
    let reqBodyHasAdminRole = req.body.roleIds
      .map(m => m === adminRole._id.toString())
      .includes(true);
    if (reqBodyHasAdminRole) {
      if (reqUser.userType !== 'superAdmin') {
        return res
          .status(403)
          .send('شما دسترسی برای اعطا کردن رول ادمین ندارید!');
      }
    }

    const schoolId = new Types.ObjectId(req.params.id);
    // begin transaction
    const ssn = await Person.db.startSession();
    ssn.startTransaction();

    // let person = await Person.findOne({
    //   nationalCode: req.body.person.nationalCode
    // });
    // if ( !person )
    let person = new Person(req.body.person);
    try {
      // save person and add to schools personnel.
      await person.save();

      const result = await School.updateOne(
        { _id: schoolId },
        {
          $push: { personnel: { person: person._id, roles: req.body.roleIds } }
        }
      );

      // create user for personnel.
      await User.create({
        username: person.code,
        password: person.nationalCode,
        info: person
      });

      // commit transaction and send the result to user.
      ssn.commitTransaction();
      res.json(result);
    } catch (e) {
      // rollback transaction.
      ssn.abortTransaction();
      res.status(500).send(e);
    }
  }

  // add personnel to school.
  async updatePersonnel(req: Request, res: Response) {
    let token = req.header('authorization');
    const reqUser = tokenManager.decodeToken(token);

    // if body has admin role for updating , user only should be superAdmin;
    const adminRole = await Role.findOne({ title: 'ادمین' });
    let reqBodyHasAdminRole = req.body.roleIds
      .map(m => m === adminRole._id.toString())
      .includes(true);

    if (reqBodyHasAdminRole) {
      if (reqUser.userType !== 'superAdmin') {
        return res
          .status(403)
          .send('شما دسترسی به اعطا کردن رول ادمین را ندارید!');
      }
    }
    const schoolId = new Types.ObjectId(req.params.id);
    const personId = new Types.ObjectId(req.body.person._id);
    delete req.body.person._id;
    try {
      await Person.updateOne({ _id: personId }, req.body.person, {
        runValidators: true
      }).exec();
      const result = await School.updateOne(
        { _id: schoolId, 'personnel.person': personId },
        { $set: { 'personnel.$.roles': req.body.roleIds } }
      );
      res.json(result);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  // delete personnel to school.
  async deletePersonnel(req: Request, res: Response) {
    const schoolId = new Types.ObjectId(req.params.id);
    const personnelId = new Types.ObjectId(req.params.personnelId);

    try {
      const result = await School.updateOne(
        { _id: schoolId, 'personnel.person': personnelId },
        { $pull: { personnel: { person: personnelId } } }
      );
      res.json(result);
    } catch (e) {
      res.send(e);
    }
  }
}
