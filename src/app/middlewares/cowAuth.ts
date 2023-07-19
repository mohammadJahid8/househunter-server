// import { NextFunction } from 'express';
// import httpStatus from 'http-status';
// import { Secret } from 'jsonwebtoken';
// import config from '../../config';
// import ApiError from '../../errors/ApiError';
// import { jwtHelpers } from '../../helpers/jwtHelpers';

// const cowAuth =
//   (...requiredRoles: string[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // get auth token
//       const token = req.headers.authorization;
//       if (!token)
//         throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//       // check if token is valid
//       let verifiedUser = null;

//       verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

//       req.user = verifiedUser;

//       // role check
//       if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
//         throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };

// export default cowAuth;
