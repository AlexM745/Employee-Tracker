INSERT INTO department (department_name)
VALUES
("Production"), 
("Design"), 
("Game Developer"), 
("Art Department"), 
("Animation"), 
("Technical Art"), 
("Audio"), 
("Programming"), 
("Quality Assurance")

INSERT INTO role (title, salary, department_id)
VALUES
("Lead Game Producer", 120000, 1 ),
("Game Publisher", 150000, 1 ),
("Assistant Game Producer", 55000, 1 ),
("Lead Game Designer", 130000, 2 ), 
("GamePlay Designer", 100000, 2 ),
("Level Designer", 90000, 2 ), 
("Writer", 80000, 2 ), 
("Concept Artist", 75000, 3 ), 
("3D modelling Artist", 75000, 3 ),
("Enviorment Artist", 75000, 3 ),
("Texture Artist", 75000, 3),
("Game Animator", 80000, 4),
("Graphics Programmer", 100000, 5), 
("Technical Artist", 100000, 5), 
("Music Composer", 110000, 6), 
("Audio Programer", 900000, 6), 
("Sound designer", 80000, 6), 
("Engine Programmer", 100000, 7),
("Gameplay Programmer", 100000, 7),
("Game tester", 60000, 8), 
("Quality Assurance Build Engineer", 110000, 8)



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES