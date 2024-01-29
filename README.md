# Library Management System Web Application

This is a Library Management System intended to streamline the operations of a library. The application is designed for exclusive use by librarians enabling them to manage books, and lend to members.
![Screenshot from 2024-01-29 08-41-18](https://github.com/tuwafula/lms-frontend/assets/84623103/c89b15c3-9687-4908-ab45-0984f88fcd16)
![Screenshot from 2024-01-29 08-43-14](https://github.com/tuwafula/lms-frontend/assets/84623103/c2ab3e1f-8fce-4dd6-95bc-390e3eb9a3f1)


## Features
- `Books` - User can perform general CRUD operations on books.
  ![Screenshot from 2024-01-29 09-57-08](https://github.com/tuwafula/lms-frontend/assets/84623103/6ea67991-d8d5-4572-a5cf-12efc7d56e35)
  
- `Members` - User can perform CRUD operations on members.
  ![Screenshot from 2024-01-29 08-45-30](https://github.com/tuwafula/lms-frontend/assets/84623103/381a599a-7385-48a2-9dda-9db1eb639fe2)

- `Transactions` - User can issue book to a member thus initiating a transaction.
![Screenshot from 2024-01-29 08-46-46](https://github.com/tuwafula/lms-frontend/assets/84623103/c6b5265e-575d-4401-bfdf-0d185b8ffa2a)

## Use Cases
### CRUD operations 
Users can perform general CRUD operations on books and members.
![Screenshot from 2024-01-29 08-44-04](https://github.com/tuwafula/lms-frontend/assets/84623103/1cc0043d-de1d-4d71-bacf-310f63881de3)
![Screenshot from 2024-01-29 08-44-12](https://github.com/tuwafula/lms-frontend/assets/84623103/27c58023-f9e4-4af3-b700-177cc84ea545)
![Screenshot from 2024-01-29 08-45-35](https://github.com/tuwafula/lms-frontend/assets/84623103/b83db9c3-064c-489d-a31b-b631e7e0d7ca)
![Screenshot from 2024-01-29 08-46-28](https://github.com/tuwafula/lms-frontend/assets/84623103/6ee6dc29-556f-4feb-8808-b6d88cae5b95)

### Book Issuance 
A user is capable of issuing a book to a member.
![Screenshot from 2024-01-29 08-47-05](https://github.com/tuwafula/lms-frontend/assets/84623103/ba40a51f-82db-4f0a-83e3-0d3764ffc5d9)

### Book Return
A user is capable of issuing a book return to a member.
![Screenshot from 2024-01-29 08-46-55](https://github.com/tuwafula/lms-frontend/assets/84623103/b0ee867b-8eff-46cc-9088-f0ab7b28e2c0)

### Searching a book
A user can search for a book by name and author.
![Screenshot from 2024-01-29 08-44-41](https://github.com/tuwafula/lms-frontend/assets/84623103/524db49e-cc46-45e3-b680-d6c494b997ad)

### Charging a rent fee
A rent fee is automatically charged on a member on return of the book. This is done by calculating the rent fee of the book per day and multiplying by the number of days that the user had borrowed the book.

### Managing outstanding debthttps://lms-net.netlify.app/books
The outstanding debt is maintained at KES.500 or lower by ensuring that members with debts at KES.500 cannot be issued a book
Details about configuring the project, including environment variables, configuration files, etc.

## Additional information
The application's frontend and backend are built separately. The backend is built using the Django-restframework while the frontend is built using React.js
- The frontend is hosted on netlify.com while the backend is hosted on render.com
- Checkout the app: https://lms-net.netlify.app

Guidelines for contributing to the project, including how to report issues and submit pull requests.

## License

This project is licensed under the [License Name](link-to-license).
