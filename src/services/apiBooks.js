const API_URL = `https://lms-render-0tx1.onrender.com`;

export async function getBooks(filterValue) {
  try {
    let url = `${API_URL}/base/books`;

    if (filterValue) {
      url += `?search=${filterValue}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Books could not be fetched");
  }
}

export async function createBook(newBook) {
  try {
    const res = await fetch(`${API_URL}/base/create-book`, {
      method: "POST",
      body: newBook,
    });

    if (!res.ok) {
      console.error(`POST request failed with status: ${res.status}`);
      throw new Error("Book could not be created");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("Book could not be created");
  }
}

export async function EditBook(newBook, id) {
  try {
    const res = await fetch(`${API_URL}/base/book-update/${id}`, {
      method: "PUT",
      body: newBook,
    });

    if (!res.ok) {
      console.error(`POST request failed with status: ${res.status}`);
      throw new Error("Book could not be edited");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("Book could not be edited");
  }
}

export async function deleteBook(id) {
  try {
    const res = await fetch(`${API_URL}/base/book-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`DELETE request failed with status: ${res.status}`);
      throw new Error("Book could not be deleted");
    }
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw new Error("Book could not be deleted");
  }
}
