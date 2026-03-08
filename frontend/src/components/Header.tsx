import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import logoIcon from "../assets/logo_icon.svg";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const isDashPage = location.pathname === "/";
  const isTransactionsPage = location.pathname === "/transactions";
  const isCategoriesPage = location.pathname === "/categories";

  return (
    <div className="w-full px-16 pt-6 bg-white pb-6">
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={isDashPage ? "ghostAccent" : "ghost"}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/transactions">
              <Button
                size="sm"
                className="gap-2"
                variant={isTransactionsPage ? "ghostAccent" : "ghost"}
              >
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="sm"
                className="gap-2"
                variant={isCategoriesPage ? "ghostAccent" : "ghost"}
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Avatar>
                  <AvatarFallback className="bg-zinc-400 text-secondary-foreground">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
