const inquirer = require('inquirer');

const fs = require('fs');
// const connection = require('./db/connection');
 require('console.table');

// const { showChoices, findId } = require('./db/queries');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: 'Fletch2711!',
    database: "employee_db",
   
});

connection.connect(function (err) {
   if (err) throw err;
   mainMenu();
});

function mainMenu() {
    console.log('hey');
    inquirer
        .prompt([
            {
             type: 'list',
                name: 'menu',
                message: 'Pick an option below',
                choices: [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role',
                    'Exit']
            }
          
        ])
        .then((choice) => {
            console.log(choice);
            // if (choice.menu !== 'Exit') {
            //     setTimeout(() => {

            //     }, 1000);
            // }
            switch (choice.menu) {
                case 'View all Departments':
                    allDepartments();
                    break;

                case 'View all Roles':
                    allRoles();
                    break;

                case 'View all Employees':
                    allEmployees();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'Exit':
                    connection.end();
                    console.log('Done');
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
        });

};

function allDepartments() {
    const query = `SELECT department.id AS id, department.department_name AS department FROM department;`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    });
  
};

function allRoles() {
    const query = `SELECT roles.id AS id, roles.title AS title, roles.salary AS salary, roles.department_id AS department_id FROM roles;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    });
    
};

function allEmployees() {
    const query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, employee.role_id AS role_id, employee.manager_id AS manager_id FROM employee;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    });
   
};

async function addDepartment() {

    const prompts = [
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Which department would you like to add?'
        }
    ]

    let answer = await inquirer.prompt(prompts);

    connection.query(`INSERT INTO department (department_name) VALUE ('${answer.addDepartment}');`, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })
    
};

async function addRole() {

    const prompts = [
        {
            type: 'input',
            name: 'addRole',
            message: 'Which role would you like to add?'
        },
        {
            type: 'number',
            name: 'addSalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'addDepartment',
            message: 'Which department does this role belong to?',
            choices: await showChoices('department_name', 'department')
        }
    ]

    let answer = await inquirer.prompt(prompts);

    let deptId = await findId('department', 'department_name', answer.addDepartment);

    connection.query(`INSERT INTO roles (title, salary, department_id) VALUE ('${answer.addRole}', '${answer.addSalary}', '${deptId}');`, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })
   

}

async function addEmployee() {
    const prompts = [
        {
            type: 'input',
            name: 'first',
            message: 'Insert first name of employee'
        },
        {
            type: 'input',
            name: 'last',
            message: 'Insert last name of employee'
        },
        {
            type: 'list',
            name: 'getRole',
            message: 'Role of the employee',
            choices: await showChoices('title', 'roles')
        },
        {
            type: 'list',
            name: 'getManager',
            message: 'Manager for this employee',
            choices: await showChoices('full_name', 'employee'),
            default: 'null'
        }
    ]

    let answer = await inquirer.prompt(prompts);

    let roleId = await findId('roles', 'title', answer.getRole);

    let managerId = await findId('employee', 'full_name', answer.getManager);

    connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${answer.first}', '${answer.last}', '${roleId}', '${managerId}');`, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })

    
}

async function updateRole() {
    const prompts = [
        {
            type: 'list',
            name: 'getEmployee',
            message: 'Which employee to update?',
            choices: await showChoices('full_name', 'employee'),
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is the new role for this employee?',
            choices: await showChoices('title', 'roles')
        },
        {
            type: 'list',
            name: 'newManager',
            message: 'Manager for this employee',
            default: 'null'
        }
    ]

    let answer = await inquirer.prompt(prompts);

    let roleId = await findId('roles', 'title', answer.newRole);

    let managerId = await findId('employee', 'full_name', answer.newManager);

    connection.query(`UPDATE employee SET role_id = '${roleId}', manager_id = '${managerId}' WHERE full_name = '${answer.getEmployee}';`, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    })

 
}

// mainMenu();

async function showChoices(column, table) {
    

    let results = await connection.promise().query(`Select ${column} FROM ${table}`)
    let choices = [];

    results[0].forEach(element => choices.push(element[`${column}`]))
    return choices;
};


async function findId(table, column, value) {
    let results = await connection.promise().query(`SELECT id from ${table} WHERE ${column} = '${value}'`)
     
    let thisId = results[0][0].id;

    return thisId;
}
