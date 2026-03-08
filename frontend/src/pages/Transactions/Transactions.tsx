import { useQuery } from "@apollo/client/react";
import { Page } from "../../components/Page";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useState } from "react";
import { LIST_ALL_TRANSACTIONS } from "../../lib/graphql/queries/Transactions";
import type {
  Category,
  CategoryResponse,
  ListTransactionsResponse,
} from "../../types";
import { TransactionRow } from "./components/TransactionRow";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GET_CATEGORIES } from "../../lib/graphql/queries/Categories";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";

const transactionsTypes = [
  {
    value: "income",
    label: "Entrada",
  },
  {
    value: "expense",
    label: "Saída",
  },
];

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const currentYear = new Date().getFullYear();

export function Transactions() {
  const [type, setType] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [month, setMonth] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data: transactionsData, refetch: refetchTransactions } =
    useQuery<ListTransactionsResponse>(LIST_ALL_TRANSACTIONS, {
      variables: {
        limit,
        offset: (page - 1) * limit,
        description: search || undefined,
        type,
        categoryId,
        month,
        year,
      },
    });

  const { data: categoriesData } = useQuery<CategoryResponse>(GET_CATEGORIES);

  const transactions = transactionsData?.listTransactions.items;
  const categoriesFiltered = categoriesData?.listCategories || [];

  const total = transactionsData?.listTransactions.totalCount ?? 0;
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const totalPages = Math.ceil(total / limit);

  const monthsOptions = months.map((name, index) => ({
    label: `${name} / ${currentYear}`,
    value: index + 1,
  }));

  return (
    <Page>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="text-muted-foreground mb-4">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <div>
            <Button onClick={() => setOpenDialog(true)}>
              + Nova Transação
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <Card className="w-full pt-4">
            <CardContent className="w-full flex flex-row items-center justify-between gap-4">
              <div className="w-[25%]">
                <Label>Buscar</Label>
                <Input
                  className="h-9"
                  type="search"
                  placeholder="Buscar por descrição"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="w-[25%]">
                <Label>Tipo</Label>
                <Select
                  onValueChange={(value) => {
                    setPage(1);
                    setType(value === "all" ? undefined : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectItem value="all">Todos</SelectItem>

                      {transactionsTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[25%]">
                <Label>Categoria</Label>
                <Select
                  onValueChange={(value) => {
                    setPage(1);
                    setCategoryId(value === "all" ? undefined : value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectItem value="all">Todas</SelectItem>
                      {categoriesFiltered.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[25%]">
                <Label>Período</Label>
                <Select
                  onValueChange={(value) => {
                    setPage(1);

                    if (value === "all") {
                      setMonth(undefined);
                      setYear(undefined);
                      return;
                    }

                    const selectedMonth = Number(value);
                    setMonth(selectedMonth);
                    setYear(currentYear);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Período</SelectLabel>
                      <SelectItem value="all">Todos</SelectItem>

                      {monthsOptions.map((item) => (
                        <SelectItem key={item.value} value={String(item.value)}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-row flex-wrap gap-5 items-center">
          <Table className="bg-white rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Descrição</TableHead>
                <TableHead className="w-[12%] text-center">Data</TableHead>
                <TableHead className="w-[12%] text-center">Categoria</TableHead>
                <TableHead className="w-[12%] text-center">Tipo</TableHead>
                <TableHead className="w-[20%] text-end">Valor</TableHead>
                <TableHead className="w-[15%] text-end">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => {
                return (
                  <TransactionRow
                    transaction={transaction}
                    key={transaction.id}
                    refetchTransactions={refetchTransactions}
                    categories={categoriesData}
                  />
                );
              })}
            </TableBody>
            <TableFooter className="bg-white">
              <TableRow>
                <TableCell colSpan={3} className="font-normal text-zinc-500">
                  {start} - {end} | {total} resultados
                </TableCell>

                <TableCell colSpan={3} className="text-end">
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <ChevronLeft size={14} />
                    </Button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNumber = i + 1;

                      return (
                        <Button
                          key={pageNumber}
                          size="sm"
                          variant={page === pageNumber ? "default" : "outline"}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetchTransactions()}
        categories={categoriesData?.listCategories || []}
      />
    </Page>
  );
}
