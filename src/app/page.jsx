import SessionCard from "@/components/demos/SessionCard";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      Home
      {/* <SessionCard />
      Server: {JSON.stringify(session)} */}
    </div>
  );
}
