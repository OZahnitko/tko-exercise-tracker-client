resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "deployer_key" {
  key_name   = "Deployer Key"
  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "aws_security_group" "tko_exercise_tracker_client" {
  description = "Fairly loose security group."
  name        = "Multi-24 Security Group"
  vpc_id      = data.aws_vpc.default_vpc.id

  ingress = [
    {
      description      = "All Incoming Traffic"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["${chomp(data.http.local_ip.body)}/32"]
      ipv6_cidr_blocks = ["::/0"]
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]

  egress = [
    {
      description      = "All Outgoing Traffic"
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]

  tags = {
    Name = "Exercise Tracker Client Security Group"
  }
}

resource "aws_instance" "tko_exercise_tracker_client" {
  ami                    = data.aws_ami.amazon_linux_free_tier.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.deployer_key.key_name
  vpc_security_group_ids = [aws_security_group.tko_exercise_tracker_client.id]

  tags = {
    Name = "Exercise Tracker Client Instance"
  }
}
