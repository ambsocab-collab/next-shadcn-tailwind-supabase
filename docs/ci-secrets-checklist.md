# CI/CD Secrets Configuration Checklist

## Required Secrets

### Environment URLs
Configure these secrets en GitHub repository settings > Secrets and variables > Actions:

#### Staging Environment (Required)
```yaml
Secret Name: STAGING_URL
Description: URL for staging environment
Value: https://staging.gmao.app
Required: Yes

Secret Name: STAGING_API_URL
Description: API URL for staging environment
Value: https://api-staging.gmao.app
Required: Yes
```

#### Production Environment (Performance Tests)
```yaml
Secret Name: PRODUCTION_URL
Description: URL for production environment
Value: https://gmao.app
Required: Optional (performance tests)

Secret Name: PRODUCTION_API_URL
Description: API URL for production environment
Value: https://api.gmao.app
Required: Optional (performance tests)
```

### Notification Configuration
```yaml
Secret Name: SLACK_WEBHOOK_URL
Description: Incoming webhook for Slack notifications
Value: YOUR_SLACK_WEBHOOK_URL_HERE
Required: Optional (notifications)
```

### Authentication Credentials
```yaml
Secret Name: TEST_USER_EMAIL
Description: Email for test user account
Value: test@example.com
Required: Yes (if app requires auth)

Secret Name: TEST_USER_PASSWORD
Description: Password for test user account
Value: secure-test-password
Required: Yes (if app requires auth)

Secret Name: API_AUTH_TOKEN
Description: Bearer token for API authentication
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Required: Yes (if API requires auth)
```

## Configuration Steps

### 1. GitHub Repository Settings

1. Go to repository: https://github.com/your-org/your-repo
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each secret from the list above

### 2. Slack Integration (Optional)

#### Create Slack Webhook:
1. Go to Slack App Directory: https://api.slack.com/apps
2. Create new app or use existing
3. Enable "Incoming Webhooks" feature
4. Create webhook for `#ci-cd` channel
5. Copy webhook URL to `SLACK_WEBHOOK_URL` secret

#### Configure Channel:
```bash
# In your Slack workspace
# Channel: #ci-cd
# Purpose: CI/CD notifications and alerts
# Members: Dev team, QA team, DevOps
```

### 3. Environment-Specific Configuration

#### Staging Configuration:
```yaml
Environment: staging
Base URL: ${STAGING_URL}
API URL: ${STAGING_API_URL}
Database: staging-db
Features: All features enabled
Users: Test accounts
```

#### Production Configuration:
```yaml
Environment: production
Base URL: ${PRODUCTION_URL}
API URL: ${PRODUCTION_API_URL}
Database: production-db
Features: Live features only
Users: Real users (monitoring only)
```

## Security Best Practices

### Secret Management
- ✅ Use repository secrets, not environment variables
- ✅ Rotate secrets regularly (quarterly)
- ✅ Use least privilege principle
- ✅ Audit secret access monthly
- ✅ Never commit secrets to repository

### Access Control
```yaml
Who can manage secrets:
✅ Repository administrators
✅ Designated DevOps team members
❌ All collaborators
❌ External contributors
```

### Secret Naming Conventions
```yaml
Good Examples:
- STAGING_URL
- PRODUCTION_API_URL
- TEST_USER_PASSWORD
- SLACK_WEBHOOK_URL

Bad Examples:
- url
- staging
- password
- slack

Include environment in name:
- STAGING_* for staging
- PRODUCTION_* for production
- TEST_* for test accounts
```

## Environment-Specific Testing

### Test Accounts Setup

#### Staging Test Account:
```yaml
Email: test@yourdomain.com
Password: ${TEST_USER_PASSWORD}
Role: Test User
Permissions: Full access for testing
Purpose: E2E test automation
```

