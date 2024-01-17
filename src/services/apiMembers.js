const API_URL = "https://lms-render-0tx1.onrender.com";

export async function getMembers(filterValue) {
  try {
    let url = `${API_URL}/base/members`;

    if (filterValue) {
      url += `?search=${filterValue}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Members could not be fetched");
  }
}

export async function createMember(member) {
  try {
    const res = await fetch(`${API_URL}/base/create-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    if (!res.ok) {
      console.error(`POST request exited with status - ${res.status}`);
      throw new Error("New member could not be added");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("New member could not be added");
  }
}

export async function deleteMember(id) {
  try {
    const res = await fetch(`${API_URL}/base/member-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`DELETE request failed with status: ${res.status}`);
      throw new Error("Member could not be deleted");
    }
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw new Error("Member could not be deleted");
  }
}

export async function editMember(member, id) {
  try {
    const res = await fetch(`${API_URL}/base/member-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    if (!res.ok) {
      console.error(`POST request failed with status: ${res.status}`);
      throw new Error("Member could not be edited");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("Member could not be edited");
  }
}
