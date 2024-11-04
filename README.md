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

Enter the following `npm start` command to Command Line Interface to Start the app

This will start the app and set it up to listen for incoming connections on port 3000. 

Use Postman to test the endpoint

API Endpoints

The following API endpoints are available:

- BaseUrl https://localhost:3000/


**Authentication**

- **POST /auth/login**: User login.
- **POST /auth/logout**: User logout.
- **POST /auth/forgot-password**: User forgot password
- **PUT /auth/reset-password**: User reset password
- **PUT /auth/change-password**: User change password


**User and Role Management**

- **GET /users**: Retrieve a list of all users.
- **GET /users/{id}**: Retrieve details of a specific user.
- **POST /users**: Add a new user.
- **PUT /users/{id}**: Update information for a specific user.
- **DELETE /users/{id}**: Remove a user from the system.
- **GET /roles**: Retrieve a list of all roles.
- **POST /roles**: Add a new role.
- **PUT /roles/{id}**: Update details of a specific role.
- **DELETE /roles/{id}**: Remove a role from the system.


**Vehicle Management**

- **GET /vehicles**: Retrieve a list of all vehicles.
- **GET /vehicles/{id}**: Retrieve details of a specific vehicle.
- **POST /vehicles**: Add a new vehicle to the fleet.
- **PUT /vehicles/{id}**: Update information for a specific vehicle.
- **DELETE /vehicles/{id}**: Remove a vehicle from the fleet.

**Trip Management**

- **GET /trips**: Retrieve a list of all trips.
- **GET /trips/{id}**: Retrieve details of a specific trip.
- **POST /trips**: Start a new trip.
- **PUT /trips/{id}**: Update details of a specific trip.
- **DELETE /trips/{id}**: Cancel a trip.

**Maintenance Management**

- **GET /maintenance**: Retrieve a list of all maintenance records.
- **GET /maintenance/{id}**: Retrieve details of a specific maintenance record.
- **POST /maintenance**: Add a new maintenance record.
- **PUT /maintenance/{id}**: Update details of a specific maintenance record.
- **DELETE /maintenance/{id}**: Remove a maintenance record from the system.

**Route Management** 

- **GET /routes**: Retrieve a list of all routes.
- **GET /routes/{id}**: Retrieve details of a specific route.
- **POST /routes**: Create a new route.
- **PUT /routes/{id}**: Update details of a specific route.
- **DELETE /routes/{id}**: Remove a route from the system.


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

**Location Tracking**

- **GET /locations**: Retrieve a list of all location updates.
- **GET /locations/{vehicleId}**: Retrieve the current location of a specific vehicle.
- **POST /locations**: Add a new location update.

**Analytics and Reports**

- **GET /reports/vehicle-usage**: Retrieve a report on vehicle usage.
- **GET /reports/driver-performance**: Retrieve a report on driver performance.
- **GET /reports/fuel-consumption**: Retrieve a report on fuel consumption.
- **GET /reports/maintenance-costs**: Retrieve a report on maintenance costs.




