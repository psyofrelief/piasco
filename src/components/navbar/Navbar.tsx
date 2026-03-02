import { auth, signIn, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-end p-4">
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="flex w-full justify-between"
        >
          <p className="text-white">{session.user?.email}</p>
          <button className="rounded bg-white px-4 py-2 text-black">
            Logout
          </button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="rounded bg-white px-4 py-2 text-black">
            Sign in with Google
          </button>
        </form>
      )}
    </nav>
  );
}
