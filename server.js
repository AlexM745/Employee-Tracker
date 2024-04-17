const inquirer = require("inquirer");
const db = require("./db");

//  creating a connection pool 
const { Pool } = require('pg');

// enables access to the .env variables
require('dotenv').config();

// uses the environment variables to connect to database
const pool = new Pool(

    {
        database: "employeetracker_db",
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: "localhost",
    },

    console.log('Connected to the employeetracker_db database.')
)
// calling pool to use the environment vatiables to start the connection to database
pool.connect((error) => {
    if (error) throw error;
    console.log("Did not connect!");
    beginning();
});


//initial question and options that the user will be provided with 
beginning = () => {
    inquirer.prompt([

        {
            type: "list",
            name: "start",
            message: "What Would you like to do?",
            choices: [
                "View All Employess",
                "View All Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Roles",
                "Exit"
            ]
        }
    ])
        // the answer switch cases that depending on the user selection from the list that was given at beginning
        .then((answer) => {
            // this switch is for the user input cases
            switch (answer.start) {
                // these are the cases and breaks for the which ever the user selected
                case "View All Employess":
                    viewEmployees();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Roles":
                    updateRoles();
                    break;
                // this exit selection will end the connection with SQL and will display the following message on the terminal
                case "Exit":
                    connection.end();
                    console.log(" You have logged off the Employee tracker!\n")
                    return;
                // if no choice is made then the console will 
                default:
                    console.log("No input, now exiting!\n")
                    break;

            }
        })
}

viewAllEmployees = () => {
    pool.query(
    `SELECT employee.employee_id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary, CONCAT(manager.first_name, '', manager.last_name) manager 
    FROM employee 
    JOIN  employee.employee ON employee.manager_id = manager.employee_id 
    JOIN roles ON employee.roles_id = roles.roles_id 
    JOIN department ON department.department_id = roles.department_id 
    ORDER BY employee.employee_id ASC;`, (error, res) => {
        if (error) throw (error);
        beginning();
    })
}

viewAllDepartments = () => {
    pool.query(`SELECT * 
    FROM department 
    ORDER BY department_id ASC;`, (error, res) => {
        if (error) throw (error);
        beginning();
    })
}









