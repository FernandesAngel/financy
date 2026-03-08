import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";
import { useAuthStore } from "../../stores/auth";
import { toast } from "sonner";
import logo from "../../assets/logo.svg";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginMutate = await login({
        email,
        password,
      });
      if (loginMutate) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      toast.success("Falha ao realizar o login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src={logo} className="w-44 h-30" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-xl font-bold">Fazer Login</CardTitle>
          <CardDescription>Entre na sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center w-full gap-6">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              Entrar
            </Button>
          </form>

          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-row items-center gap-2">
              <Separator className="w-[45%]" />
              <p>ou</p>
              <Separator className="w-[45%]" />
            </div>
            <CardDescription>Ainda não tem uma conta?</CardDescription>

            <Button variant="outline" className="w-full" asChild size="lg">
              <Link to="/signup">
                {" "}
                <UserRoundPlus /> Criar conta{" "}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
