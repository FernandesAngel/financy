import { useMutation, useQuery } from "@apollo/client/react";
import { Page } from "../../components/Page";
import type { CategorySummaryResponse } from "../../types";
import { ArrowUpDown, Tag, Utensils } from "lucide-react";
import { SUMMARY_TRANSACTIONS_BY_CATEGORY } from "../../lib/graphql/queries/DashSummaries";
import { CatCountCards } from "./components/CatCountCards";
import { CatCard } from "./components/CatCard";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { useState } from "react";
import { DELETE_CATEGORY } from "../../lib/graphql/mutations/Category";

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    data: categorySummaryData,
    loading: categorySummaryLoading,
    refetch: refetchCategorySummary,
  } = useQuery<CategorySummaryResponse>(SUMMARY_TRANSACTIONS_BY_CATEGORY);

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria deletada com sucesso");
      refetchCategorySummary();
    },
    onError() {
      toast.error("Falha ao deletar a categoria");
    },
  });

  const handleDeleteCategory = (deleteCategoryId: string) => {
    deleteCategory({
      variables: {
        id: deleteCategoryId,
      },
    });
  };

  const categoriesSummary = categorySummaryData?.categorySummary;

  return (
    <Page>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Categorias</h1>
            <p className="text-muted-foreground mb-4">
              Organize suas transações por categorias
            </p>
          </div>
          <div>
            <Button onClick={() => setOpenDialog(true)}>
              + Nova Categoria
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <CatCountCards
            icon={<Tag />}
            title="TOTAL DE CATEGORIAS"
            value={String(categoriesSummary?.totalCategories ?? 0)}
          />
          <CatCountCards
            icon={<ArrowUpDown className="text-purple-700" />}
            title="TOTAL DE TRANSAÇÕES"
            value={String(categoriesSummary?.totalTransactions ?? 0)}
          />
          <CatCountCards
            icon={<Utensils className="text-blue-600" />}
            title="CATEGORIA MAIS UTILIZADA"
            value={String(categoriesSummary?.mostUsedCategoryTitle ?? 0)}
          />
        </div>
        <div className="w-full flex flex-row flex-wrap gap-5 items-center">
          {!categorySummaryLoading &&
            categoriesSummary?.categories.map((cat) => {
              return (
                <CatCard
                  key={cat.category.id}
                  categorySummary={cat}
                  onDelete={handleDeleteCategory}
                  refetch={refetchCategorySummary}
                />
              );
            })}
        </div>
      </div>
      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetchCategorySummary()}
      />
    </Page>
  );
}
