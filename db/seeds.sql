--  these are all the departments by name
INSERT INTO department (department_name)
VALUES
('Production'), 
('Design'), 
('Game Developer'), 
('Art Department'), 
('Animation'), 
('Technical Art'), 
('Audio'), 
('Programming'), 
('Quality Assurance');

--  all the roles and the salaries and the id to which department the role is part of
INSERT INTO roles (title, salary, department_id)
VALUES
('Lead Game Producer', 120000, 1),
('Game Publisher', 150000, 1),
('Game Producer', 55000, 1),
('Lead Game Designer', 130000, 2), 
('GamePlay Designer', 100000, 2),
('Level Designer', 90000, 2), 
('Writer', 80000, 2), 
('Concept Artist', 75000, 3), 
('3D modelling Artist', 75000, 3),
('Enviorment Artist', 75000, 3),
('Texture Artist', 75000, 3),
('Game Animator', 80000, 4),
('Graphics Programmer', 100000, 5), 
('Technical Artist', 100000, 5), 
('Music Composer', 110000, 6), 
('Audio Programer', 900000, 6), 
('Sound designer', 80000, 6), 
('Engine Programmer', 100000, 7),
('Gameplay Programmer', 100000, 7),
('Game tester', 60000, 8), 
('QA Build Engineer', 110000, 8);


-- this are all the employees with there role id and who is thier manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bill','Fellows', 1, 2),
('Jason','Haller', 2, NULL), 
('John','Santana', 3, 1), 
('Robert','Smith', 4, 3), 
('Hester','Johnson', 5, 3),
('Miles','Morales', 6, 3),
('Fred','Cox', 7, 2),
('Peter','Parker', 8, 1),
('Tony','Stark', 9, 1),
('Steve','Rogers', 10, 3), 
('Alex','Garcia', 11, 3), 
('Mary','Miller', 12, 3), 
('Lexi','Davis', 13, 3), 
('James','Williams', 14, 1), 
('Sarah','Lee', 15, 1), 
('Claire','Thompson', 16, 15), 
('Bob','Thomas', 17, 15), 
('Jill','Smallwood', 18, 1 ), 
('Jane','Harris', 19, 18),  
('Victoria','White', 20, 21), 
('Sierra','Martin', 21, 1); 
