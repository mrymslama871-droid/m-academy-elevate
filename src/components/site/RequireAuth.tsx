import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, dashboardPathFor, type AppRole } from "@/hooks/use-auth";

export function RequireAuth({
  children,
  role,
}: {
  children: ReactNode;
  role?: AppRole;
}) {
  const { session, role: userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate({ to: "/login" });
      return;
    }
    if (role && userRole && userRole !== role) {
      navigate({ to: dashboardPathFor(userRole) });
    }
  }, [loading, session, userRole, role, navigate]);

  if (loading || !session || (role && userRole !== role)) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }
  return <>{children}</>;
}
