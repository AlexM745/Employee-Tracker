-- if the database exist then do not create it 
DROP DATABASE IF EXISTS  employeetracker_db; 

-- creates a database if it does not exist
CREATE DATABASE employeeTracker_db;

-- switches to the employeeTracker database
\c employeetracker_db
--  creates the department table and the id auto increments with each addition of a department
CREATE TABLE department(
    id SERIAL PRIMARY KEY, 
    department_name VARCHAR(30) UNIQUE NOT NULL
);
--  creates the role table and the id auto increments with each addition of a role
CREATE TABLE roles (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    -- links the department table
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
    
);
--  creates the employee table and the id auto increments with each addition of an employee
CREATE TABLE employee (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INTEGER NOT NULL, 
    manager_id INTEGER NULL, 
    -- links the role table 
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL, 
    --  the manager id is the same as the employee id 
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL 
);