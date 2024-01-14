resource "aws_s3_bucket" "this" {
  bucket = var.s3_bucket_name
}

resource "aws_iam_policy" "this" {
  name        = var.iam_policy_name
  path        = "/"
  description = "This IAM Policy only allows creating, deleting and retrieving objects from s3 bucket"

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ],
        "Resource": "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

resource "aws_iam_user" "this" {
  name = var.iam_user_name
  path = "/"
}

resource "aws_iam_user_policy_attachment" "this" {
  user       = aws_iam_user.this.name
  policy_arn = aws_iam_policy.this.arn
}

resource "aws_iam_access_key" "this" {
  user = aws_iam_user.this.name
}
