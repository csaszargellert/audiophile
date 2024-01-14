output "iam_access_key_id" {
  description = "The access key ID."
  value = aws_iam_access_key.this.id
}

output "iam_secret_access_key" {
  description = "The secret access key. This will be written to the state file so should be treated as sensitive data."
  value = aws_iam_access_key.this.secret
  sensitive = true
}

output "aws_s3_bucket_name" {
  description = "The name of the bucket."
  value = aws_s3_bucket.this.id
}

output "aws_s3_bucket_region" {
  description = "The region this bucket resides in."
  value = aws_s3_bucket.this.region
}