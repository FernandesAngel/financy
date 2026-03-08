import { useState } from "react";
import { useAuthStore } from "../../stores/auth";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Page } from "../../components/Page";
import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { LogOut } from "lucide-react";
import { UPDATE_USER } from "../../lib/graphql/mutations/UpdateUser";
import { useMutation } from "@apollo/client/react";
import type { UpdateUserResponse, UpdateUserVariables } from "../../types";

export function Profile() {
  const { user, logout, setUser } = useAuthStore();
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const navigate = useNavigate();

  const [updateUser, { loading }] = useMutation<
    UpdateUserResponse,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted(data) {
      toast.success("Perfil atualizado com sucesso!");
      setUser(data.updateUser);
    },
    onError() {
      toast.error("Erro ao atualizar perfil");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    await updateUser({
      variables: {
        updateUserId: user.id,
        data: {
          name,
        },
      },
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Page>
      <div className="flex flex-col min-h-[calc(90vh-9rem)] items-center justify-center gap-6">
        <Card className="w-full max-w-md rounded-xl">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Avatar className="w-[80px] h-[80px]">
                <AvatarFallback className="bg-zinc-400 text-secondary-foreground">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl font-bold">{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center w-full gap-6">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <Field className="gap-2">
                <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field className="gap-2">
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  placeholder="conta@teste.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
                <FieldDescription className="text-xs">
                  Esse campo não pode ser alterado
                </FieldDescription>
              </Field>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                size="lg"
              >
                Salvar Alterações
              </Button>
              <Button
                type="button"
                className="w-full"
                disabled={loading}
                size="lg"
                onClick={handleLogout}
                variant="outline"
              >
                <LogOut size={14} color="red" />
                Sair da conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
