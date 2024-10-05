"use server";
export const GetUsers = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/friends/searchUser?id=${id}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Search error:", errorData.error);
      return;
    }

    const data = await res.json();
    return data.Users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
