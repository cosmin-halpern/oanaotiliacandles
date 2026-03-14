import { redirect } from "next/navigation";

// Root redirects to the store homepage
export default function Root() {
  redirect("/home");
}