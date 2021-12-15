create TABLE city(
    id SERIAL PRIMARY KEY,
    my_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(50),
    amount INT,
    distance INT
);