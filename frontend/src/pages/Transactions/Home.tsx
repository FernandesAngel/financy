import { Page } from "../../components/Page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Wallet,
  CircleArrowUp,
  CircleArrowDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { LIST_RECENT_TRANSACTIONS } from "../../lib/graphql/queries/Transactions";
import { DashCountCards } from "./components/DashCountCards";
import { DashRecentTransaction } from "./components/DashRecentTransaction";
import { DashCategoriesSummaryItem } from "./components/DashCategoriesSummaryItem";
import {
  SUMMARY_TRANSACTIONS_AMOUNTS,
  SUMMARY_TRANSACTIONS_BY_CATEGORY,
} from "../../lib/graphql/queries/DashSummaries";
import type {
  CategoryResponse,
  CategorySummaryResponse,
  FinancialSummaryResponse,
  ListTransactionsResponse,
} from "../../types";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { useState } from "react";
import { GET_CATEGORIES } from "../../lib/graphql/queries/Categories";

export function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, loading, refetch } = useQuery<ListTransactionsResponse>(
    LIST_RECENT_TRANSACTIONS,
    {
      variables: {
        limit: 5,
        sort: "DESC",
      },
    },
  );

  const { data: categoriesData } = useQuery<CategoryResponse>(GET_CATEGORIES);

  const recentTransactions = data?.listTransactions.items ?? [];

  const { data: categorySummaryData, loading: categorySummaryLoading } =
    useQuery<CategorySummaryResponse>(SUMMARY_TRANSACTIONS_BY_CATEGORY);

  const categoriesSummary = categorySummaryData?.categorySummary;

  const { data: financialSummaryData } = useQuery<FinancialSummaryResponse>(
    SUMMARY_TRANSACTIONS_AMOUNTS,
  );

  const financialSummary = financialSummaryData?.financialSummary;

  return (
    <Page>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-row items-center justify-center gap-4">
          <DashCountCards
            icon={<Wallet className="inline text-purple-700" size={16} />}
            title="SALDO TOTAL"
            value={`R$ ${financialSummary?.totalAmount?.toFixed(2) || 0}`}
          />

          <DashCountCards
            icon={<CircleArrowUp className="inline text-primary" size={16} />}
            title="RECEITAS DO MÊS"
            value={`R$ ${financialSummary?.totalIncome.toFixed(2) || 0}`}
          />

          <DashCountCards
            icon={<CircleArrowDown className="inline text-red-600" size={16} />}
            title="DESPESAS DO MÊS"
            value={`R$ ${financialSummary?.totalExpense.toFixed(2) || 0}`}
          />
        </div>
        <div className="w-full flex flex-row items-start justify-center gap-4">
          <Card className="w-[67%]">
            <CardHeader className="py-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-thin">
                TRANSAÇÕES RECENTES
              </CardTitle>
              <Button className="w-fit" variant="ghostAccent" size="sm">
                <Link
                  className="flex flex-row align-center gap-2"
                  to="/transactions"
                >
                  Ver todas
                  <ChevronRight />
                </Link>
              </Button>
            </CardHeader>

            <Separator />
            <CardContent className="py-4 px-0 w-full">
              {!loading &&
                recentTransactions.map((transaction) => (
                  <DashRecentTransaction
                    key={transaction.id}
                    description={transaction.description}
                    date={transaction.date}
                    amount={transaction.amount}
                    type={transaction.type}
                    category={transaction.category}
                  />
                ))}
            </CardContent>
            <CardFooter className="w-full flex flex-row items-center justify-center">
              <Button
                className="w-fit"
                variant="ghostAccent"
                size="default"
                onClick={() => setOpenDialog(true)}
              >
                <Plus size={20} />
                Nova Transação
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-[33%]">
            <CardHeader className="py-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-thin">CATEGORIAS</CardTitle>
              <Button className="w-fit" variant="ghostAccent" size="sm">
                <Link
                  className="flex flex-row align-center gap-2"
                  to="/categories"
                >
                  Gerenciar
                  <ChevronRight />
                </Link>
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 px-6 flex flex-col gap-4">
              {!categorySummaryLoading &&
                categoriesSummary?.categories.map((categorySummary) => (
                  <DashCategoriesSummaryItem
                    key={categorySummary.category.id}
                    fullAmount={categorySummary.totalAmount}
                    itensCount={categorySummary.totalTransactions}
                    category={{
                      name: categorySummary.category.title,
                      color: categorySummary.category.color,
                      icon: categorySummary.category.icon,
                    }}
                  />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
        categories={categoriesData?.listCategories || []}
      />
    </Page>
  );
}
