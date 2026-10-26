# Eduardo Munoz Personal Portfolio

Welcome to the source code for my personal portfolio website! 🎉

This website showcases my skills, projects, and experience in a unique console-inspired interface. It is built using React for the frontend and features a modular structure for easy maintenance and scalability.

🚀 Features

Console-Inspired Design: The website mimics a terminal/console interface for a unique and interactive user experience.

Responsive Design: The site is fully responsive and adapts seamlessly to devices of different screen sizes.

Modular Code: Components are organized into reusable parts, making updates and maintenance straightforward.

Dynamic Content: The site dynamically updates based on user interactions.

🌟 Technologies Used

React: A JavaScript library for building user interfaces.

Node.js: For managing dependencies and running development scripts.

CSS: Custom styles for responsive and interactive design.

🛠️ Installation

If you'd like to run this project locally, follow these steps:

1. Clone the Repository

```
git clone https://github.com/smvckerz/PersonalPortfolio.git
cd PersonalPortfolio
```

2. Install Dependencies

Ensure you have Node.js installed, then run:

```
npm install
```

3. Run the Development Server

To start the website on your local machine:

```
npm start
```

Your site should now be running at http://localhost:3000.

4. Build for Production

To create a production-ready build of the website:

```
npm run build
```

The optimized files will be in the build/ directory.

📂 Project Structure

Here's an overview of the key directories and files:

## 📂 Project Structure

```plaintext
PersonalPortfolio/
├── public/                     # Static files and HTML template (incl. resume PDF)
├── src/
│   ├── index.js                # React entry point
│   ├── App.js                  # Loading screen + routes (/ = site, /console = terminal)
│   ├── Website.js / .css       # Standard portfolio site
│   ├── Home.js / .css          # Console-style interface
│   ├── commands.js             # Console filesystem + command handling
│   ├── EditorModel.js / .css   # In-console code editor
│   ├── Loading.js / .css       # Loading animation
│   ├── App.css, index.css      # Global styles
├── server.js                   # Express API that runs Python for the console (POST /execute, port 4000)
├── matomo/                     # Self-hosted analytics (stats.eduardoemunoz.com)
├── releases/, current          # Deployed builds; Apache serves the `current` symlink
└── package.json
```

🎨 Styling

Custom CSS: Styling files are organized in the src/ folder for each component (e.g., Home.css, Loading.css).

Responsive Design: CSS media queries ensure the site looks great on all devices.

⚡ Additional Features

Dynamic Loading Screen: Displays a spinner while the app loads, enhancing the user experience.

Interactive Console: Users can interact with the website using commands for a more engaging experience.

✨ Future Enhancements

Adding a backend to handle user interactions.

Enhancing animations and transitions.

Introducing more interactive console commands.

Feel free to explore the codebase and customize it for your needs!

## 🚀 CI/CD

Pushing to `main` builds the site with GitHub Actions and deploys it to the Pi as a new release folder. See [DEPLOY.md](DEPLOY.md) for the full flow, manual deploys and rollback.
