-- Wstawianie podstawowych danych do bazy danych SkillChain

-- Dodawanie języków
INSERT INTO languages (code, name, is_active) VALUES
('pl', 'Polski', true),
('en', 'English', true),
('de', 'Deutsch', true),
('uk', 'Українська', true);

-- Dodawanie kategorii ścieżek kariery
INSERT INTO career_categories DEFAULT VALUES; -- Sieci
INSERT INTO career_categories DEFAULT VALUES; -- Programowanie
INSERT INTO career_categories DEFAULT VALUES; -- Bazy danych
INSERT INTO career_categories DEFAULT VALUES; -- Zarządzanie projektami
INSERT INTO career_categories DEFAULT VALUES; -- Cyberbezpieczeństwo
INSERT INTO career_categories DEFAULT VALUES; -- DevOps
INSERT INTO career_categories DEFAULT VALUES; -- AI/ML

-- Dodawanie tłumaczeń kategorii (polski)
INSERT INTO career_category_translations (category_id, language_id, name, description) VALUES
(1, 1, 'Sieci komputerowe', 'Ścieżki kariery związane z projektowaniem, wdrażaniem i zarządzaniem sieciami komputerowymi.'),
(2, 1, 'Programowanie', 'Ścieżki kariery związane z tworzeniem oprogramowania, aplikacji webowych i mobilnych.'),
(3, 1, 'Bazy danych', 'Ścieżki kariery związane z projektowaniem, administracją i optymalizacją baz danych.'),
(4, 1, 'Zarządzanie projektami', 'Ścieżki kariery związane z zarządzaniem projektami IT i zespołami.'),
(5, 1, 'Cyberbezpieczeństwo', 'Ścieżki kariery związane z bezpieczeństwem systemów informatycznych i ochroną danych.'),
(6, 1, 'DevOps', 'Ścieżki kariery związane z integracją rozwoju oprogramowania i operacji IT.'),
(7, 1, 'Sztuczna inteligencja i uczenie maszynowe', 'Ścieżki kariery związane z rozwojem i wdrażaniem systemów AI i ML.');

-- Dodawanie tłumaczeń kategorii (angielski)
INSERT INTO career_category_translations (category_id, language_id, name, description) VALUES
(1, 2, 'Computer Networks', 'Career paths related to designing, implementing and managing computer networks.'),
(2, 2, 'Programming', 'Career paths related to software development, web and mobile applications.'),
(3, 2, 'Databases', 'Career paths related to database design, administration and optimization.'),
(4, 2, 'Project Management', 'Career paths related to IT project management and team leadership.'),
(5, 2, 'Cybersecurity', 'Career paths related to information security and data protection.'),
(6, 2, 'DevOps', 'Career paths related to software development and IT operations integration.'),
(7, 2, 'Artificial Intelligence and Machine Learning', 'Career paths related to AI and ML systems development and implementation.');

-- Dodawanie tłumaczeń kategorii (niemiecki)
INSERT INTO career_category_translations (category_id, language_id, name, description) VALUES
(1, 3, 'Computernetzwerke', 'Karrierewege im Zusammenhang mit dem Design, der Implementierung und dem Management von Computernetzwerken.'),
(2, 3, 'Programmierung', 'Karrierewege im Zusammenhang mit Softwareentwicklung, Web- und mobilen Anwendungen.'),
(3, 3, 'Datenbanken', 'Karrierewege im Zusammenhang mit Datenbankdesign, -administration und -optimierung.'),
(4, 3, 'Projektmanagement', 'Karrierewege im Zusammenhang mit IT-Projektmanagement und Teamleitung.'),
(5, 3, 'Cybersicherheit', 'Karrierewege im Zusammenhang mit Informationssicherheit und Datenschutz.'),
(6, 3, 'DevOps', 'Karrierewege im Zusammenhang mit der Integration von Softwareentwicklung und IT-Betrieb.'),
(7, 3, 'Künstliche Intelligenz und maschinelles Lernen', 'Karrierewege im Zusammenhang mit der Entwicklung und Implementierung von KI- und ML-Systemen.');

