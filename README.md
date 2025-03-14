### EML Coding Challenge
    Steps to run code locally:

    git clone https://github.com/Ajinkya710/Ajinkya-EML-Test

    Backend:
    cd Ajinkya-EML-Test/backend
    npm install
    npm run start:dev
    This will start the nestjs backend server on http://localhost:3000.

    FrontEnd:
    cd Ajinkya-EML-Test/frontend
    npm install
    npm run dev
    This will start the nestjs backend server on http://localhost:5173.

    NOTE: Please use following details to login (User is hardcoded with bcrypt hash value)
    username: ajinkya-test
    password: ajinkya-test-password

### Code Structure
FrontEnd:
The code uses Redux for state management, styled-components for styling, antd for components and axios for api communication

    store - Manages all the state data for a particular page
        
        - slice.ts: Contains the state and reducers for the page
        
        - selector.ts: Contains selectors to access specific data from the slice
        
        - action.ts: Contains API calls related to the page, including actions that update the state
        
        - types.ts: Defines the TypeScript types for the slice’s state and actions

    http.ts - Contains reusable modular methods ($get, $post, $put) for making API requests across the application

    Pages - Contains all the pages of the application, each with its own logic, store, and UI

    Common - Contains reusable components such as

        - PrivatePage: Component for handling private routes

        - Layout: Common Layout component for pages

        - Spinner: Reusable loading spinner component

Backend:
The code uses NestJS, Data used is JavaScript Objects.

    modules - Manages controllers, service, dto, entities and module for each functionality

        - /toDo - crud operation end points related to ToDO

        - /user - login end point for hardcoded user. Return a token on successful login
    