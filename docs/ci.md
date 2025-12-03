# CI/CD Pipeline Documentation

## Overview

Este project utiliza GitHub Actions para automatizar la ejecución de pruebas E2E con Playwright. El pipeline está optimizado para velocidad, confiabilidad y detección de tests flakys.

## Pipeline Stages

### 1. Install Dependencies
- **Job**: `install`
- **Purpose**: Cache dependencies para ejecuciones rápidas
- **Caching**: pnpm store con hash de `pnpm-lock.yaml`
- **Node Version**: v20 (definido en workflow)

### 2. Install Playwright
- **Job**: `playwright-install`
- **Purpose**: Instalar browsers de Playwright con dependencias del sistema
- **Caching**: Reutiliza cache del job anterior

### 3. Main Test Execution
- **Job**: `test`
- **Strategy**: Parallel sharding (3 shards)
- **Features**:
  - ✅ **Retry logic** (3 intentos)
  - ✅ **Multiple test types** (smoke, regression, accessibility)
  - ✅ **Environment-specific execution**
  - ✅ **Artifact collection on failure**

### 4. Burn-in Testing 🔥
- **Job**: `burn-in`
- **Purpose**: Detect tests flakys antes del merge
- **Iterations**: 10 ejecuciones consecutivas
- **Trigger**: Solo en Pull Requests a main/main-bs
- **Blocking**: Cualquier fallo bloquea el merge

### 5. Performance Tests
- **Job**: `performance`
- **Schedule**: Daily o manual con `test_type=all`
- **Environment**: Production URLs
- **Purpose**: Monitoreo de rendimiento del sistema

### 6. Result Aggregation
- **Job**: `merge-results`
- **Purpose**: Unificar resultados de todos los shards
- **Outputs**: HTML report + JUnit XML
- **Integration**: GitHub test reporter para PRs

### 7. Notifications
- **Job**: `notify`
- **Channel**: Slack (#ci-cd)
- **Triggers**: Solo en merges a main/main-bs
- **Conditions**: Success/Failure notifications

## Environment Configuration

### Required Secrets

Configure estos secrets en GitHub repository settings:

```yaml
# Staging environment (default)
STAGING_URL: "https://staging.gmao.app"
STAGING_API_URL: "https://api-staging.gmao.app"

# Production environment (performance tests)
PRODUCTION_URL: "https://gmao.app"
PRODUCTION_API_URL: "https://api.gmao.app"

# Slack notifications
SLACK_WEBHOOK_URL: "https://hooks.slack.com/services/..."
```

### Environment Variables

- `NODE_VERSION`: 20
- `PNPM_VERSION`: 8
- `TEST_ENV`: staging (default)

## Local Development

### Mirror CI Locally

```bash
# Run full CI pipeline locally (reduced burn-in)
./scripts/ci-local.sh

# Include performance tests
./scripts/ci-local.sh --include-performance
```

### Selective Testing

```bash
# Test only changed files
./scripts/test-changed.sh

# Burn-in testing for specific patterns
./scripts/burn-in.sh 10 "smoke"
./scripts/burn-in.sh 5 "login"
```

### Manual Test Execution

```bash
# Smoke tests
pnpm test:e2e --grep "smoke"

# Regression tests
pnpm test:e2e --grep "regression"

# Accessibility tests
pnpm test:e2e --grep "accessibility"

# All tests with sharding
pnpm test:e2e --shard=1/3
pnpm test:e2e --shard=2/3
pnpm test:e2e --shard=3/3
```

## Performance Targets

| Stage | Target Time | Purpose |
|-------|-------------|---------|
| Install | <2 min | Dependencies + cache |
| Playwright Install | <3 min | Browsers |
| Test (per shard) | <10 min | Main execution |
| Burn-in | <15 min | Flaky detection |
| Total | <45 min | Complete pipeline |

**Speedup**: 20x más rápido que ejecución secuencial through sharding y caching.

## Debugging CI Failures

### 1. Check Artifacts
- Download `playwright-results-shard-*` artifacts
- Review `test-results/` for screenshots/videos
- Open `playwright-report/html/` for detailed traces

### 2. Reproduce Locally
```bash
# Use same environment as CI
export BASE_URL="https://staging.gmao.app"
export API_URL="https://api-staging.gmao.app"

# Run failing test
pnpm test:e2e tests/e2e/failing-spec.ts
```

### 3. Check Common Issues

**Timeout failures**:
- Aumentar `actionTimeout` en `playwright.config.ts`
- Verificar `BASE_URL` está accesible

**Flaky tests**:
- Ejecutar burn-in local: `./scripts/burn-in.sh`
- Agregar waits explícitos
- Revisar selectores frágiles

**Environment issues**:
- Verificar secrets configurados
- Check network connectivity
- Review test data setup

## Burn-in Strategy

### When to Run
- ✅ Pull Requests a main/main-bs
- ✅ Weekly schedule (opcional)
- ✅ After test infrastructure changes
- ❌ No en cada commit (demasiado lento)

### Failure Threshold
- **1 failure** en 10 iterations = tests son flaky
- Must fix antes de merge
- Documentar fixes en PR

### Iteration Guidelines
- **10 iterations** para thorough detection
- **3 iterations** para quick feedback
- **100 iterations** para high-confidence stability

## Quality Gates

### Pre-merge Requirements
- [ ] All smoke tests pass
- [ ] Burn-in completes without failures
- [ ] No new flaky tests introduced
- [ ] Performance regression within acceptable bounds

### Post-merge Monitoring
- [ ] Daily cron jobs complete successfully
- [ ] Performance alerts trigger investigations
- [ ] Artifacts retained for debugging (30 days)

## Customization

### Adding New Test Types
1. Add grep pattern en `test` job
2. Add corresponding entry en workflow dispatch
3. Update documentation

### Adjusting Sharding
```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]  # Increase to 4 shards
```

### Modifying Burn-in
```yaml
for i in {1..20}; do  # Increase iterations
  # ... test command
done
```

## Security Notes

- ✅ Minimal permissions (read-only por defecto)
- ✅ No sensitive data en logs
- ✅ Secrets properly scoped
- ✅ Artifact retention limit configured

## Troubleshooting

### Common Errors

**"No tests found"**:
- Check `testDir` en `playwright.config.ts`
- Verify test files exist
- Review grep patterns

**"Authentication failed"**:
- Verify auth setup in fixtures
- Check environment variables
- Review test user credentials

**"Browser not installed"**:
- Ensure playwright-install job completes
- Check Playwright version compatibility
- Verify `--with-deps` flag

### Getting Help

1. Check [GitHub Actions logs](https://github.com/your-repo/actions)
2. Download and review artifacts
3. Reproduce issue locally with `./scripts/ci-local.sh`
4. Check [Playwright documentation](https://playwright.dev/)
5. Review project issues or create new one

---

**Last Updated**: 2025-12-04
**Pipeline Version**: 2.0 (with burn-in enhancement)