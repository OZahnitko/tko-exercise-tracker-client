output "instance_public_ip" {
  value = aws_instance.tko_exercise_tracker_client.public_ip
}

output "ssh_private_key" {
  sensitive = true
  value     = tls_private_key.ssh_key.private_key_pem
}

output "local_ip" {
  value = chomp(data.http.local_ip.body)
}
