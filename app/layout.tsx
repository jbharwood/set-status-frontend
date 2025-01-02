import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/index";
import { cookies } from "next/headers";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

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
            <ReactQueryProvider>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              <SignedIn>
                <SidebarProvider defaultOpen={defaultOpen}>
                  <AppSidebar />
                  <SidebarTrigger />
                  {children}
                </SidebarProvider>
              </SignedIn>
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
