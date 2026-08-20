#!/bin/bash
# JaBaKi AWS SAM Deployment Script
set -e

echo -e "\033[32mDeploying JaBaKi Backend to AWS Lambda...\033[0m"

echo -e "\033[33mBuilding SAM application...\033[0m"
sam build

echo -e "\033[33mDeploying to AWS...\033[0m"
sam deploy --resolve-s3

echo -e "\033[32mDeployment complete!\033[0m"
