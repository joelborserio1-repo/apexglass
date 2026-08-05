INSERT OR IGNORE INTO projects (slug,title,service,location,description,year,featured,sort_order) VALUES
('newcastle-frameless-shower','Newcastle Frameless Shower','Frameless shower screens','Newcastle','Fluted frameless shower panel installed within a warm stone bathroom.',2026,1,10),
('central-coast-bathroom','Central Coast Bathroom','Custom mirrors and glazing','Central Coast','Dark feature mirror and custom bathroom glazing.',2026,1,20),
('hunter-valley-pool-fence','Hunter Valley Pool Fence','Pool fencing','Hunter Valley','Frameless pool fencing designed to preserve open sightlines.',2026,1,30);

INSERT OR IGNORE INTO project_images (project_id,object_key,public_url,alt_text,sort_order)
SELECT id,'seed/glass2.jpeg','/projects/glass2.jpeg','Fluted frameless shower panel in a warm stone bathroom',10 FROM projects WHERE slug='newcastle-frameless-shower';
INSERT OR IGNORE INTO project_images (project_id,object_key,public_url,alt_text,sort_order)
SELECT id,'seed/glass3.jpeg','/projects/glass3.jpeg','Custom mirror and dark bathroom glazing',10 FROM projects WHERE slug='central-coast-bathroom';
INSERT OR IGNORE INTO project_images (project_id,object_key,public_url,alt_text,sort_order)
SELECT id,'seed/glass6.jpeg','/projects/glass6.jpeg','Frameless glass pool fence with open views',10 FROM projects WHERE slug='hunter-valley-pool-fence';
