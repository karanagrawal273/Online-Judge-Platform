<div align="center">
  <h1 >Online Judge</h1> 
  <h3>Online-Coding-Platform (MERN based Website)</h3>
</div>

An online judge is a platform or system that provides a programming environment to users for solving programming problems and challenges. It allows users to submit their code solutions, which are then compiled and executed against a set of test cases to evaluate correctness and efficiency.

Build a platform that runs and compiles user submitted code for a programming problem securely and judges if the code is correct/wrong.


<h2>Pages:</h2>

1. Home Page

2. Login Page

3. Forgot Password

4. SignUp Page

5. Admin Login Page

6. Problem List Page

7. Add Problem Page

8. Update Problem Page

9. Problem page

10. User Submission Page for this Problem

11. User Profile Page

12. Leaderboard Page


<h2>Problem Statement:</h2>
A coding challenge is a timed event where a set of coding problems is provided to pre-registered participants. Their objective is to solve these problems within the designated timeframe. Once solutions are submitted, they undergo evaluation against undisclosed test cases. Scores are allocated based on the accuracy and efficiency of the solutions. This process ensures fair and unbiased assessment of participants’ coding abilities. The platform responsible for hosting such challenges is commonly referred to as an Online Judge. It serves as the central hub for organising, distributing and evaluating coding challenges, facilitating participation from a global community of programmers. Through these challenges, participants can test their skills, learn from others, and compete in a supportive environment, fostering growth and development in the field of coding. Examples of Online Judges are LeetCode, GeeksForGeeks, Codeforces, etc.

<h2>Overview of the Project:</h2>
Designing a Full Stack Online Judge using MERN stack. Users can register and can create their profile and can read the problems and can submit the solution and get evaluated whether this solution get accepted or not and can interact and contribute to the community.

<h2>Features of the Project:</h2>
Some key features of the Online Judge -

1. Problem Bank -
   * A collection of programming problems across various difficulty levels and categories.
   * Each problem typically includes a description, input/output format, sample test cases and constraints.
   * Users can submit code in various languages like (c++,Java).  
   
2. User Authentication -
   * Users can create accounts, log in and manage their profiles.
   * Authentication is essential for tracking submissions, progress and involving personalised experiences.
   * Secured and managed by using JSON Web Token(JWT) and Cookies.

3. Code Compilation and Execution -
   * The submitted code is compiled/interpreted and executed within a controlled environment without affecting the server using Docker. This ensures security and prevents malicious code from harming the system.
   * The system captures any errors or exceptions during compilation or execution.

4. Testing and Evaluation -
   * The submitted code is tested against multiple test cases to verify its correctness and efficiency.
   * The system provides immediate feedback on whether the solution is passed or failed in each test case.

5. Administration Panel -
   * An interface for administrators to manage users, problems, submissions and other aspects of the platform.
   * The Admin can perform all the CRUD operations of the problems.

6. Accessibility and User Experience -
   * The platform is user-friendly, accessible across different devices and optimised for performance.

7. Dashboard and Progress Tracking -
     * Users have their dashboard where they can track their progress, view their submission history.

8. Leaderboards and Ranking -
    * Users can view their ranking based on various criteria such as number of problems solved, accuracy or efficiency. This foster competition and motivation among users.

<h2>Challenges:</h2>
Designing an Online Judge platform comes with its own set of challenges, ranging from technical consideration to user experience and community management.

Here are some common challenges -
 <h3>1. Scalability</h3>
 Handling a large number of users concurrently submitting and accessing problems requires a scalable architecture that can handle high load efficiency.
 <h3>2. Security</h3>
 Ensuring the security of the platform against attacks such as uploading a code that has some malicious content, unauthorised person get access.

<h2>Solutions for this challenges:</h2>
Utilising scalable cloud infrastructure such as AWS, Google Cloud, etc. and using containerization e.g. Docker for efficient resource utilisation and scaling. Employing sandboxing technique to execute code submission isolated environments. Providing clear error messages and debugging information to users.

<h2>Technologies Used:</h2>

<h3>1. FRONTEND</h3>

   * REACT - React is a popular JavaScript library for building user interfaces.
   * HOOKS - Functions that allows to use state and other React features (useState, useEffect, useLocation)
   * REACT-ROUTER-DOM - Provides routing capabilities for React applications.
   * AXIOS - Used for making HTTP requests from client-side.
   * PROPS - Used for passing data from one component to another.
   * BOOTSTRAP - Framework for building responsive web applications.

<h3>1. BACKEND</h3>

   * NODEJS - JavaScript runtime environment that allows to build server-side and networking applications.
   * EXPRESSJS - Node.js web application framework used to create APIs and web servers quickly and easily.
   * MONGODB - NoSQL database management system used for storing data.
   * MONGOOSE - Object Data Modeling (ODM) library for MongoDB and Node.js.
   * UUID - Universally Unique Identifier to generate unique ID
   * FS - File System module, provides an API for interacting with the file system on your computer or server.
   * PATH - path module, provides utilities for working with file and directory paths.
   * CHILD_PROCESS - child_process module, provides functionalities to spawn child processes, execute shell commands, and communicate with them through streams.
   * NODEMAILER - Node.js module used for sending emails from Node.js applications.
   * DOCKER - Platform and toolset designed to simplify the creation, deployment, and management of applications using containers. 


<h2>Setting Up The Project</h2>

1. First install Node.Js in your local machine.

2. Install a code editor.

3. FORK this Repository.

4. Clone the Repository by copy and run the following command in Git.

   ```bash
   git clone https://github.com/karanagrawal273/Online-Judge-Platform.git

5. Install the dependencies on server
   ```bash
   cd server
   npm install
 
6. Install the dependencies on compiler
   ```bash
   cd compiler
   npm install

5. Install the dependencies on client
   ```bash
   cd client
   npm install

<h2>To Run The Project</h2>

1. To start server
   ```bash
   # On server directory
   nodemon index.js
   
2. To start compiler
   ```bash
   # On compiler directory
   nodemon index.js

3. To start client
   ```bash
   # On client directory
   npm run dev


<h1>Your Project is running on your localhost port 5173</h1>

http://localhost:5173

