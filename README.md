# MyPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment to Firebase Hosting

### Prerequisites
- Node.js installed
- Firebase CLI installed globally

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase Hosting
```bash
firebase init hosting
```

When prompted:
- Select your existing project: **chethanresume**
- Public directory: **dist/my-portfolio/browser**
- Configure as single-page app: **Yes**
- Overwrite index.html: **No**

### Step 4: Build Your Application
```bash
npm run build
```

### Step 5: Deploy to Firebase
```bash
firebase deploy
```

Your portfolio will be live at: `https://chethanresume.web.app`

### Quick Deploy Command
After initial setup, you can deploy updates with:
```bash
npm run build && firebase deploy
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
