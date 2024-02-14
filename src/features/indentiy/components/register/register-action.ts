import { httpService } from "../../../../core/https-server";


export async function registerAction({ request }: { request: any }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}