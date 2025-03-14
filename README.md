### Nimbly Code Challenge

The production version of the app can be found here: [Nimbly App](https://nimbly-app.vercel.app/)

    Steps to run code locally:

    git clone https://github.com/Ajinkya710/nimbly-app

    cd nimbly-app
    npm install

    This will start the frontend on http://localhost:3000.

### Code Structure

The code uses Redux for state management, styled-components for styling, antd - table and axios for api communication

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