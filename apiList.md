# API

authRoutes
-POST /signup
-POST /login
-POST /logout

profileRoutes
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password


connectionRequestRoutes
# request send
-POST /request/send/interested/:userid;
-POST /request/send/ignored/:userid;
# request review
-POST /request/review/accepted/:reqid;
-POST /request/review/rejected/:reqid;


userRoutes
-GET /user/connections
-GET /user/requests/received
-GET /user/feed

