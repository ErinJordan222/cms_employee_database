INSERT INTO department (department_name)
VALUES 
    ('Sales'), 
    ('Engineering'), 
    ('Finance'), 
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Sales Representative', 90000, 1),
    ('Sales Manager', 110000, 1),
    ('Software Engineer', 130000, 2),
    ('Lead Engineer', 160000, 2),
    ('Accountant', 135000, 3),
    ('Account Manager', 170000, 3),
    ('Paralegal', 50000, 4),
    ('Lawyer', 127000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Jim', 'Halpert', 1, null),
    ('Dwight' 'Schrute', 1, 1),
    ('Ryan' 'Howard', 2, 2),
    ('Pam', 'Beesley', 2, null),
    ('Oscar', 'Martienz', 3, 3),
    ('Angela', 'Martin', 3, null),
    ('Toby', 'Flenderson', 4, null),
    ('Holly', 'Flax', 4, 4);

    