0 0,12 * * * root certbot renew --webroot -w /var/www/certbot --quiet --renew-hook "nginx -s reload"
