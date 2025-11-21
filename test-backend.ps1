# JaBaKi Backend Health Check Script
Write-Host "Testing JaBaKi Backend API..." -ForegroundColor Green

# Test Google Drive image URL generation
$testImageId = "1EJ1wo3qCWUzdUOoW5AYhZM1Fhz0vGJyW"
$apiUrl = "https://hvdwz13oi7.execute-api.eu-west-1.amazonaws.com/Prod/api/google-image/$testImageId"

try {
    Write-Host "Testing API endpoint: $apiUrl" -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri $apiUrl -Method GET -TimeoutSec 10
    
    if ($response.url -and $response.url.StartsWith("https://lh3.googleusercontent.com")) {
        Write-Host "✅ Backend API is working correctly" -ForegroundColor Green
        Write-Host "Generated URL: $($response.url)" -ForegroundColor Cyan
        
        # Test if the generated URL is accessible
        try {
            $imageResponse = Invoke-WebRequest -Uri $response.url -Method HEAD -TimeoutSec 5
            if ($imageResponse.StatusCode -eq 200) {
                Write-Host "✅ Generated image URL is accessible" -ForegroundColor Green
            }
        } catch {
            Write-Host "⚠️  Generated URL exists but may have access restrictions" -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "❌ Backend returned invalid response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "❌ Backend API test failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ All backend tests passed!" -ForegroundColor Green
Write-Host "Backend is ready for production use." -ForegroundColor Green