ALTER TABLE users ADD INDEX email_index (email);


DELETE FROM users
WHERE email = 'f219143@cfd.nu.edu.pk';

UPDATE users
SET role = 'Admin'
WHERE email = 'mustafa782a@gmail.com';

