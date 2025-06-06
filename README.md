## Li Post Generator
This project is tool generates social media posts using info provided by the user and AI generated texts and lets the user preview the post.

# Features
React: A JavaScript library for building user interfaces.
Vite: A fast build tool and development server.
ESLint: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
Material-UI: A popular React UI framework.
State Management: Using Zustand.
Drag and Drop: Enabled by @dnd-kit/core.
CSS-in-JS: Powered by @emotion.
AI Integration: Leveraging @google/generative-ai.
HTML to Canvas: Using html2canvas.
File Compression: With jszip.

##  Getting Started
# Prerequisites
Node.js (>= 14.x)
npm (>= 6.x) or yarn

## Installation
# Clone the repository:
git clone https://github.com/Kraften/li-post-generator.git
cd li-post-generator

# Install dependencies:
npm install

# Development
To start the development server:
npm run dev

# Build
To create a production build:
npm run build

# Project Structure
src/: Contains the source code.
index.js: The main entry point of the application.
package.json: Project configuration and dependencies.
Dependencies
Main
React: ^18.3.1
React DOM: ^18.3.1
@mui/material: ^6.1.7
@google/generative-ai: ^0.21.0
html2canvas: ^1.4.1
jszip: ^3.10.1
zustand: ^5.0.1
Development
Vite: ^5.4.10
@vitejs/plugin-react: ^4.3.3
ESLint: ^9.13.0
@types/react: ^18.3.12
@types/react-dom: ^18.3.1

# Plugins
@vitejs/plugin-react: Uses Babel for Fast Refresh.
@vitejs/plugin-react-swc: Uses SWC for Fast Refresh.
Contributing
Contributions are welcome! Please open an issue or submit a pull request.

# License
This project is licensed under the MIT License.

## Todo

# Frontend
What should be shown before the text is generated.

Rebuild project to use Typescript for future. (LinkedInPostPage is converted to tsx already and all necessary packages are installed)

First paragraph does not get generated at the moment, what should it say and what question should we ask AI go generate it?

Make the whole app scale to work on mobile, there needs to be a new design and layout for this to work.

Make sure the image is the correct scale and that it keeps its original size after saving.

# Backend 
There should be a backend function that saves all posts to a DB.
Feature to lets Sigma send a request to a employee to fill out the Post generator.
There should be a Admin view to lets Sigma see all the saved employee posts.
THe final product should not save the post to local it should save them to a DB when the save button is pressed.