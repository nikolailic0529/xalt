#!/bin/bash

echo "=================================Start Sidekiq ==================================" >> /var/log/eb-hooks.log
chown webapp /var/log/production.log
chmod 644 /opt/elasticbeanstalk/deployment/env
cp /var/app/current/sidekiq.service /etc/systemd/system/
systemctl daemon-reload
systemctl restart sidekiq
