const API_URL = "https://lms-render-0tx1.onrender.com";

export async function getTransactions() {
  try {
    const res = await fetch(`${API_URL}/base/transactions`);

    if (!res.ok) {
      throw new Error("Transactions could not be fetchec");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function issueBookReturn(newTransaction, id) {
  try {
    const res = await fetch(`${API_URL}/base/transaction-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!res.ok) {
      console.error(`PUT request failed with status ${res.status}`);
      throw new Error("Book return could not be issued");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error("Book return could not be issued");
  }
}

export async function createTransaction(newTransaction) {
  try {
    const res = await fetch(`${API_URL}/base/create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!res.ok) {
      console.error(`POST request failed with status: ${res.status}`);
      throw new Error("Book could not be issued");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("Book could not be issued");
  }
}