-- Dodawanie tłumaczeń kategorii (ukraiński)
INSERT INTO career_category_translations (category_id, language_id, name, description) VALUES
(1, 4, 'Комп'ютерні мережі', 'Кар'єрні шляхи, пов'язані з проектуванням, впровадженням та управлінням комп'ютерними мережами.'),
(2, 4, 'Програмування', 'Кар'єрні шляхи, пов'язані з розробкою програмного забезпечення, веб- та мобільних додатків.'),
(3, 4, 'Бази даних', 'Кар'єрні шляхи, пов'язані з проектуванням, адмініструванням та оптимізацією баз даних.'),
(4, 4, 'Управління проектами', 'Кар'єрні шляхи, пов'язані з управлінням ІТ-проектами та командами.'),
(5, 4, 'Кібербезпека', 'Кар'єрні шляхи, пов'язані з безпекою інформаційних систем та захистом даних.'),
(6, 4, 'DevOps', 'Кар'єрні шляхи, пов'язані з інтеграцією розробки програмного забезпечення та ІТ-операцій.'),
(7, 4, 'Штучний інтелект та машинне навчання', 'Кар'єрні шляхи, пов'язані з розробкою та впровадженням систем ШІ та МН.');

-- Dodawanie przykładowych ścieżek kariery
INSERT INTO career_paths (category_id, icon_path, color_hex, difficulty_level) VALUES
(1, 'network_icon.svg', '#2196F3', 4), -- Inżynier sieci
(2, 'code_icon.svg', '#4CAF50', 3), -- Frontend Developer
(2, 'database_code_icon.svg', '#9C27B0', 4), -- Backend Developer
(3, 'database_icon.svg', '#FF9800', 4), -- Administrator baz danych
(4, 'project_icon.svg', '#3F51B5', 3), -- Project Manager
(5, 'security_icon.svg', '#F44336', 5), -- Specjalista ds. cyberbezpieczeństwa
(6, 'devops_icon.svg', '#00BCD4', 4), -- Inżynier DevOps
(7, 'ai_icon.svg', '#8BC34A', 5); -- Data Scientist

-- Dodawanie tłumaczeń ścieżek kariery (polski)
INSERT INTO career_path_translations (career_path_id, language_id, title, description, requirements, job_outlook) VALUES
(1, 1, 'Inżynier sieci', 'Specjalista odpowiedzialny za projektowanie, wdrażanie i zarządzanie infrastrukturą sieciową.', 'Wymagana wiedza z zakresu protokołów sieciowych, routingu, przełączania, bezpieczeństwa sieci oraz znajomość sprzętu sieciowego.', 'Rosnące zapotrzebowanie na specjalistów z doświadczeniem w chmurze i SDN.'),
(2, 1, 'Frontend Developer', 'Programista tworzący interfejsy użytkownika aplikacji webowych.', 'Znajomość HTML, CSS, JavaScript oraz popularnych frameworków jak React, Angular czy Vue.js.', 'Stabilny rynek pracy z rosnącym zapotrzebowaniem na specjalistów z doświadczeniem w nowoczesnych technologiach.'),
(3, 1, 'Backend Developer', 'Programista odpowiedzialny za logikę aplikacji, bazy danych i serwery.', 'Znajomość języków programowania jak Python, Java, PHP, Node.js oraz baz danych.', 'Bardzo dobre perspektywy zawodowe, szczególnie dla osób znających wiele technologii.'),
(4, 1, 'Administrator baz danych', 'Specjalista odpowiedzialny za projektowanie, wdrażanie i zarządzanie bazami danych.', 'Znajomość SQL, systemów baz danych (MySQL, PostgreSQL, Oracle, SQL Server), umiejętność optymalizacji zapytań.', 'Stabilny rynek pracy z rosnącym zapotrzebowaniem na specjalistów od dużych zbiorów danych.'),
(5, 1, 'Project Manager', 'Osoba odpowiedzialna za planowanie, realizację i finalizację projektów IT.', 'Znajomość metodyk zarządzania projektami (PRINCE2, PMI, Agile, Scrum), umiejętności miękkie, podstawowa wiedza techniczna.', 'Bardzo dobre perspektywy zawodowe, szczególnie dla osób z certyfikatami i doświadczeniem.'),
(6, 1, 'Specjalista ds. cyberbezpieczeństwa', 'Ekspert odpowiedzialny za ochronę systemów informatycznych przed zagrożeniami.', 'Znajomość zagadnień bezpieczeństwa, narzędzi monitorujących, testów penetracyjnych, kryptografii.', 'Jeden z najszybciej rozwijających się obszarów IT z bardzo wysokim zapotrzebowaniem na specjalistów.'),
(7, 1, 'Inżynier DevOps', 'Specjalista łączący rozwój oprogramowania z operacjami IT.', 'Znajomość systemów CI/CD, konteneryzacji, automatyzacji, chmury, skryptów.', 'Rosnące zapotrzebowanie na specjalistów DevOps w firmach wdrażających nowoczesne metodyki pracy.'),
(8, 1, 'Data Scientist', 'Ekspert analizujący dane i tworzący modele uczenia maszynowego.', 'Znajomość statystyki, uczenia maszynowego, języków programowania (Python, R), narzędzi do analizy danych.', 'Jeden z najbardziej poszukiwanych zawodów w IT z bardzo dobrymi perspektywami rozwoju.');

