import { Request, Response } from 'express';
import { pick } from 'lodash';
import { User } from '../../models/entities/user.entity';
import tokenManager from '../../helpers/token.manager';
import { IUser } from '../../models/interfaces/auth/user.interface';
import { School } from '../../models/entities/school.entity';
import { ISchool } from '../../models/interfaces/edu/school.interface';

export class AuthController {
  async login(req: Request, res: Response) {
    const credentials = pick(req.body, ['username', 'password']);
    const jwtPayload: any = {};
    try {
      let user = <IUser>(
        await User.schema.methods.findByCredentials(credentials)
      );
      if (!user) {
        throw new Error('کاربری با این مشخصات یافت نشد');
      }
    
      // add user id to jwt payload object.
      jwtPayload.id = user.id;

      if (user.userType === 'user') {
        // get school information to user role in the school.
        const school = <ISchool>await School.where(
          'personnel.person._id',
          user.info._id
        )
          .select({ _id: 1, personnel: 1 })
          .populate('personnel.roles')
          .exec();
        if (!school) {
          throw new Error(
            'مدرسه مربوط به شما یافت نشد. با مدیر سیستم تماس بگیرید.'
          );
        }

        // find user roles in the school.
        jwtPayload.roles = school.personnel.find(p => p.person._id == user.info._id).roles;
      }


      // generate JWT.
      const token = tokenManager.generate(jwtPayload);
      res.send({token});
    } catch (e) {
      res.status(404).send(e);
    }
  }
}
