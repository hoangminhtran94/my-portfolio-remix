import type { LoaderFunction } from "@remix-run/node";
import { logout } from "~/utils/database/auth.server";
export const loader: LoaderFunction = async ({ request }) => {
  try {
    return await logout(request);
  } catch (error) {
    return error;
  }
};
