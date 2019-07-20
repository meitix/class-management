import { User } from "../models/entities/user.entity";

export async function InitSuperAdmin() {
    const admin = await User.findOne({'userType': 'superAdmin'});
    // import seed data.
    if(!admin) {
        User.create(require('./data.json').defaultAdmins);
    }
}

