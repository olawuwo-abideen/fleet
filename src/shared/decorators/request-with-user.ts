import { Request } from 'express';
import { User } from 'src/app/auth/schemas/user.schema';


interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
