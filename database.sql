CREATE TABLE todolist (
	"id" serial PRIMARY KEY,
	"task" varchar(500),
	"isComplete" boolean
);

-- Test data
INSERT INTO "todolist" ("task", "isComplete")
VALUES ('clean my room', 'false');