# JaBaKi Production Guardrails

## Pre-Deployment Testing

### ✅ Required Checks Before Push
1. **Local Build Test**
   ```bash
   cd frontend
   npm run build
   ```
   - Must pass without errors
   - No TypeScript compilation issues

2. **Local Development Test**
   ```bash
   npm run dev
   ```
   - All pages load correctly
   - Navigation works
   - Images display properly
   - Language switching functional

3. **Unit Tests**
   ```bash
   cd frontend
   npm run test:run
   ```
   - **Google Images utility tests**:
     - Valid file ID returns correct URL
     - Network errors return empty string
     - Error logging works correctly
   - All utility functions tested
   - Core logic validated
   - Error handling verified
   
   **Test Commands**:
   - `npm run test` - Interactive test runner
   - `npm run test:run` - Run tests once and exit

4. **Backend API Test**
   ```bash
   .\test-backend.ps1
   ```
   - API endpoints responding
   - Google Drive image generation working
   - Response times acceptable

### ✅ Code Quality
- No console.errors in browser
- Responsive design tested (mobile/desktop)
- All links functional
- Forms submit correctly

## Deployment Process

### ✅ Complete Testing Workflow
1. `npm run test:run` - Unit tests
2. `npm run build` - Build validation
3. `.\test-backend.ps1` - Backend API test
4. `npm run dev` - Manual testing

### ✅ Safe Deployment
1. **Complete testing workflow first** - All tests must pass
2. **Small commits** - One feature per commit
3. **Descriptive messages** - Clear commit descriptions
4. **Monitor deployment** - Watch Amplify build logs

### ✅ Rollback Plan
- Keep previous working commit hash
- Use Amplify console to redeploy previous version if needed
- Test rollback in non-peak hours

## Production Monitoring

### ✅ Health Checks
- **Domain accessibility**: https://jabaki.nl
- **SSL certificate**: Valid and auto-renewing
- **Core functionality**: Booking widget, image loading
- **Performance**: Page load times < 3 seconds

### ✅ Incident Response
1. **Immediate**: Rollback to last working version
2. **Investigation**: Check Amplify logs and browser console
3. **Fix**: Apply minimal fix and test locally
4. **Deploy**: Push fix with clear commit message

## Architecture Stability

### ✅ AWS Services
- **Amplify**: Frontend hosting with auto-scaling
- **Lambda**: Backend API with error handling
- **CloudFront**: CDN for global performance
- **Route 53**: DNS with health checks

### ✅ Dependencies
- Keep dependencies updated monthly
- Test major updates in development first
- Monitor for security vulnerabilities

## Emergency Contacts

- **Domain**: Squarespace DNS management
- **Hosting**: AWS Amplify console
- **Backend**: AWS Lambda logs
- **Monitoring**: CloudWatch metrics

---

**Remember**: Production availability is priority #1. When in doubt, don't deploy.