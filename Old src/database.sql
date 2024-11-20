CREATE TABLE firechance (
    id INTEGER,
    title VARCHAR(100),
    rating VARCHAR(20)
);

INSERT INTO firechance VALUES
    (1, 'windpattern', '20%'),
    (2, 'humidity', '40%')

    SELECT * 
    FROM firechance
    WHERE rating > 10