-- Dodawanie tłumaczeń ścieżek kariery (angielski)
INSERT INTO career_path_translations (career_path_id, language_id, title, description, requirements, job_outlook) VALUES
(1, 2, 'Network Engineer', 'Specialist responsible for designing, implementing and managing network infrastructure.', 'Knowledge of network protocols, routing, switching, network security and familiarity with network hardware.', 'Growing demand for specialists with cloud and SDN experience.'),
(2, 2, 'Frontend Developer', 'Developer creating user interfaces for web applications.', 'Knowledge of HTML, CSS, JavaScript and popular frameworks like React, Angular or Vue.js.', 'Stable job market with growing demand for specialists with experience in modern technologies.'),
(3, 2, 'Backend Developer', 'Developer responsible for application logic, databases and servers.', 'Knowledge of programming languages like Python, Java, PHP, Node.js and databases.', 'Very good career prospects, especially for people familiar with multiple technologies.'),
(4, 2, 'Database Administrator', 'Specialist responsible for designing, implementing and managing databases.', 'Knowledge of SQL, database systems (MySQL, PostgreSQL, Oracle, SQL Server), query optimization skills.', 'Stable job market with growing demand for big data specialists.'),
(5, 2, 'Project Manager', 'Person responsible for planning, implementing and finalizing IT projects.', 'Knowledge of project management methodologies (PRINCE2, PMI, Agile, Scrum), soft skills, basic technical knowledge.', 'Very good career prospects, especially for people with certificates and experience.'),
(6, 2, 'Cybersecurity Specialist', 'Expert responsible for protecting IT systems from threats.', 'Knowledge of security issues, monitoring tools, penetration tests, cryptography.', 'One of the fastest growing areas of IT with very high demand for specialists.'),
(7, 2, 'DevOps Engineer', 'Specialist combining software development with IT operations.', 'Knowledge of CI/CD systems, containerization, automation, cloud, scripts.', 'Growing demand for DevOps specialists in companies implementing modern work methodologies.'),
(8, 2, 'Data Scientist', 'Expert analyzing data and creating machine learning models.', 'Knowledge of statistics, machine learning, programming languages (Python, R), data analysis tools.', 'One of the most sought-after professions in IT with very good development prospects.');

-- Dodawanie przykładowych umiejętności
INSERT INTO skills (skill_type, icon_path) VALUES
('technical', 'html_icon.svg'), -- HTML
('technical', 'css_icon.svg'), -- CSS
('technical', 'js_icon.svg'), -- JavaScript
('technical', 'react_icon.svg'), -- React
('technical', 'python_icon.svg'), -- Python
('technical', 'java_icon.svg'), -- Java
('technical', 'sql_icon.svg'), -- SQL
('technical', 'network_icon.svg'), -- Sieci
('technical', 'security_icon.svg'), -- Bezpieczeństwo
('technical', 'cloud_icon.svg'), -- Chmura
('soft', 'communication_icon.svg'), -- Komunikacja
('soft', 'teamwork_icon.svg'), -- Praca zespołowa
('soft', 'problem_solving_icon.svg'); -- Rozwiązywanie problemów

