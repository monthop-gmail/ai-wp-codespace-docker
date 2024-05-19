FROM nginx:latest

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx cron

# COPY nginx.conf.template /etc/nginx/nginx.conf.template

COPY certbot.sh /certbot.sh
RUN chmod 0755 /certbot.sh

# COPY certbot_renew.sh /etc/cron.d/certbot_renew.sh
# RUN chmod 0755 /etc/cron.d/certbot_renew.sh
# RUN crontab /etc/cron.d/certbot_renew.sh
