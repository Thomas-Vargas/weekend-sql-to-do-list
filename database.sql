-- Run to create table

CREATE TABLE todolist (
	"id" serial PRIMARY KEY,
	"task" varchar(500),
	"isComplete" boolean,
	"timeCompleted" varChar(100)
);

-- Test data
INSERT INTO "todolist" ("task", "isComplete")
VALUES ('clean my room', 'false');