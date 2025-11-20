# JaBaKi Frontend AWS Deployment Script
Write-Host "Deploying JaBaKi Frontend to AWS S3..." -ForegroundColor Green

# Build the frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
npm run build

# Create S3 bucket (replace with your domain)
$bucketName = "jabaki-frontend-$(Get-Random)"
Write-Host "Creating S3 bucket: $bucketName" -ForegroundColor Yellow
aws s3 mb s3://$bucketName --region eu-west-1

# Enable static website hosting
aws s3 website s3://$bucketName --index-document index.html --error-document index.html

# Upload built files
Write-Host "Uploading files to S3..." -ForegroundColor Yellow
aws s3 sync dist/ s3://$bucketName --delete

# Make bucket public for website hosting
aws s3api put-bucket-policy --bucket $bucketName --policy @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$bucketName/*"
        }
    ]
}
"@

Write-Host "Frontend deployed!" -ForegroundColor Green
Write-Host "Website URL: http://$bucketName.s3-website-eu-west-1.amazonaws.com" -ForegroundColor Cyan