# Connections (React, Tailwind, Shadcn/ui)

This is a clone of the [NYT Connections Game](https://www.nytimes.com/games/connections). Which itself seems to be an unacknowledged clone of the British game [`Only Connect`](https://kotaku.com/new-york-times-connections-only-connect-puzzle-wordle-1850553072).

Anyways..

### [Click Here To Try Out The Demo](https://blackconnections.andcomputers.io/)

![Gif of Connections Gameplay](/docs/instructions-gif-connections.gif)

## To Run Locally:

### Prerequisites
- Node.js 20 or higher (`.nvmrc` file included for `nvm` users)

### Development
```bash
cd react-connections-game
npm install --legacy-peer-deps
npm run dev
```

### Using Docker
```bash
# Build and run locally
docker-compose up

# Or use pre-built image from GitHub Container Registry
docker-compose -f docker-compose.simple.yml up
```

The app will be available at `http://localhost:3000`

### Available Scripts
- `npm start` - Start development server (alias for `npm run dev`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:ui` - Open Vitest UI for visual test exploration
- `npm run storybook` - Start Storybook for component development (requires .jsx refactoring)
- `npm run build-storybook` - Build static Storybook site
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Remove all build artifacts and dependencies

### Technology

- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Spring](https://www.react-spring.dev/) for animations
- [Shadcn/ui](https://ui.shadcn.com/) for primitive components
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for testing
- [Storybook](https://storybook.js.org/) for component documentation
- Copied a number of utility functions from a [React Wordle Clone - cwackerfuss/react-wordle](https://github.com/cwackerfuss/react-wordle)
- Built with [Parcel](https://parceljs.org/)
- Dockerized with multi-stage builds (Node 20 + nginx)

### Code Organization

- Global state (game status, guesses, etc.) is handled using React's Context API. The provider components are in `src/providers`
- Components are in `src/components`
  - Primitive components imported from `shadcn/ui` library and lightly edited are in `src/components/ui`
  - The `Sparkles` component is taken from [Josh Comeau's article on creating animated sparkles in React.](https://www.joshwcomeau.com/react/animated-sparkles-in-react/).
- Helper functions for local storage, game statistics, and constants are in `src/lib`
  - The actual puzzle data for changing the content of each puzzle is in `src/lib/data.js`
- Custom hooks are in `src/hooks`
  - Both of these are code snippets taken from [Josh Comeau's Blog](https://www.joshwcomeau.com/snippets/)

### CI/CD

This project includes a GitHub Actions workflow that automatically:
- Runs format checks with Prettier
- Executes the test suite with Vitest
- Builds the application
- Builds and publishes Docker images to GitHub Container Registry (on main branch)

All checks run on every pull request to ensure code quality.

### Testing

Tests are written using Vitest and React Testing Library:
```bash
npm test              # Watch mode for development
npm run test:run      # Run once (used in CI)
npm run test:ui       # Visual test interface
```

### Component Documentation (Storybook)

Storybook is configured for component documentation and interactive development:
```bash
npm run storybook          # Start Storybook dev server (port 6006)
npm run build-storybook    # Build static Storybook site
```

Component stories available:
- `WordButton` - Interactive word selection button with multiple scenarios
- `Button` - All button variants and sizes from the design system  
- `Badge` - Badge variants with game status examples

Storybook includes:
- Visual component library for isolated development
- Accessibility checks via @storybook/addon-a11y
- Automatic documentation generation
- Integration with Vitest for component testing

### Performance Monitoring & Analytics

This app includes built-in support for performance monitoring and analytics:

#### Core Web Vitals

The app automatically tracks [Core Web Vitals](https://web.dev/vitals/) metrics:
- **LCP** (Largest Contentful Paint) - Loading performance
- **INP** (Interaction to Next Paint) - Responsiveness  
- **CLS** (Cumulative Layout Shift) - Visual stability
- **FCP** (First Contentful Paint) - Initial render
- **TTFB** (Time to First Byte) - Server response time

In development mode, these metrics are logged to the console. In production, they can be sent to your analytics provider.

#### Game Analytics

The following game events are automatically tracked:
- Game lifecycle: `game_won`, `game_lost`
- Player actions: `guess_submitted`, `guess_correct`, `guess_incorrect`
- UI interactions: `shuffle_clicked`, `deselect_clicked`, `view_results_clicked`, `share_score_clicked`, `info_modal_opened`

#### Configuring Analytics

The analytics system is provider-agnostic. To enable analytics in production, add one of the following to your HTML:

**Google Analytics 4:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Plausible Analytics:**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**Custom Analytics:**
```javascript
// Set your analytics instance on window object
window.analytics = {
  track: (event, properties) => {
    // Your custom tracking implementation
  },
  page: (path) => {
    // Your custom page view tracking
  }
};
```

All analytics code is located in `src/lib/analytics.js` and `src/lib/performance.js` for easy customization.

#### Similar Projects

- [PuzzGrid](https://puzzgrid.com/about) which allows you to create your own games/puzzles, no code required.
- [Connections Generator by swellgarfo](https://www.reddit.com/r/NYTSpellingBee/comments/152i5cx/for_those_playing_nyt_connections_i_created_a/) which also allows you to create your own games/puzzles, no code required.

### Contributing

Please fork and submit a PR if you'd like! 

**Development Requirements:**
- Node.js 20+ (use `nvm use` if you have nvm installed)
- Run `npm install --legacy-peer-deps` to install dependencies
- Run `npm test` while developing to ensure tests pass
- Run `npm run format` before committing to maintain code style
- All PRs must pass CI checks (formatting, tests, build)

### Projects Built Using This Repo:

- _your fork here!_

_Want to add one to the list? Please make a pull request._

#### If you found this helpful or entertaining feel free to check out our other work!

- [Writings & Thoughts](https://andcomputers.io)
- [Black Wordle](https://blackwords.andcomputers.io)

##### If you'd like to support financially

- [One-Time Contribution via Stripe](https://buy.stripe.com/7sIg1Udac6xZegodQR)