-- Dodawanie tłumaczeń umiejętności (polski)
INSERT INTO skill_translations (skill_id, language_id, name, description) VALUES
(1, 1, 'HTML', 'Język znaczników używany do tworzenia struktury stron internetowych.'),
(2, 1, 'CSS', 'Język arkuszy stylów używany do opisywania prezentacji dokumentów HTML.'),
(3, 1, 'JavaScript', 'Język programowania używany do tworzenia interaktywnych stron internetowych.'),
(4, 1, 'React', 'Biblioteka JavaScript do budowania interfejsów użytkownika.'),
(5, 1, 'Python', 'Wszechstronny język programowania wysokiego poziomu.'),
(6, 1, 'Java', 'Obiektowy język programowania ogólnego zastosowania.'),
(7, 1, 'SQL', 'Język zapytań używany do zarządzania bazami danych.'),
(8, 1, 'Sieci komputerowe', 'Wiedza o projektowaniu, wdrażaniu i zarządzaniu sieciami komputerowymi.'),
(9, 1, 'Bezpieczeństwo IT', 'Wiedza o ochronie systemów informatycznych przed zagrożeniami.'),
(10, 1, 'Chmura obliczeniowa', 'Wiedza o usługach chmurowych i ich wdrażaniu.'),
(11, 1, 'Komunikacja', 'Umiejętność jasnego i efektywnego przekazywania informacji.'),
(12, 1, 'Praca zespołowa', 'Umiejętność efektywnej współpracy w grupie.'),
(13, 1, 'Rozwiązywanie problemów', 'Umiejętność analizowania i rozwiązywania złożonych problemów.');

-- Dodawanie tłumaczeń umiejętności (angielski)
INSERT INTO skill_translations (skill_id, language_id, name, description) VALUES
(1, 2, 'HTML', 'Markup language used to create the structure of web pages.'),
(2, 2, 'CSS', 'Style sheet language used to describe the presentation of HTML documents.'),
(3, 2, 'JavaScript', 'Programming language used to create interactive websites.'),
(4, 2, 'React', 'JavaScript library for building user interfaces.'),
(5, 2, 'Python', 'Versatile high-level programming language.'),
(6, 2, 'Java', 'General-purpose object-oriented programming language.'),
(7, 2, 'SQL', 'Query language used to manage databases.'),
(8, 2, 'Computer Networks', 'Knowledge of designing, implementing and managing computer networks.'),
(9, 2, 'IT Security', 'Knowledge of protecting IT systems from threats.'),
(10, 2, 'Cloud Computing', 'Knowledge of cloud services and their implementation.'),
(11, 2, 'Communication', 'Ability to clearly and effectively convey information.'),
(12, 2, 'Teamwork', 'Ability to work effectively in a group.'),
(13, 2, 'Problem Solving', 'Ability to analyze and solve complex problems.');

-- Dodawanie przykładowych stanowisk
INSERT INTO job_positions (career_path_id, level, salary_min, salary_max, years_experience_min, years_experience_max) VALUES
(2, 1, 5000, 8000, 0, 1), -- Junior Frontend Developer
(2, 2, 8000, 14000, 1, 3), -- Mid Frontend Developer
(2, 3, 14000, 20000, 3, 5), -- Senior Frontend Developer
(3, 1, 6000, 9000, 0, 1), -- Junior Backend Developer
(3, 2, 9000, 15000, 1, 3), -- Mid Backend Developer
(3, 3, 15000, 22000, 3, 5); -- Senior Backend Developer

-- Dodawanie tłumaczeń stanowisk (polski)
INSERT INTO job_position_translations (job_position_id, language_id, title, description, responsibilities) VALUES
(1, 1, 'Junior Frontend Developer', 'Początkujący programista interfejsów użytkownika.', 'Tworzenie prostych komponentów UI, implementacja podstawowych funkcjonalności, nauka od bardziej doświadczonych członków zespołu.'),
(2, 1, 'Mid Frontend Developer', 'Programista interfejsów użytkownika z doświadczeniem.', 'Tworzenie złożonych komponentów UI, implementacja zaawansowanych funkcjonalności, optymalizacja wydajności, współpraca z designerami.'),
(3, 1, 'Senior Frontend Developer', 'Doświadczony programista interfejsów użytkownika.', 'Projektowanie architektury frontendu, mentoring juniorów, podejmowanie kluczowych decyzji technicznych, optymalizacja wydajności.'),
(4, 1, 'Junior Backend Developer', 'Początkujący programista backendu.', 'Tworzenie prostych API, implementacja podstawowych funkcjonalności, nauka od bardziej doświadczonych członków zespołu.'),
(5, 1, 'Mid Backend Developer', 'Programista backendu z doświadczeniem.', 'Tworzenie złożonych API, implementacja zaawansowanych funkcjonalności, optymalizacja wydajności, projektowanie baz danych.'),
(6, 1, 'Senior Backend Developer', 'Doświadczony programista backendu.', 'Projektowanie architektury backendu, mentoring juniorów, podejmowanie kluczowych decyzji technicznych, optymalizacja wydajności.');

