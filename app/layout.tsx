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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/index";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

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
                <SidebarProvider defaultOpen={defaultOpen}>
                  <AppSidebar />
                  {/* <NavBar /> */}
                  <SidebarTrigger />
                  {children}
                </SidebarProvider>
              </SignedIn>
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
