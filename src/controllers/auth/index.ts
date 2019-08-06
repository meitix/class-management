import { Request, Response } from 'express';
import { pick } from 'lodash';
import { User } from '../../models/entities/user.entity';
import tokenManager from '../../helpers/token.manager';
import { IUser } from '../../models/interfaces/auth/user.interface';
import { School } from '../../models/entities/school.entity';
import { ISchool } from '../../models/interfaces/edu/school.interface';
import { IRole } from '../../models/interfaces/auth/role.interface';
import { Role } from '../../models/entities/role.entity';

export class AuthController {
  async login(req: Request, res: Response) {
    const credentials = pick(req.body, ['username', 'password']);
    const jwtPayload: {id: string , roles: IRole[] , school?: string} = {id: '', roles: []};
    try {
      let user = <IUser>(
        await (User as any).findByCredentials(credentials)
      );
      if (!user) {
        throw new Error('نام کاربری یا کلمه عبور اشتباه است');
      }
      // add user id to jwt payload object.
      jwtPayload.id = user.id;
      if (user.userType === 'user') {
        // get school information to user role in the school.
        const school = <ISchool>await School.findOne({'personnel.person': user.info.id})
          .select({ _id: 1, personnel: 1 })
          .populate('personnel.roles')
          .exec();

        if (!school) {
          throw new Error(
            'مدرسه مربوط به شما یافت نشد. با مدیر سیستم تماس بگیرید.'
          );
        }
        
        // find user roles in the school.
        jwtPayload.roles = school.personnel.find(p => p.person.equals(user.info.id)).roles;
        jwtPayload.school = school.id;
      }
      else {
        jwtPayload.roles = [new Role({title: 'ادمین', accessibility: {title: 'manage-schools' , accessLevel: 4} })];
      }

      // generate JWT.
      const token = tokenManager.generate(jwtPayload);
      // prepare and send the result.
      const result: any = {token , roles: jwtPayload.roles};
      if(jwtPayload.school) result.schoolId = jwtPayload.school;
      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message || e);
    }
  }
}
