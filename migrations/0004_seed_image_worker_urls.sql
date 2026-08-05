UPDATE project_images
SET public_url = 'https://apexglass.old-haze-fcbe.workers.dev' || public_url
WHERE object_key LIKE 'seed/%'
  AND public_url LIKE '/projects/%';
