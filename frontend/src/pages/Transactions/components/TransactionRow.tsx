/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategoryStyle } from "../../../utils/category-styles-mapping";
import { formatDateSimple } from "../../../utils/formatDate";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { CircleArrowDown, CircleArrowUp, SquarePen, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
import { DELETE_TRANSACTION } from "../../../lib/graphql/mutations/Transactions";
import { UpdateTransactionDialog } from "./UpdateTransactionDialog";
import { useState } from "react";
import type { CategoryResponse, Transaction } from "../../../types";

interface DashRecentTransactionProps {
  transaction: Transaction;
  refetchTransactions: () => void;
  categories: CategoryResponse | undefined;
}

export function TransactionRow({
  transaction,
  refetchTransactions,
  categories,
}: DashRecentTransactionProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { badgeVariant, bgClass, Icon, textClass } = getCategoryStyle(
    transaction.category.color,
    transaction.category.icon,
  );

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success("Categoria deletada com sucesso");
      refetchTransactions();
    },
    onError() {
      toast.error("Falha ao deletar a categoria");
    },
  });

  const handleDeleteTransaction = (deleteCategoryId: string) => {
    deleteTransaction({
      variables: {
        id: deleteCategoryId,
      },
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium flex flex-row items-center gap-3">
        <div className={`${bgClass} p-3 rounded-md`}>
          <Icon className={textClass} size={16} />
        </div>
        {transaction.description}
      </TableCell>
      <TableCell className="text-center text-zinc-500">
        {formatDateSimple(transaction.date)}
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={badgeVariant as any}>
          {transaction.category.title}
        </Badge>
      </TableCell>
      <TableCell className="h-full">
        {transaction.type === "income" ? (
          <div className="flex flex-row items-center gap-2 justify-center text-primary">
            <CircleArrowUp size={14} /> Entrada
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2 justify-center text-red-600">
            <CircleArrowDown size={14} /> Saída
          </div>
        )}
      </TableCell>
      <TableCell className="text-end font-bold">
        {transaction.type === "income" ? "+" : "-"} R${" "}
        {transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell className="text-end">
        <div className="flex flex-row gap-2 items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteTransaction(transaction.id)}
          >
            <Trash color="red" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog(true)}
          >
            <SquarePen />
          </Button>
        </div>
      </TableCell>
      <UpdateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetchTransactions()}
        categories={categories?.listCategories || []}
        transactionData={transaction}
      />
    </TableRow>
  );
}
