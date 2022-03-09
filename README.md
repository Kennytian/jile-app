## Jile App starter with Nestjs + Docker + MongoDB

### Project structure
`tree -L 4 -a -I 'node_modules|test_*|dist|.idea|.git'`
```
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
├── docker-compose.yaml
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── app
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   └── app.service.ts
│   ├── base
│   │   ├── base.controller.ts
│   │   └── base.service.ts
│   ├── cats
│   │   ├── cats.controller.spec.ts
│   │   ├── cats.controller.ts
│   │   ├── cats.module.ts
│   │   ├── cats.service.spec.ts
│   │   ├── cats.service.ts
│   │   ├── dto
│   │   │   └── cat.dto.ts
│   │   └── schemas
│   │       └── cat.schema.ts
│   ├── main.ts
│   ├── post
│   │   ├── dto
│   │   │   └── post.dto.ts
│   │   ├── posts.controller.ts
│   │   ├── posts.module.ts
│   │   ├── posts.service.ts
│   │   └── schemas
│   │       └── post.schema.ts
│   └── utils
│       └── params-with-id.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── cats.e2e-spec.ts
│   ├── jest-e2e.json
│   └── posts.e2e-spec.ts
├── tsconfig.build.json
└── tsconfig.json
```


### Generate the database instance
```bash
docker-compose up -d
```

### Installation project dependencies
```bash
pnpm install
```

### Development
```bash
pnpm run start:dev
```

### Testing

### Unit test
```bash
pnpm run test
```
```
 PASS  src/app.controller.spec.ts
 PASS  src/cats/cats.service.spec.ts
 PASS  src/cats/cats.controller.spec.ts

Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.038 s
Ran all test suites.
```

### Test all case in cat
```bash
pnpm run test:e2e -- ./test/cats.e2e-spec.ts --detectOpenHandles
```
```bash
 PASS  test/cats.e2e-spec.ts
  AppController (e2e)
    ✓ Get all cats (252 ms)
    ✓ Create a cat (62 ms)
    ✓ Update a cat (32 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.615 s

```

### Create
```bash
pnpm run test:e2e -- ./test/cats.e2e-spec.ts --testNamePattern "Create a cat" --detectOpenHandles
```
```
 PASS  test/cats.e2e-spec.ts
  AppController (e2e)
    ✓ Create a cat (249 ms)
    ○ skipped Get all cats
    ○ skipped Update a cat

Test Suites: 1 passed, 1 total
Tests:       2 skipped, 1 passed, 3 total
Snapshots:   0 total
Time:        1.922 s, estimated 3 s
```

### Update
```bash
pnpm run test:e2e -- ./test/cats.e2e-spec.ts --testNamePattern "Update a cat" --detectOpenHandles
```
```
 PASS  test/cats.e2e-spec.ts
  AppController (e2e)
    ✓ Update a cat (236 ms)
    ○ skipped Get all cats
    ○ skipped Create a cat

Test Suites: 1 passed, 1 total
Tests:       2 skipped, 1 passed, 3 total
Snapshots:   0 total
Time:        1.863 s, estimated 2 s
```

### Get all cats
```bash
pnpm run test:e2e -- ./test/cats.e2e-spec.ts --testNamePattern "Get all cats" --detectOpenHandles
```
```
PASS  test/cats.e2e-spec.ts
  AppController (e2e)
    ✓ Get all cats (217 ms)
    ○ skipped Create a cat
    ○ skipped Update a cat

Test Suites: 1 passed, 1 total
Tests:       2 skipped, 1 passed, 3 total
Snapshots:   0 total
Time:        1.673 s, estimated 2 s
```