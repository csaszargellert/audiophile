provider "aws" {
  region = var.aws_version
  shared_credentials_files = ["~/.aws/credentials"]
}