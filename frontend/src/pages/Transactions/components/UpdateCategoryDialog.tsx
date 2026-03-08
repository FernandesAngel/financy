import { useState } from "react";
import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
} from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../../components/ui/dialog";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../components/ui/toggle-group";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { UPDATE_CATEGORY } from "../../../lib/graphql/mutations/Category";
import type { Category } from "../../../types";

interface UpdateCategoryDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
  category: Category;
}

export function UpdateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
  category,
}: UpdateCategoryDialogProps) {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [icon, setIcon] = useState(category.icon.toString());
  const [color, setColor] = useState(category.color.toString());

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso");
      onOpenChange(false);
      onCreated?.();
      setTitle("");
      setDescription("");
      setColor("");
      setIcon("");
    },
    onError() {
      toast.error("Falha ao criar a categoria");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategory({
      variables: {
        updateCategoryId: category.id,
        data: {
          title,
          description,
          icon,
          color,
        },
      },
    });
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setColor("");
    setIcon("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[32%]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Atualize sua Categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-sm font-normal">
              Título
            </Label>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value || " ")}
              className="resize-none"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="icone" className="text-sm font-normal">
              Ícone
            </Label>
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              className="flex flex-col gap-2"
              value={icon ?? ""}
              onValueChange={(value: string) => setIcon(value)}
            >
              <div className="w-full flex flex-row align-center justify-between">
                <ToggleGroupItem value="briefcase-business">
                  <BriefcaseBusiness />
                </ToggleGroupItem>
                <ToggleGroupItem value="car-front">
                  <CarFront />
                </ToggleGroupItem>
                <ToggleGroupItem value="heart-pulse">
                  <HeartPulse />
                </ToggleGroupItem>
                <ToggleGroupItem value="piggy-bank">
                  <PiggyBank />
                </ToggleGroupItem>
                <ToggleGroupItem value="shopping-cart">
                  <ShoppingCart />
                </ToggleGroupItem>
                <ToggleGroupItem value="ticket">
                  <Ticket />
                </ToggleGroupItem>
                <ToggleGroupItem value="tool-case">
                  <ToolCase />
                </ToggleGroupItem>
                <ToggleGroupItem value="utensils">
                  <Utensils />
                </ToggleGroupItem>
              </div>
              <div className="w-full flex flex-row align-center justify-between">
                <ToggleGroupItem value="paw-print">
                  <PawPrint />
                </ToggleGroupItem>
                <ToggleGroupItem value="house">
                  <House />
                </ToggleGroupItem>
                <ToggleGroupItem value="gift">
                  <Gift />
                </ToggleGroupItem>
                <ToggleGroupItem value="dumbbell">
                  <Dumbbell />
                </ToggleGroupItem>
                <ToggleGroupItem value="book-open">
                  <BookOpen />
                </ToggleGroupItem>
                <ToggleGroupItem value="baggage-claim">
                  <BaggageClaim />
                </ToggleGroupItem>
                <ToggleGroupItem value="mailbox">
                  <Mailbox />
                </ToggleGroupItem>
                <ToggleGroupItem value="receipt-text">
                  <ReceiptText />
                </ToggleGroupItem>
              </div>
            </ToggleGroup>
          </div>
          <div className="space-y-1">
            <Label htmlFor="cor" className="text-sm font-normal">
              Cor
            </Label>
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              className="w-full flex flex-row gap-2 items-center justify-between"
              value={color ?? ""}
              onValueChange={(value: string) => setColor(value)}
            >
              <ToggleGroupItem value="green" className="p-1 ">
                <div className="bg-primary text-primary w-full h-full">.</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="blue" className="p-1">
                <div className="bg-blue-800 text-blue-800 w-full h-full">.</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="purple" className="p-1">
                <div className="bg-purple-700 text-purple-700 w-full h-full">
                  .
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="pink" className="p-1">
                <div className="bg-pink-500 text-pink-500 w-full h-full">.</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="red" className="p-1">
                <div className="bg-red-600 text-red-600 w-full h-full">.</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="orange" className="p-1">
                <div className="bg-orange-600 text-orange-600 w-full h-full">
                  .
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="yellow" className="p-1">
                <div className="bg-yellow-700 text-yellow-700 w-full h-full">
                  .
                </div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
