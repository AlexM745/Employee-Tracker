// importing inquirer
const inquirer = require("inquirer");
const figlet = require('figlet');
const cTable = require('console.table');

//  creating a connection pool 
const { Pool } = require('pg');

// enables access to the .env variables
require('dotenv').config();

// uses the environment variables to connect to database
const pool = new Pool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employeetracker_db',
    },
)

// calling pool to use the environment vatiables to start the connection to database
pool.connect((error) => {
    if (error) throw error;
    console.log('Connected to the employeetracker_db database.')
    console.log(figlet.textSync("Employee Tracker", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
    })
    );
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
                    pool.end();
                    console.log(" You have logged off the Employee tracker!\n")
                    return;
                // if no choice is made then the console will 
                default:
                    console.log("No input, now exiting!\n")
                    break;

            }
        })
}

viewEmployees = () => {
    pool.query(`
    SELECT e.id, e.first_name, e.last_name,roles.title, department.department_name, roles.salary, 
    CONCAT(m.first_name, ' ', m.last_name) manager 
    FROM employee m 
    RIGHT JOIN employee e ON e.manager_id = m.id 
    JOIN roles ON e.role_id = roles.id 
    JOIN department ON department.id = roles.department_id 
    ORDER BY e.id ASC;`, (error, res) => {
        if (error) throw (error);
        console.table(res.rows);
        beginning();
    })
}

viewDepartments = () => {
    pool.query(`
    SELECT * FROM department
    ORDER BY id ASC; `, (error, res) => {
        if (error) throw (error);
        console.table(res.rows);
        beginning();
    })
}
// this function adds a new employee
addEmployee = () => {
    pool.query(`SELECT * FROM roles;`, (error, res) => {
        if (error) throw error;
        let roles = res.map(roles => ({ name: roles.title, value: roles.id }));
        pool.query(`SELECT * FROM employee;`, (error, res) => {
            if (error) throw error;
            let employees = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));

            inquirer.prompt([
                //  the first name of new employee
                {
                    type: "input",
                    name: "firstname",
                    message: "What is the first name of the new employee?",

                },
                // last name of the new employee
                {
                    type: "input",
                    name: "lastname",
                    message: "What is the last name of the new employee?",

                },
                // the role title that the employee will have
                {
                    type: "rawlist",
                    name: "role",
                    message: "What is the title of the new employee?",
                    choices: roles
                },
                // the manager of the employee
                {
                    type: "rawlist",
                    name: "manager",
                    message: "Who is the manager of the new employee?",
                    choices: employees

                }])
                .then((answers) => {
                    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`, [answers.firstname, answers.lastname, answers.roles, answers.manager.id], (error, res) => {

                        if (error) throw (error);
                        console.log(`Added ${answers.firstname} ${answers.lastname} to database.`);
                        beginning();
                    })
                });

        })
    })
}
// add new department to database
addDepartment = () => {
    // the name of the new department
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?",
        }])
        .then((answer) => {
            // new department is added to database
            pool.query(`INSERT INTO department (department_name) VALUES(?)`, [answer.newDepartment], (error, res) => {

                if (error) throw (error);
                console.log(`${answer.department} department was added to database.`);
                beginning();
            })
        });
}

// add a new role to database
addRole = () => {
    pool.query(`SELECT * FROM department;`, (error, res) => {
        if (error) throw error;
        let departments = res.map(department => ({ name: department.department_name, value: department.id }));

        inquirer.prompt([
            //  title of the new role
            {
                type: "input",
                name: "title",
                message: "What is the title of the new role?",

            },
            // the salary of the role
            {
                type: "input",
                name: "salary",
                message: "What is the salary for the new role?",

            },
            // the department name for the new role
            {
                type: "rawlist",
                name: "departmentName",
                message: "Which Department does the new role belong to?",
                choices: departments
            }])
            .then((answers) => {
                pool.query(`INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)`, [answers.title, answers.salary, answers.departmentName], (error, res) => {
                    if (error) throw (error);
                    console.log(`Added ${answers.title} to database.`);
                    beginning();
                })
            });

    })
}








