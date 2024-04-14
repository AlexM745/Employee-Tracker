const inquirer = require("inquirer");
const db = require("./db");



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
                    console.log (" You have logged off the Employee tracker!\n")
                    return;
                // if no choice is made then the console will 
                default:
                    console.log("No input, now exiting!\n")
                    break;

            }
        })
}











