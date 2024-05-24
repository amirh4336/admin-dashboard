import { redirect } from "react-router-dom";
import { httpService } from "../../../../core/https-server";

/**
 * Perform the login action using the provided request data
 * @param {Object} params - The parameters for the login action
 * @param {Object} params.request - The request object containing the user's login data
 */

export async function loginAction({ request }: { request: any }) {
  // Get form data from the request
  const formData = await request.formData();
  
  // Convert form data to object
  const data = Object.fromEntries(formData);
  
  // Send login data to the server and handle the response
  const response = await httpService.post("/admin/login", data);

  console.log(response);
  // If the login is successful, store the token and redirect to the home page
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect("/");
  }
  // return redirect("/");
}
