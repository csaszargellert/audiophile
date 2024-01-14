variable "aws_region" {
  type = string
  default = "eu-west-3"
  description = "The aws region which terraform will log into. Defaults to Europe (Paris) eu-west-3."
}

variable "security_group_ingress_rules" {
  description = "Rules to allow traffic into EC2 instance"
  type = list(object({
      port = number
      description = string
      protocol = string
  }))
  default = [
    {
      port = 22
      description = "Allow SSH into EC2 instance"
      protocol = "tcp"
    },
    {
      port = 80
      description = "Allow HTTP requests"
      protocol = "tcp"
    },
    {
      port = 443
      description = "Allow HTTPS requests"
      protocol = "tcp"
    },
  ]
}

variable "ec2_instance_type" {
  type = string
  default = "t2.micro"
}

variable "ec2_instance_name" {
  default = "gellert-test"
  type = string
}

variable "key_pair_name" {
  default = "gellert-key"
  type = string
}