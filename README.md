# Receipts CRUD

**Receipts CRUD** is a web SPA that allows a user to track their receipts. Users can enter the amount of the receipt, comments and choose the supplier of each one.

There are two roles in the app:

- **User**: They have access to the Receipts and Profile pages. They can only create, edit, and update receipts.
- **Admin**: They have access to the Receipts, Profile, Users and Catalogs pages. In addition to being able to handle receipts, admins can add, edit and delete users and suppliers.

## URL

https://receipts-crud.herokuapp.com/

**NOTA**: The first time, the application and the login can take a little bit to load. This is because the Azure/Heroku hosting is shut down when it is not being used. This is a limitation of the free hosting plan.

## Technologies and dependencies

- **React JS**: Frontend library.
- **Heroku**: The web app is hosted in Heroku servers.
- **Bootstrap 4.4**: CSS framework for UI responsive design.
- **JQuery**: JQuery was used to manually handle Bootstrap components.
- **MDB Datatable**: MDB is a UI components kit. In this app, I used the Datatable component to show the data, which includes the search and pagination features out of the box.
- **Validation.js**: This library was used to easily validate user inputs, having rules such as: is email, is numeric value, etc.
- **Axios**: Axios was used to send requests to the web API and to easily handle promises.
- **Font Awesome**: All the icons that you can find in the app belong to this CSS library.
- **Moment.js**: This library was used to format the dates in some tables.

## Rules and validations

- All the fields are required.
- Names and phones can be numbers or letters.
- Phones are 10 characters max.
- Admins can't edit nor delete their own user.
- The user admin@test.com can't be deleted as it is the main admin.
- You can't register suppliers or users with an existing name.
- Only admins have access to Users and Catalogs pages.
- In order to reset the password, the user's email must be real because a password change email is sent by Firebase.
- When deleting a supplier, all the receipts linked to that supplier ID will be deleted.
