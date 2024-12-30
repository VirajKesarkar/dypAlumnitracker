SELECT * FROM new;

ALTER TABLE  new
ADD user_id Varchar(30);

INSERT INTO new (user_id)
VALUES (user_2oVoNQGNUvz3z0Y1jH6ELNPByC5);

INSERT INTO new (user_id)
VALUES ('user_2oVoNQGNUvz3z0Y1jH6ELNPByC5');

ALTER TABLE new
ALTER COLUMN user_id TYPE VARCHAR(50);

DELETE FROM new
WHERE user_id = 'user_2oVoNQGNUvz3z0Y1jH6ELNPByC5';

UPDATE new
SET user_id = 'user_2oVoNQGNUvz3z0Y1jH6ELNPByC5'
WHERE age::integer = 20;

INSERT INTO new (student ,age ,company ,user_id)
VALUES ('Veeraj', 21 ,'TCS', 'user_2oVnLxfVMyZVbMzDHqTZehI3Ep2');

INSERT INTO new (student ,age ,company ,user_id)
VALUES
('Aditi', 19 , 'Apple','user_2p9BEIOFPRD79y5U8LZfu4a2SJR'),
('Pranav',23, 'Meta','user_2pC4ecBkEQ4ZgKOIDcGmWfuHLTn'),
('Rahul',21,'Arrow','user_2oWbcDdWnAsJXvUbhlqlTEkoGga');
INSERT INTO new (student ,age ,company ,user_id)
VALUES
('Rohit',21,'KPIT','user_2pC7u6zlf3I1YKxa9Z7TgDB3rrk');
UPDATE new
SET student = 'Ajit'
WHERE company = 'KPIT';

INSERT INTO new (student ,age ,company ,user_id)
VALUES
('Rohit',22,'SLK','user_2pC6ZGdHDPLdAS1J1mnmhUzvAI9')