#### API Authentication:
```yaml
Method: Bearer Token
Token: ${API_AUTH_TOKEN}
Header: Authorization: Bearer ${API_AUTH_TOKEN}
Purpose: API test automation
Scope: Read/Write permissions
```

### Database Configuration (if needed)
```yaml
Staging Database:
  Host: ${STAGING_DB_HOST}
  Port: 5432
  Database: ${STAGING_DB_NAME}
  User: ${STAGING_DB_USER}
  Password: ${STAGING_DB_PASSWORD}

Production Database (read-only):
  Host: ${PRODUCTION_DB_HOST}
  Port: 5432
  Database: ${PRODUCTION_DB_NAME}
  User: ${PRODUCTION_DB_READONLY_USER}
  Password: ${PRODUCTION_DB_READONLY_PASSWORD}
```

## Validation Checklist

After configuring secrets, validate each one:

### 1. Environment URLs
```bash
# Test staging URL
curl -I $STAGING_URL
# Expected: 200 OK

# Test staging API
curl -I $STAGING_API_URL/health
# Expected: 200 OK
```

### 2. Authentication
```bash
# Test test user login
curl -X POST $STAGING_API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"'$TEST_USER_EMAIL'","password":"'$TEST_USER_PASSWORD'"}'
# Expected: 200 OK with token
```

### 3. API Token
```bash
# Test API token
curl -X GET $STAGING_API_URL/user/profile \
  -H "Authorization: Bearer $API_AUTH_TOKEN"
# Expected: 200 OK with user data
```

### 4. Slack Webhook
```bash
# Test Slack notification
curl -X POST $SLACK_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"text":"CI/CD secrets test successful"}'
# Expected: Message in #ci-cd channel
```

## Troubleshooting

### Common Issues

**Secret not found**:
- Check exact secret name spelling
- Verify secret exists in repository settings
- Ensure proper casing (STAGING_URL vs staging_url)

**Invalid URL**:
- Verify URL includes protocol (http:// or https://)
- Test URL accessibility
- Check for trailing slashes

**Authentication failure**:
- Verify test account exists and is active
- Check password correctness
- Ensure API token is valid and not expired

**Slack notification not working**:
- Verify webhook URL is correct
- Check channel exists and bot has permission
- Test webhook with curl command

### Debug Commands

```bash
# Test all environment variables
echo "Staging URL: $STAGING_URL"
echo "Staging API: $STAGING_API_URL"
echo "Production URL: $PRODUCTION_URL"

# Test connectivity
curl -f $STAGING_URL || echo "Staging URL failed"
curl -f $STAGING_API_URL/health || echo "Staging API failed"

# Test authentication locally
export TEST_USER_EMAIL="test@example.com"
export TEST_USER_PASSWORD="your-test-password"
pnpm test:e2e --grep "login"
```

## Maintenance

### Monthly Tasks
- [ ] Review secret access logs
- [ ] Rotate authentication tokens
- [ ] Update test account passwords
- [ ] Validate all environment URLs
- [ ] Test Slack integration

### Quarterly Tasks
- [ ] Full security audit of secrets
- [ ] Update API authentication method if needed
- [ ] Review test account permissions
- [ ] Validate disaster recovery procedures

## Emergency Procedures

### If secrets are compromised:

1. **Immediate Actions**:
   - Rotate all compromised secrets immediately
   - Review access logs for unauthorized usage
   - Invalidate any active sessions/tokens

2. **Communication**:
   - Notify security team
   - Alert development team
   - Document incident

3. **Prevention**:
   - Review who has secret management access
   - Implement additional audit logging
   - Consider secret scanning tools

### If CI/CD pipeline fails due to secrets:

1. **Identify missing secret** from error logs
2. **Add secret** to repository settings
3. **Restart workflow** or push new commit
4. **Monitor** for successful execution

---

**Important**: Never commit secrets to version control. Always use GitHub's built-in secret management for sensitive configuration.

**Last Updated**: 2025-12-04
**Next Review**: 2025-03-04