-- Dodawanie tłumaczeń stanowisk (angielski)
INSERT INTO job_position_translations (job_position_id, language_id, title, description, responsibilities) VALUES
(1, 2, 'Junior Frontend Developer', 'Entry-level user interface programmer.', 'Creating simple UI components, implementing basic functionalities, learning from more experienced team members.'),
(2, 2, 'Mid Frontend Developer', 'User interface programmer with experience.', 'Creating complex UI components, implementing advanced functionalities, performance optimization, collaboration with designers.'),
(3, 2, 'Senior Frontend Developer', 'Experienced user interface programmer.', 'Designing frontend architecture, mentoring juniors, making key technical decisions, performance optimization.'),
(4, 2, 'Junior Backend Developer', 'Entry-level backend programmer.', 'Creating simple APIs, implementing basic functionalities, learning from more experienced team members.'),
(5, 2, 'Mid Backend Developer', 'Backend programmer with experience.', 'Creating complex APIs, implementing advanced functionalities, performance optimization, database design.'),
(6, 2, 'Senior Backend Developer', 'Experienced backend programmer.', 'Designing backend architecture, mentoring juniors, making key technical decisions, performance optimization.');

-- Dodawanie relacji stanowisk i umiejętności
INSERT INTO job_position_skills (job_position_id, skill_id, importance_level) VALUES
(1, 1, 5), -- Junior Frontend Developer - HTML
(1, 2, 5), -- Junior Frontend Developer - CSS
(1, 3, 4), -- Junior Frontend Developer - JavaScript
(1, 4, 3), -- Junior Frontend Developer - React
(1, 11, 4), -- Junior Frontend Developer - Komunikacja
(1, 12, 4), -- Junior Frontend Developer - Praca zespołowa
(1, 13, 3), -- Junior Frontend Developer - Rozwiązywanie problemów
(2, 1, 5), -- Mid Frontend Developer - HTML
(2, 2, 5), -- Mid Frontend Developer - CSS
(2, 3, 5), -- Mid Frontend Developer - JavaScript
(2, 4, 4), -- Mid Frontend Developer - React
(2, 11, 4), -- Mid Frontend Developer - Komunikacja
(2, 12, 4), -- Mid Frontend Developer - Praca zespołowa
(2, 13, 4), -- Mid Frontend Developer - Rozwiązywanie problemów
(3, 1, 5), -- Senior Frontend Developer - HTML
(3, 2, 5), -- Senior Frontend Developer - CSS
(3, 3, 5), -- Senior Frontend Developer - JavaScript
(3, 4, 5), -- Senior Frontend Developer - React
(3, 11, 5), -- Senior Frontend Developer - Komunikacja
(3, 12, 5), -- Senior Frontend Developer - Praca zespołowa
(3, 13, 5), -- Senior Frontend Developer - Rozwiązywanie problemów
(4, 5, 4), -- Junior Backend Developer - Python
(4, 6, 4), -- Junior Backend Developer - Java
(4, 7, 3), -- Junior Backend Developer - SQL
(4, 11, 4), -- Junior Backend Developer - Komunikacja
(4, 12, 4), -- Junior Backend Developer - Praca zespołowa
(4, 13, 3), -- Junior Backend Developer - Rozwiązywanie problemów
(5, 5, 5), -- Mid Backend Developer - Python
(5, 6, 5), -- Mid Backend Developer - Java
(5, 7, 4), -- Mid Backend Developer - SQL
(5, 11, 4), -- Mid Backend Developer - Komunikacja
(5, 12, 4), -- Mid Backend Developer - Praca zespołowa
(5, 13, 4), -- Mid Backend Developer - Rozwiązywanie problemów
(6, 5, 5), -- Senior Backend Developer - Python
(6, 6, 5), -- Senior Backend Developer - Java
(6, 7, 5), -- Senior Backend Developer - SQL
(6, 11, 5), -- Senior Backend Developer - Komunikacja
(6, 12, 5), -- Senior Backend Developer - Praca zespołowa
(6, 13, 5); -- Senior Backend Developer - Rozwiązywanie problemów

