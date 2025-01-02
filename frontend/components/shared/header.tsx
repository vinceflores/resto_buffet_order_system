import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="p-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div>
        <ul>
          <li>Go to Admin</li>
        </ul>
      </div>
    </div>
  );
}
