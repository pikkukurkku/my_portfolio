require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const projectsData = require("./data/projects.json");


const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (request, response, next) => {
  response.sendFile(__dirname + "/views/home.html");
});



app.get("/api/projects", (request, response, next) => {
  response.json(projectsData);
});


app.get("/projectdetails", (request, response, next) => {
  const projectId = request.query.id;
  const project = projectsData.find((proj) => proj.id === projectId);
  if (project) {
      response.render("project", { project });
  } else {
      response.status(404).send("Project not found");
  }
});


app.get("*", (request, response, next) => {
  response.status(404).sendFile(__dirname + "/views/not-found.html");
});

app.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