-- Dodawanie przykładowych certyfikatów
INSERT INTO courses_certifications (career_path_id, provider, url, is_certification, difficulty_level, duration_hours) VALUES
(1, 'Cisco', 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html', true, 4, 300), -- CCNA
(2, 'Meta', 'https://www.coursera.org/professional-certificates/meta-front-end-developer', true, 3, 180), -- Meta Front-End Developer
(3, 'Oracle', 'https://education.oracle.com/oracle-certified-professional-java-se-programmer/trackp_357', true, 4, 200), -- Java SE Programmer
(4, 'Oracle', 'https://education.oracle.com/oracle-database-sql-certified-associate/trackp_457', true, 3, 150), -- Oracle Database SQL
(5, 'PMI', 'https://www.pmi.org/certifications/project-management-pmp', true, 4, 250), -- PMP
(6, 'CompTIA', 'https://www.comptia.org/certifications/security', true, 4, 200), -- CompTIA Security+
(7, 'AWS', 'https://aws.amazon.com/certification/certified-devops-engineer-professional/', true, 5, 300), -- AWS Certified DevOps Engineer
(8, 'TensorFlow', 'https://www.tensorflow.org/certificate', true, 5, 250); -- TensorFlow Developer Certificate

-- Dodawanie tłumaczeń certyfikatów (polski)
INSERT INTO course_certification_translations (course_certification_id, language_id, title, description, learning_outcomes) VALUES
(1, 1, 'Cisco Certified Network Associate (CCNA)', 'Certyfikat potwierdzający umiejętności w zakresie instalacji, konfiguracji, obsługi i rozwiązywania problemów z sieciami średniej wielkości.', 'Zrozumienie podstaw sieci, dostępu do sieci, łączności IP, usług IP, podstaw bezpieczeństwa i automatyzacji.'),
(2, 1, 'Meta Front-End Developer', 'Profesjonalny certyfikat potwierdzający umiejętności w zakresie tworzenia interfejsów użytkownika.', 'Umiejętność tworzenia stron internetowych przy użyciu HTML, CSS, JavaScript i React, stosowanie najlepszych praktyk UX/UI.'),
(3, 1, 'Oracle Certified Professional: Java SE Programmer', 'Certyfikat potwierdzający umiejętności programowania w języku Java.', 'Zrozumienie podstaw języka Java, programowania obiektowego, kolekcji, obsługi wyjątków, wielowątkowości.'),
(4, 1, 'Oracle Database SQL Certified Associate', 'Certyfikat potwierdzający umiejętności w zakresie języka SQL i baz danych Oracle.', 'Umiejętność tworzenia zapytań SQL, manipulowania danymi, tworzenia i zarządzania obiektami bazy danych.'),
(5, 1, 'Project Management Professional (PMP)', 'Certyfikat potwierdzający umiejętności w zakresie zarządzania projektami.', 'Zrozumienie procesów zarządzania projektami, metodyk, narzędzi i technik.'),
(6, 1, 'CompTIA Security+', 'Certyfikat potwierdzający umiejętności w zakresie bezpieczeństwa IT.', 'Zrozumienie zagrożeń i podatności, technologii i narzędzi bezpieczeństwa, zarządzania ryzykiem, architektury i projektowania bezpieczeństwa.'),
(7, 1, 'AWS Certified DevOps Engineer - Professional', 'Certyfikat potwierdzający umiejętności w zakresie DevOps na platformie AWS.', 'Umiejętność wdrażania ciągłej dostawy, automatyzacji infrastruktury, monitorowania i logowania, zarządzania bezpieczeństwem.'),
(8, 1, 'TensorFlow Developer Certificate', 'Certyfikat potwierdzający umiejętności w zakresie tworzenia modeli uczenia maszynowego przy użyciu TensorFlow.', 'Umiejętność budowania modeli uczenia maszynowego, sieci neuronowych, modeli wizji komputerowej i przetwarzania języka naturalnego.');

-- Dodawanie tłumaczeń certyfikatów (angielski)
INSERT INTO course_certification_translations (course_certification_id, language_id, title, description, learning_outcomes) VALUES
(1, 2, 'Cisco Certified Network Associate (CCNA)', 'Certificate confirming skills in installing, configuring, operating and troubleshooting medium-sized networks.', 'Understanding network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation.'),
(2, 2, 'Meta Front-End Developer', 'Professional certificate confirming skills in creating user interfaces.', 'Ability to create websites using HTML, CSS, JavaScript and React, applying best UX/UI practices.'),
(3, 2, 'Oracle Certified Professional: Java SE Programmer', 'Certificate confirming programming skills in Java.', 'Understanding Java language fundamentals, object-oriented programming, collections, exception handling, multithreading.'),
(4, 2, 'Oracle Database SQL Certified Associate', 'Certificate confirming skills in SQL language and Oracle databases.', 'Ability to create SQL queries, manipulate data, create and manage database objects.'),
(5, 2, 'Project Management Professional (PMP)', 'Certificate confirming skills in project management.', 'Understanding project management processes, methodologies, tools and techniques.'),
(6, 2, 'CompTIA Security+', 'Certificate confirming skills in IT security.', 'Understanding threats and vulnerabilities, security technologies and tools, risk management, security architecture and design.'),
(7, 2, 'AWS Certified DevOps Engineer - Professional', 'Certificate confirming skills in DevOps on the AWS platform.', 'Ability to implement continuous delivery, infrastructure automation, monitoring and logging, security management.'),
(8, 2, 'TensorFlow Developer Certificate', 'Certificate confirming skills in creating machine learning models using TensorFlow.', 'Ability to build machine learning models, neural networks, computer vision models and natural language processing.');

-- Dodawanie przykładowych zasobów edukacyjnych
INSERT INTO learning_resources (resource_type, url, skill_id, career_path_id) VALUES
('book', 'https://www.oreilly.com/library/view/html-css-the/9781118206911/', 1, 2), -- HTML & CSS: The Complete Reference
('video', 'https://www.udemy.com/course/the-complete-javascript-course/', 3, 2), -- The Complete JavaScript Course
('course', 'https://www.coursera.org/learn/python', 5, 3), -- Python for Everybody
('article', 'https://www.oracle.com/database/what-is-a-database/', 7, 4), -- What is a Database
('tutorial', 'https://reactjs.org/tutorial/tutorial.html', 4, 2); -- React Tutorial

-- Dodawanie tłumaczeń zasobów edukacyjnych (polski)
INSERT INTO learning_resource_translations (resource_id, language_id, title, description, author) VALUES
(1, 1, 'HTML i CSS: Kompletny przewodnik', 'Kompleksowy przewodnik po HTML i CSS dla początkujących i zaawansowanych.', 'Jon Duckett'),
(2, 1, 'Kompletny kurs JavaScript', 'Kurs online obejmujący wszystkie aspekty języka JavaScript od podstaw do zaawansowanych koncepcji.', 'Jonas Schmedtmann'),
(3, 1, 'Python dla każdego', 'Kurs wprowadzający do programowania w języku Python.', 'Charles Severance'),
(4, 1, 'Czym jest baza danych', 'Artykuł wyjaśniający podstawowe koncepcje baz danych.', 'Oracle'),
(5, 1, 'Samouczek React', 'Oficjalny samouczek wprowadzający do biblioteki React.', 'Facebook');

-- Dodawanie tłumaczeń zasobów edukacyjnych (angielski)
INSERT INTO learning_resource_translations (resource_id, language_id, title, description, author) VALUES
(1, 2, 'HTML & CSS: The Complete Reference', 'Comprehensive guide to HTML and CSS for beginners and advanced users.', 'Jon Duckett'),
(2, 2, 'The Complete JavaScript Course', 'Online course covering all aspects of JavaScript from basics to advanced concepts.', 'Jonas Schmedtmann'),
(3, 2, 'Python for Everybody', 'Introductory course to programming in Python.', 'Charles Severance'),
(4, 2, 'What is a Database', 'Article explaining basic database concepts.', 'Oracle'),
(5, 2, 'React Tutorial', 'Official tutorial introducing the React library.', 'Facebook');
