#!/bin/bash
# The starting directory for the script is realtive to package.json
cd ./terraform

# Store the IP address of the instance that's about to shutdown,
# so that a notification message regarding the closure can be sent to Slack.
INSTANCE_PUBLIC_IP=$(terraform output -raw instance_public_ip)

# Teardown all resources provisioned by Terraform
terraform apply -destroy --auto-approve

[ $NODE_ENV = "dev" ] && SLACK_WEBHOOK_URL=$(grep SLACK_WEBHOOK_URL ./scripts/.env.local | cut -d '=' -f 2-) || SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL

curl \
-X \
POST \
-H 'Content-type: application/json' \
--data '{"text":"'"http://$INSTANCE_PUBLIC_IP:3000 has been successfully shut down."'"}' \
$SLACK_WEBHOOK_URL