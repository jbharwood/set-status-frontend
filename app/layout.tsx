import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-screen w-screen max-h-screen max-w-screen mx-auto">
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            <NavBar />
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
