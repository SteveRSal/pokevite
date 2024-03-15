# React Project Technical Assessment

Use this [design](https://www.figma.com/community/file/979132880663340794/pokedex) to create the app with the List, Search and Detail features. You will consume the [PokéAPI](https://pokeapi.co) for render the screens.

## Techs & Libs Used

- [react-router](https://reactrouter.com)
- [react-i18next](https://react.i18next.com/)
- [tailwindcss](https://tailwindcss.com)
- [axios](https://axios-http.com)
- [vite](https://vitejs.dev/)
- [million](https://million.dev)
- [eslint](https://eslint.org)
- [prettier](https://prettier.io)

## Overview

This React project is designed to streamline the technical assessment process for candidates. It provides a comprehensive development environment, allowing candidates to focus solely on demonstrating their coding abilities and understanding of React. The project structure and necessary development tools are pre-configured. Candidates are expected to implement specific screens and develop a library to consume APIs using Axios. This project uses TailwindCSS for styling, ensuring a modern and responsive design.

## Project Structure

The project is structured to promote clean code practices and ease of navigation. The main directories are as follows:

- **src/components**: Contains UI components.
- **src/pages**: Dedicated to housing the screens/pages of the application. Candidates will primarily work within this directory to create the requested features.
- **src/constants**: Stores all the constant values used across the application.
- **src/lib**: A special directory for the Axios API consumption library that candidates will create. This library should offer a simplified and centralized way to manage API requests.

If you need other folders you are free to create them.

## Styling with TailwindCSS

This template is configured to use TailwindCSS, a utility-first CSS framework that allows for rapid UI development. Candidates should leverage TailwindCSS to style their screens, adhering to the design requirements of the assessment. Prior experience with TailwindCSS, while beneficial, is not required, as its utility-first approach is intuitive and well-documented.

## Task Requirements

- **Screen Development:** Implement the screens as outlined in the Figma Design. Ensure that the UI is responsive and accessible.
- **API Consumption Library:** Create a library using Axios for API calls. This library should abstract the complexity of API requests and provide easy-to-use methods for the screens to consume data.

## Submission Guidelines

Upon completion of the assessment, candidates are required to package their code into a .zip file and submit it through to the email. The submission should include all source files within the project's directories, ensuring that the evaluators can review the code and run the project without additional setup. You can do it with git `git archive HEAD -o name.zip`.

## Evaluation Criteria

- **Code Quality:** Clean, readable, and well-organized code following React best practices.
- **Functionality:** Implementation meets the functionality requirements specified in the assessment.
- **Design Implementation:** Effective use of TailwindCSS to create a user interface that matches the provided design specifications.
- **API Integration:** Robust and efficient use of the Axios library to manage API requests and data handling.
- **Unit Testing**: (Bonus) Well-constructed unit tests for components that verify their functionality and robustness.
