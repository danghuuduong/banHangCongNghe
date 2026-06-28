export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin layout: no Header/Footer from root layout
  return <>{children}</>;
}
