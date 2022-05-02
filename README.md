# [IoC Table Test](https://react-table-prnvbirajdar.vercel.app/)

## Goal

Allow a user to log in and interact with a data table. 

## Requirements

**Table**

- Use an API endpoint or local storage to access the data.
- The table should have at least 500 rows.
- Columns: `id`, `first name`, `last name`, `email`, `city`, and `registered date`.
- Add another column, `full name`. Join of `first name` and last name, not to be persisted in the data.
- Manipulate `registered at` data to display another column, DSR
- Manage infinite scroll use case
- The user should be able to change the order of columns.
- The user should be able to sort any column.

**Login**

- The user should be able to log in to access and interact with the data.
- Once logged in, display the table and two buttons, `save` and `load`.
- When the `save` button is pressed, the column order should be persisted.
- When the `load` button is pressed, the persisted column order should be displayed.

## Implementation

**Table**

- I decided to use React-Table since it gives us a set of composable hooks that take care of the various table utilities while leaving the styling and UI to the user.
- I used Mockaroo to mock the data set and save it as a JSON file which gets saved to the `localStorage` on the initial render.
- Successfully implemented the various tables, including the `full name` and `DSR` columns without persisting in the data set.
- Column wise sorting and column ordering is functional as well.
- Infinite scrolling behavior is handled with a virtualization library React-Window. It only renders *part* of a large data set (just enough to fill the viewport). It’s like moving a small window up and down a list.

- This helps address some common performance bottlenecks:
1. It reduces the amount of work (and time) required to render the initial view and to process updates.
2. It reduces the memory footprint by avoiding the over-allocation of DOM nodes.

[This is a great example](https://tmdb-viewer.surge.sh/) of fetching data as we scroll. Notice the website does not slow with more scrolling.

In our example, we’re consistently rending close to 60 fps while rendering the data which is ideal for smooth scrolling behavior.

**Login**

- I decided to go with Next-Auth for my authentication since they provide many Sign In providers with very minimal configuration.
- The user needs to log in using their GitHub credentials to view the table.
- There’s an `unauthenticated`, `loading`, and `authenticated` state taking care of authorization and rendering of pages.
- If the user changes the column order and saves, the order is saved to `localStorage`.
- When the user clicks the `Load` button, the saved order is retrieved and the table is rerendered.

## Nice to have/ Future improvements:

- Use `useLocalStorage` hooks, better TypeScript types for React-Table.
- Use an actual API endpoint to test the scrolling resiliency, and how the table would perform.
- Better abstraction of certain components, functions, and hooks.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.