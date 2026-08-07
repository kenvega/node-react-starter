-- Seed users
-- admin@testemail.com / 123456
-- user@testemail.com  / 123456

INSERT INTO users (email, password, role) VALUES
  ('admin@testemail.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'admin'),
  ('user@testemail.com', '$2b$10$Qpx7jlCMgx.a2RK8ROls.eerPjZvZ/l/5d/vuxp2E1xlTpxp2avo6', 'user')
ON CONFLICT (email) DO NOTHING;
