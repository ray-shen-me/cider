import SiteHeader from "@/components/site-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SiteHeader />
            <div className="flex-1 flex flex-col items-stretch">{children}</div>
        </>
    );
}