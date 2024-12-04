import LoginLayout from "@/components/layout/LoginLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LoginLayout>{children}</LoginLayout>;
}
