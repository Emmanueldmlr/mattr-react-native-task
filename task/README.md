# Project Name
Project mattr. The project is a simple represantation of a dating app with some basic functionality.

## Table of Contents

- [Key Dependencies](#dependencies)
- [Installation](#installation)
- [Features](#features)
- [Codebase Structure](#codebase-structure)
- [Testing](#testing)
- [Key Algorithms](#algorithms)

## Key Dependencies
- [GluestackUI v1](https://v1.gluestack.io/ui/docs/components/provider/gluestack-uiprovider)
- [Expo v51](https://docs.expo.dev/)

GluestackUI is a UI library that provides a set of components that can be used to build the UI of the application faster. I used version 1 of the library because it is more stable as the latest version is still in beta.

Expo is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase. Expo version 51 was used in this project because it is the latest stable version and it simplifies a lot of processes including the navigations.


## Installation
1. Clone the repository
2. Navigate to the project directory ( `cd task` )
3. Run `yarn install` to install all the dependencies
4. Create a `.env` file in the root directory and add the following environment variables
```
EXPO_PUBLIC_API_URL=https://ad5fd43ff3494e53ae90dfd8c03a23f9.api.mockbin.io/
```
5. Run `npx expo start` to start the project

## Features
1. User can view a list of 5 daily connections by including their image, name, age, location and a button which will allow them to navigate to the user profile view and view more information about them
2. They can filter the daily connections by their gender and age range and also sort the list they see by their matching score (user.score) or date joined (user.created_at).
3. When the user taps on the View Profile button on the Profile card inside the Activity Screen, they will be transfered to a "Other Profile" screen where they can see more information about that user.
4. User can match with other users by tapping the heart icon on the Other Profile screen.
5. User can view their own profile by tapping the Profile icon on the bottom navigation bar.

## Codebase Structure
The project is structured in the following way:
- `task` - Contains all the source code for the project
  - `components` - Contains all the reusable components used in the project
  - `constants` - Contains all the constants data used in the project. This includes the Colors, the Test data, the user profile data.
  - `app` - Contains the main app component and the differenct screens used in the project
  - `services` - Contains all the services used in the project. This includes the API service  for fetching the list of connections 
  - `utils` - Contains all the utility functions used in the project
  - `contexts` - Contains all the context providers used in the project. The project uses the ConnectionContext to manage the connections state
  - `types` - Contains all the types used in the project
  - `hooks` - Contains all the custom hooks used in the project

## Key Dependencies
- [GluestackUI v1](https://v1.gluestack.io/ui/docs/components/provider/gluestack-uiprovider)
- [Expo v51](https://docs.expo.dev/)


## Testing
The project uses Jest and React Testing Library for testing. To run the tests, run `yarn test` in the project directory.

The project has tests for the following functions:
- `FilterConnectionsTest` - Tests the filtering functionality of the `filterConnections` function
- `ShuffleConnectionsTest` - Tests the shuffling functionality of the `shuffleConnections` function
- `CalculateAgeFromDOBTest` - Tests the age calculation functionality of the `calculateAgeFromDOB` function


## Key Algorithms

1. **Filtering**: The project uses the `filterConnections` function to filter the list of connections and return only the connections that match the filter criteria. The function takes in the list of connections and the filter criteria as arguments and returns the filtered list of connections.
parameters:
    - connections: Array<Connection> - The list of connections to filter
    - filters: FilterCriteria - The filter criteria to use for filtering the connections e.g age range, sort by, gender
breakdown:
    - The function begins by creating a shallow copy of the connections array to avoid mutating the original array. This is done using the spread operator ([...connections]).
    - If a gender value is provided, the function filters the connections array to include only those users whose gender matches the specified gender. This comparison is case-insensitive, achieved by converting both the user's gender and the provided gender string to lowercase using toLocaleLowerCase().
    - If an age range is provided, the function filters the connections array to include only those users whose age falls within the specified range. This is done by comparing the user's age with the minimum and maximum age values provided in the age range.
    - If a sort by value is provided, the function sorts the filtered connections array based on the specified sort criteria. The sort criteria can be either `score` or `created_at`. If the sort criteria is `score`, the connections are sorted in descending order of their matching score. If the sort criteria is `created_at`, the connections are sorted in descending order of their join date.
return:
    - Array<Connection> - The filtered and sorted list of connections based on the filter criteria.

2. **Data Fetching**: The project uses the `getConnections` function to fetch the list of connections from the API. 
- The function starts by checking if the allConnections array already has data (`allConnections.length`). If data exists, it immediately returns and does nothing further. This is a guard clause to prevent unnecessary API calls if the data is already loaded.
- The function updates the loading state to true to indicate that the data is being fetched and used to show a loading spinner on the UI.
- The function makes a GET request to the API endpoint using the fetch API. The API URL is retrieved from the environment variables using the `EXPO_PUBLIC_API_URL` key.
- If the fetch is successful, the response (`connection data`) is then used to set two states:
`setAllConnections(response)`: Stores all fetched connections in state. This is useful for having access to the raw data for other operations or checks.
`setConnections(shuffleConnections([...response]).slice(0, CONNECTION_LIMIT))`
- The `shuffleConnections` function is used to shuffle the connections array to randomize the order of connections. This is done to ensure that the daily connections shown to the user are different each time they visit the app.

3. **Shuffling Connections**: The project uses the `shuffleConnections` function to shuffle the list of connections. This function takes in an array of connections and returns a new array with the connections shuffled in random order.
parameters:
    - connections: Array<Connection> - The list of connections to shuffle
breakdown:
    - The function uses a for loop where startPoint begins from the last element of the array (`connections.length - 1`) and decrements until it reaches 1. This loop iterates backward over the array.
    - Within the loop, a random index randomIndex is generated for each iteration. This index is calculated using `Math.floor(Math.random() * (startPoint + 1))`.
    - For each iteration of the loop, the element at the current startPoint is swapped with the element at the randomIndex. This swap is done using array destructuring
return:
    - Array<Connection> - The shuffled list of connections

