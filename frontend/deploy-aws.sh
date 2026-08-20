#!/bin/bash
# JaBaKi Frontend AWS Deployment Script
set -e

echo -e "\033[32mDeploying JaBaKi Frontend to AWS S3...\033[0m"

echo -e "\033[33mBuilding frontend...\033[0m"
npm run build

BUCKET_NAME="jabaki-frontend-$(date +%s)"
echo -e "\033[33mCreating S3 bucket: $BUCKET_NAME\033[0m"
aws s3 mb "s3://$BUCKET_NAME" --region eu-west-1

# Enable static website hosting
aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html

# Upload built files
echo -e "\033[33mUploading files to S3...\033[0m"
aws s3 sync dist/ "s3://$BUCKET_NAME" --delete

# Make bucket public for website hosting
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
        {
            \"Sid\": \"PublicReadGetObject\",
            \"Effect\": \"Allow\",
            \"Principal\": \"*\",
            \"Action\": \"s3:GetObject\",
            \"Resource\": \"arn:aws:s3:::$BUCKET_NAME/*\"
        }
    ]
}"

echo -e "\033[32mFrontend deployed!\033[0m"
echo -e "\033[36mWebsite URL: http://$BUCKET_NAME.s3-website-eu-west-1.amazonaws.com\033[0m"
