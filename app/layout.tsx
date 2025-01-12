import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AIButton, AppSidebar } from "@/components/index";
import { cookies } from "next/headers";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";
import { Metadata } from "next";
import { AI } from "../lib/actions";

export const metadata: Metadata = {
  title: "Set Status",
};

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
              <AI>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
                <SignedIn>
                  <SidebarProvider defaultOpen={defaultOpen}>
                    <AppSidebar />
                    <SidebarTrigger />
                    <AIButton />
                    {children}
                  </SidebarProvider>
                </SignedIn>
              </AI>
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
