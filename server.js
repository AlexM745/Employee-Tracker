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
    SELECT id, first_name, last_name, role_id, manager_id
	FROM employee;`, (error, res) => {
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



addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?",
            validate: deparmentInput => {
                if (deparmentInput) {
                    return true;
                } else {
                    console.log("Add a department");
                    return false;
                }
            }
        }])
        .then((answer) => {
            pool.query(`INSERT INTO department (name) VALUES(?)`, [answer.newDeparment], (error, res) => {

                if (error) throw (error);
                console.log(`${answer.deparment} department was added to database.`);
                beginning();
            })
        });
}









