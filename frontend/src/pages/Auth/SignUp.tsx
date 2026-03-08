import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      });
      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (error: unknown) {
      toast.error("Erro ao realizar o cadastro:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-[calc(100vh-4rem)] justify-center flex-col gap-6">
      <img src={logo} className="w-64 h-22" />
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-xl font-bold">Criar conta</CardTitle>
          <CardDescription>
            Começe a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center w-full gap-6">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Nome Completo</FieldLabel>
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="mail@examplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="email">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription className="text-xs">
                A senha deve ter no mínimo 8 caracteres
              </FieldDescription>
            </Field>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              Cadastrar
            </Button>
          </form>
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-row items-center gap-2">
              <Separator className="w-[45%]" />
              <p>ou</p>
              <Separator className="w-[45%]" />
            </div>
            <CardDescription>Já tem uma conta?</CardDescription>

            <Button variant="outline" className="w-full" asChild size="lg">
              <Link to="/">
                {" "}
                <LogIn /> Fazer login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
