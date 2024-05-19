cd /etc/nginx/ssl
openssl req -subj "/CN=$DOMAIN_NAME" -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365