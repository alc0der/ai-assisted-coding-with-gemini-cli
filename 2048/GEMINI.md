## Project Overview

This project is a web-based implementation of the popular game 2048. It is built using HTML, CSS, and JavaScript. The game's logic is written in JavaScript and is organized into a set of classes that manage the game's state, handle user input, and render the UI.

## Building and Running

This is a static web project. To run the game, you can open the `index.html` file in your web browser. There is no build process required.

## Development Conventions

The project follows a structured approach to JavaScript development, with each class responsible for a specific aspect of the game. The code is well-documented and easy to follow. The project uses a set of polyfills to ensure compatibility with older browsers.

### Key Files

*   `index.html`: The main HTML file that defines the game's UI.
*   `style/main.css`: The main stylesheet that defines the game's appearance.
*   `js/application.js`: The entry point of the game, which initializes the `GameManager`.
*   `js/game_manager.js`: The core of the game's logic, which manages the game's state and coordinates the other components.
*   `js/grid.js`: The class that represents the game's grid and provides methods for manipulating it.
*   `js/tile.js`: The class that represents a single tile on the grid.
*   `js/html_actuator.js`: The class that renders the game's state to the HTML.
*   `js/keyboard_input_manager.js`: The class that handles user input.
*   `js/local_storage_manager.js`: The class that saves and loads the game's state.
