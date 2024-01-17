const API_URL = "https://lms-render-0tx1.onrender.com";

export async function getMembers() {
  try {
    const res = await fetch(`${API_URL}/base/members`);
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
