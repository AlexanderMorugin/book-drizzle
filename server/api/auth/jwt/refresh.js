// import jwt from "jsonwebtoken";

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const config = useRuntimeConfig();

//   if (!body) {
//     return;
//   }

//   const newAccessToken = jwt.sign(
//     { userId: body.user?.id },
//     config.jwtAccessSecret,
//     {
//       expiresIn: "10s",
//     }
//   );

//   setCookie(event, "access_token", newAccessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: true,
//   });
// });
