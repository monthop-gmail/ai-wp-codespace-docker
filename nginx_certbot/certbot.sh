envsubst '\$DOMAIN_NAME \$APP_SERVICE_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
certbot certonly --webroot --webroot-path=/var/www/certbot --email $EMAIL --agree-tos --no-eff-email --domain $DOMAIN_NAME
