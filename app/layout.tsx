import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { NavBar } from "@/components/index";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="h-screen w-screen max-h-screen max-w-screen mx-auto">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <NavBar />
                {children}
              </SignedIn>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
