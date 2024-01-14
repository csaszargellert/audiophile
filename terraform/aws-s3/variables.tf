variable "aws_version" {
  type = string
  default = "eu-west-3"
  description = "The aws region which terraform will log into. Defaults to Europe (Paris) eu-west-3."
}

variable "s3_bucket_name" {
  type = string
  default = "test-bucket-qwertzuiop"
}

variable "iam_policy_name" {
  type = string
  default = "test-bucket-policy"
}

variable "iam_user_name" {
  type = string
  default = "test-iam-user"
}