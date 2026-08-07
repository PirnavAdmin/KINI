# KINI Docker Deployment

## DNS

In Hostinger, point both records to `13.207.252.227`:

```text
A  @    13.207.252.227
A  www  13.207.252.227
```

## Containers

This Compose setup runs only the app containers:

```text
frontend: 3000
backend: 5000
```

MySQL should run on the Ubuntu host. The backend reaches host MySQL through `host.docker.internal`, mapped by Docker to the host gateway.

Create the root `.env` file and update the connection string:

```bash
cp .env.example .env
nano .env
docker compose up -d --build
```

## Host Nginx

Use the files in `nginx/conf.d` with Nginx installed on the Ubuntu host. Copy or symlink them into your Nginx config directory.

The HTTP config allows Certbot challenges and redirects normal traffic to `https://www.kiniedx.com`.

## After Certbot

Install certificates for both names:

```bash
sudo certbot certonly --webroot -w ./certbot/www -d kiniedx.com -d www.kiniedx.com
```

Enable HTTPS Nginx config:

```bash
mv nginx/conf.d/10-https.conf.disabled nginx/conf.d/10-https.conf
sudo nginx -t
sudo systemctl reload nginx
```

Final public URL:

```text
https://www.kiniedx.com
```
