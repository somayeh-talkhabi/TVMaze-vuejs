# TVMaze Dashboard

## Introduction

This project is a TV show dashboard app. It organizes and shows TV shows by their genres. The app uses the [TVMaze API](http://www.tvmaze.com/api) to get TV show data. It has features like sorting shows by genre, sorting by rating, and showing details for each show. You can also search for TV shows by name. The project includes unit tests for the API services, Vue router, and main components.

## Features

- **Genre-based lists**: TV shows are grouped by genre (e.g., drama, comedy, sports) and shown in horizontal lists.
- **Sort by rating**: Shows in each genre are sorted by their ratings.
- **Show details**: Click on a show to see more information about it.
- **Search**: You can search for TV shows by name.
- **Responsive design**: The app works well on both mobile and desktop.
- **Dark Mode**: You can switch between dark and light mode for better viewing.

## How It’s Built

- **Framework**: The app is built with Vue.js. Vue.js is simple, easy to use, and has a strong community.
- **State Management**: Pinia is used to manage the app’s state. It’s simpler and easier to use than Vuex.
- **Styling**: Tailwind CSS is used for styling. Tailwind makes it easy to create responsive designs quickly.
- **Testing**: Vitest is used for unit testing.
- **TypeScript**: TypeScript is used to make the code more reliable and reduce errors.

## How to Set Up and Run the Project

### What You Need

- **Node.js**: Make sure you have Node.js installed (version 22.x.x is recommended).
- **NPM**: Make sure you have npm installed (version 10.x.x is recommended).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/somayeh-talkhabi/TVMaze-vuejs.git
   ```

2. **Install dependencies:**:

   ```bash
   npm install
   ```

### Running the Application

1. **Development Server**:

   To start the development server, run:

   ```bash
   npm run dev
   ```

   This will start the application.

2. **Build**:

   To build the application for production, run:

   ```bash
   npm run build
   ```

   This will generate the production-ready files in the `dist` directory.

### Testing

**Unit Tests**:

To run unit tests, use:

```bash
npm run test
```

## Conclusion

This project is a TV show dashboard app built with modern tools like Vue.js, Pinia, Tailwind CSS, and TypeScript. It focuses on clean code, reusability, and best practices. The app is tested with unit tests to make sure it works correctly.
