import { httpService } from "../../../../core/https-server";

export async function registerAction({ request }: { request: any }) {
  const formData = await request.formData();
  console.log(formData.get("image"));
  // const data = Object.fromEntries(formData);
  let response;
  // try {
  //   response = await httpService.post("/admin/signup", data);
  // } catch (error) {
  //   console.log(error);
  // }
  return false;
  return response.status === 200;
}
