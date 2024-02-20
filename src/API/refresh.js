export const refreshTokenAPI = async (token) => {
  try {
    const response = await fetch(
      "https://appcademix-be.cyclic.app/api/auth/refreshtoken",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "POST",
      }
    );
    if (response.ok) return await response.json();
  } catch (error) {
    console.log(error);
  }
};
