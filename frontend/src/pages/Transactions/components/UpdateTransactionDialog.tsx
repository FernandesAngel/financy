import { useState } from "react";
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
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { Category, Transaction } from "../../../types";
import { UPDATE_TRANSACTION } from "../../../lib/graphql/mutations/Transactions";

interface UpdateTransactionDialogProps {
  open: boolean;
  onOpenChange: (oepn: boolean) => void;
  onCreated?: () => void;
  categories: Category[];
  transactionData: Transaction;
}

export function UpdateTransactionDialog({
  open,
  onOpenChange,
  onCreated,
  categories,
  transactionData,
}: UpdateTransactionDialogProps) {
  const [description, setDescription] = useState(transactionData.description);
  const [type, setType] = useState(transactionData.type.toString());
  const [date, setDate] = useState(transactionData.date.split("T")[0]);
  const [amount, setAmount] = useState(transactionData.amount.toString());
  const [category, setCategory] = useState(transactionData.categoryId);

  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success("Categoria atualizada com sucesso");
      onOpenChange(false);
      onCreated?.();
      setType("expense");
      setDescription("");
      setDate("");
      setAmount("");
      setCategory("");
    },
    onError() {
      toast.error("Falha ao atualizar a categoria");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = Number(amount.replace(/\./g, "").replace(",", "."));
    const isoDate = new Date(date).toISOString();

    updateTransaction({
      variables: {
        data: {
          description,
          amount: parsedAmount,
          date: isoDate,
          type,
        },
        categoryId: category,
        updateTransactionId: transactionData.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[32%]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Atualize sua transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <ToggleGroup
              type="single"
              variant="outline"
              spacing={2}
              className="w-full flex flex-row gap-2 items-center justify-between"
              value={type ?? ""}
              onValueChange={(value: string) => {
                if (value) setType(value);
              }}
            >
              <ToggleGroupItem value="expense" className="w-full h-12">
                <CircleArrowDown size={14} /> Despesa
              </ToggleGroupItem>
              <ToggleGroupItem value="income" className="w-full h-12">
                <CircleArrowUp size={14} /> Receita
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-normal">Descrição</Label>
            <Input
              id="descricao"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              disabled={loading}
            />
          </div>
          <div className="space-y-1 flex flex-row items-center justify-between gap-2">
            <div className="w-full">
              <Label className="text-sm font-normal">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="w-full">
              <Label className="text-sm font-normal">Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  R$
                </span>
                <Input
                  id="value"
                  placeholder="0,00"
                  value={amount}
                  className="pl-9"
                  disabled={loading}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (!value) {
                      setAmount("");
                      return;
                    }
                    const numberValue = (Number(value) / 100).toFixed(2);
                    setAmount(
                      numberValue
                        .replace(".", ",")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-normal">Categoria</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories?.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
