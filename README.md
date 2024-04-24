# lint-pr-title

GitHub Action for linting PR titles. It validates PR title against [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules.


## Usage

Create a new GH workflow, e.g. `.github/workflows/prLinter.yml`:

```yaml
name: Lint PR title
on:
  pull_request:
    types: [opened, reopened, edited, synchronize]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: comandeer/lint-pr-title@v1
```

## License

See [LICENSE](./LICENSE) file for details.
