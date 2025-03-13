-- CONSTRAINT는 현업에서 잘 사용하지 않음 -> 성능 저하 


CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

CREATE TABLE "sub_stations" (
    "station_id" INTEGER NOT NULL,
    "station_name" TEXT NOT NULL,
    "station_code" INTEGER NOT NULL,
    "sub_line_number" TEXT NOT NULL,
    "location" GEOMETRY(Point, 4326) NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "islocker" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PK_SUB_STATIONS" PRIMARY KEY ("station_id")
);

CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_KKO_token" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PK_USERS" PRIMARY KEY ("user_id")
);

-- CREATE TABLE "courses" (
--     "course_id" INTEGER NOT NULL,
--     "user_id" INTEGER NOT NULL,
--     "content" TEXT NULL,
--     "course_line" GEOMETRY(LINESTRING, 4326) NOT NULL,
--     "created_at" TIMESTAMP NOT NULL,
--     "deleted_at" TIMESTAMP NULL,
--     "status" TEXT NOT NULL,
--     CONSTRAINT "PK_COURSES" PRIMARY KEY ("course_id", "user_id"),
--     CONSTRAINT "FK_users_TO_courses_1" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
-- );

-- CREATE TABLE "my_courses" (
--     "user_id" INTEGER NOT NULL,
--     "course_id" INTEGER NOT NULL,
--     CONSTRAINT "PK_MY_COURSES" PRIMARY KEY ("user_id", "course_id"),
--     CONSTRAINT "FK_users_TO_my_courses_1" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
--     CONSTRAINT "FK_courses_TO_my_courses_1" FOREIGN KEY ("course_id", "user_id") 
--     REFERENCES "courses" ("course_id", "user_id") ON DELETE CASCADE
-- );

-- -- location(x,y) -> geom 

-- ALTER TABLE "sub_stations" ADD COLUMN "x" DOUBLE PRECISION;
-- ALTER TABLE "sub_stations" ADD COLUMN "y" DOUBLE PRECISION;

ALTER TABLE "sub_stations" DROP COLUMN "x";
ALTER TABLE "sub_stations" DROP COLUMN "y";