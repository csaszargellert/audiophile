data "aws_ami" "this" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_vpc" "this" {
  default = true
}

data "cloudinit_config" "this" {
  part {
    content_type = "text/cloud-config"
    content = file("${path.module}/server.yaml")
  }
}

resource "aws_security_group" "this" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic"
  vpc_id      = data.aws_vpc.this.id

  dynamic "ingress" {
    for_each = var.security_group_ingress_rules
    content {
      description      = ingress.value["description"]
      from_port        = ingress.value["port"]
      to_port          = ingress.value["port"]
      protocol         = ingress.value["protocol"]
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = ["::/0"]
    }
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_key_pair" "this" {
  key_name   = var.key_pair_name
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "this" {
  tags = {
    Name = var.ec2_instance_name
  }

  ami           = data.aws_ami.this.id
  instance_type = var.ec2_instance_type

  associate_public_ip_address = true
  key_name = aws_key_pair.this.key_name
  vpc_security_group_ids = [aws_security_group.this.id]

  user_data = data.cloudinit_config.this.rendered
}
