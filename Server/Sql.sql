ALTER TABLE users ADD INDEX email_index (email);


DELETE FROM users
WHERE email = 'mqmq602@gmail.com';

UPDATE users
SET role = 'Admin'
WHERE email = 'f219085@cfd.nu.edu.pk';

