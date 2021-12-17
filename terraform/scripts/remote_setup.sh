#!/bin/bash
# The starting directory for the script is realtive to package.json
cd ./terraform

# Initialize Terraform and create the infrastructure
terraform init
terraform fmt
terraform validate
terraform apply -auto-approve

rm -rf terraform.pem | :
terraform output -raw ssh_private_key > terraform.pem
chmod 400 terraform.pem

INSTANCE_PUBLIC_IP=$(terraform output -raw instance_public_ip)

ssh \
ec2-user@$INSTANCE_PUBLIC_IP \
-i terraform.pem \
-o StrictHostKeyChecking=no \
<< EOF
sudo sed -i "s/#GatewayPorts no/GatewayPorts yes/" /etc/ssh/sshd_config
sudo reboot 

EOF

echo "I sleep..."
sleep 20
echo "I still sleep..."
sleep 20
echo "Yet still I sleep..."
sleep 20
echo "Real s___!?!"

ssh \
-fNtR \
$INSTANCE_PUBLIC_IP:3000:localhost:3000 \
ec2-user@$INSTANCE_PUBLIC_IP \
-i terraform.pem \
-o StrictHostKeyChecking=no

# Post the public_ip address to Slack\
[ $NODE_ENV = "dev" ] && SLACK_WEBHOOK_URL=$(grep SLACK_WEBHOOK_URL ./scripts/.env.local | cut -d '=' -f 2-) || SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL

curl \
-X \
POST \
-H 'Content-type: application/json' \
--data '{"text":"'"http://$INSTANCE_PUBLIC_IP:3000"'"}' \
$SLACK_WEBHOOK_URL

# Remove the key
rm -rf terraform.pem || :