Employee Management System
This Node.js application provides functionalities to manage employee records, including creating, updating, listing, and deleting employees. It uses JWT authentication for secure access to endpoints.

Features
Login: Authenticate users with username and password using JWT tokens.
Create Employee: Add new employee details including ID, image, name, email, mobile number, designation, gender, course, and creation date.
Employee List: View a paginated list of employees with options to filter, sort, activate/deactivate, edit, and delete employees.
Edit Employee: Update employee details with validation for email and mobile number fields.
Technologies Used
Node.js: Backend server environment.
Express.js: Web framework for building APIs.
MongoDB: Database for storing employee data.
JWT: JSON Web Tokens for authentication.
React: Frontend framework for building the user interface.
Axios: HTTP client for making requests to the backend.
Getting Started
To run this project locally, follow these steps:

Prerequisites
Node.js installed on your machine
MongoDB server running locally or accessible remotely
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/RohitKumar834/Employee-Management-system.git
cd employee-management
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory.
Define environment variables including PORT, DB_URI, and JWT_SECRET.
Start the server end client: 

bash
Copy code
npm run dev

Usage
Login: Access /login endpoint with username and password to obtain JWT token.
Create Employee: Use /employee endpoint with valid JWT token for authorization.
List Employees: View /employees endpoint for a paginated list of employees.
Edit Employee: Update employee details using /employee/:id endpoint with JWT token.
Delete Employee: Remove employee record using /employee/:id DELETE method with JWT token.
API Endpoints
POST /login: Authenticate user and retrieve JWT token.
POST /employee: Create a new employee record.
GET /employees: Retrieve paginated list of employees.
PUT /employee/
: Update employee details by ID.
DELETE /employee/
: Delete employee record by ID.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Authors
Rohit Kumar (@Rohit@8340)
Acknowledgments
Mention any contributors or third-party libraries used in your project.