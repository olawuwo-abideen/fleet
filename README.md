A fleetmanagement app 

Installation

- clone the repository


`git clone git@github.com:olawuwo-abideen/fleet.git`


- navigate to the folder


`cd fleet-main.git`

To run the app in development mode

Open a terminal and enter the following command to install all the  modules needed to run the app:

`npm install`


Create a `.env` file with

`MONGODB_URI= mongodb://localhost:27017/fleetmanagement`

`DB_URI=localhost`

`JWT_SECRET= secret`

`JWT_EXPIRES= 1d`

`MAIL_USERNAME=susie98@ethereal.email`

`MAIL_PASSWORD=CeUveh762eS21xBnhF`

`MAIL_HOST=smtp.ethereal.email`


Enter the following `npm start` command to Command Line Interface to Start the app

This will start the app and set it up to listen for incoming connections on port 3000. 

Use Postman to test the endpoint

API Endpoints

The following API endpoints are available:

- BaseUrl https://localhost:3000/



**Admin Management**

- **POST admin/login**: Admin login.
- **GET  admin/users**: Get all users.
- **GET  admin/users/{id}**: Get user by id.
- **DELETE  admin/users/{id}**: Delete user by id.
- **POST admin/vehicle**: Create vehicle.
- **PUT  admin/vehicle/{id}**: Update vehicle data by id.
- **DELETE  admin/vehicle/{id}**: Delete vehicle data by id.
- **PUT admin/vehicle/upload/{id}**: Update vehicle image data by id.
- **GET  admin/vehicle/stat**: Get vehicle statistics.
- **PUT    admin/trips/analytics**: Get trip analytics.
- **GET admin/maintenance/analytics**: Get maintenance analytics.
- **GET  admin/analytics/costs/:id**: Get vehicle cost analytics.
- **GET    admin/staff/count**: Get total number of staff.
- **GET admin/staff/status/:id**: Get maintenance analytics.
- **PATCH admin/staff/activate/:id**: Activate staff account.

**Authentication**

- **POST /auth/login**: User login.
- **POST /auth/logout**: User logout.
- **POST /auth/forgot-password**: User forgot password
- **PUT /auth/reset-password**: User reset password
- **PUT /auth/change-password**: User change password


**User Endpoint**

- **GET /user/**: Retrieve the currently authenticated user’s profile.
- **POST user/change-password**: User change password.
- **PUT /user/**: Update user profile.



**Vehicle Management**

- **GET /vehicles**: Retrieve a list of all vehicles.
- **GET /vehicles/{id}**: Retrieve details of a specific vehicle.
- **PUT /vehicles/maintenance/{id}**: Get vehicle maintenance history.
- **DELETE /vehicles/available**: Get all available vehicles.

**Trip Management**

- **GET /trips**: Retrieve a list of all trips.
- **GET /trips/{id}**: Retrieve details of a specific trip.
- **POST /trips**: Start a new trip.
- **PUT /trips/{id}**: Update details of a specific trip.
- **DELETE /trips/{id}**: Cancel a trip.
- **GET /trips/ongoing**: Get all ongoing trips.

**Maintenance Management**

- **GET /maintenance**: Retrieve a list of all maintenance records.
- **GET /maintenance/{id}**: Retrieve details of a specific maintenance record.
- **POST /maintenance**: Add a new maintenance record.
- **PUT /maintenance/{id}**: Update details of a specific maintenance record.
- **DELETE /maintenance/{id}**: Remove a maintenance record from the system.



**Fuel Management**

- **GET /fuel**: Retrieve a list of all fuel records.
- **GET /fuel/{id}**: Retrieve details of a specific fuel record.
- **POST /fuel**: Add a new fuel record.
- **PUT /fuel/{id}**: Update details of a specific fuel record.
- **DELETE /fuel/{id}**: Remove a fuel record from the system.

**Incident Management**

- **GET /incidents**: Retrieve a list of all incidents.
- **GET /incidents/{id}**: Retrieve details of a specific incident.
- **POST /incidents**: Report a new incident.
- **PUT /incidents/{id}**: Update details of a specific incident.
- **DELETE /incidents/{id}**: Remove an incident from the system.



**Analytics and Reports**

- **GET /reports/vehicle-usage**: Retrieve a report on vehicle usage.
- **GET /reports/driver-performance**: Retrieve a report on driver performance.
- **GET /reports/fuel-consumption**: Retrieve a report on fuel consumption.
- **GET /reports/maintenance-costs**: Retrieve a report on maintenance costs.




