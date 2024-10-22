import { isAdmin } from "@/utils/amplify-utils";
import '@aws-amplify/ui-react/styles.css';
import { redirect } from "next/navigation";


export default async function AdminPage() {
  //Verification if admin
  if(!await isAdmin()){
    console.log("Redirecting non admin");
    return redirect("/");
  }

  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold">This is the ADMIN&apos;S PAGE</h1>
      </div>
    </div>
  );
}
