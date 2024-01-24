import Cookies from "js-cookie";

const API_URL = "https://lms-render-0tx1.onrender.com";

export async function signUp(newUser) {
  try {
    const res = await fetch(`${API_URL}/user/register/`, {
      method: "POST",
      body: newUser,
    });
    if (!res.ok) {
      console.error(`POST request failed with status: ${res.status}`);
      throw new Error("Staff user could not be created");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error("Error during POST request:", error);
    throw new Error("Staff user could not be created");
  }
}

export async function login(email, password) {
  try {
    const formData = {
      email: email,
      password: password,
    };

    const res = await fetch(`${API_URL}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Email or Password incorrect");
    }

    const data = await res.json();
    // return data;
    Cookies.set("token", data.jwt, {
      expires: 1,
      sameSite: "None",
      secure: true,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    if (!Cookies.get("token")) return null;

    const token = Cookies.get("token");
    console.log(token);

    const res = await fetch(`${API_URL}/user/user-view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Could not get user");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  const res = await fetch(`${API_URL}/user/logout/`, {
    method: "POST",
    // credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => console.error("Error during logout:", error));
}
