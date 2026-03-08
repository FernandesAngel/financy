/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { CategorySummaryItem } from "../../../types";
import { getCategoryStyle } from "../../../utils/category-styles-mapping";
import { SquarePen, Trash } from "lucide-react";
import { UpdateCategoryDialog } from "./UpdateCategoryDialog";
import { useState } from "react";

type CategoryCardProps = {
  categorySummary: CategorySummaryItem;
  onDelete: (categoryId: string) => void;
  refetch: () => void;
};

export function CatCard({
  categorySummary,
  onDelete,
  refetch,
}: CategoryCardProps) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { badgeVariant, bgClass, Icon, textClass } = getCategoryStyle(
    categorySummary.category.color,
    categorySummary.category.icon,
  );
  return (
    <Card className="w-[24%]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div
          className={`w-[40px] h-[40px] ${bgClass} flex items-center justify-center rounded-sm`}
        >
          <Icon className={textClass} />
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(categorySummary.category.id)}
            >
              <Trash color="red" />
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenUpdateDialog(true)}
            >
              <SquarePen />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg ">
          {categorySummary.category.title}
        </CardTitle>
        <p className="text-zinc-500">{categorySummary.category.description}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between items-center">
        <div className="">
          <Badge variant={badgeVariant as any} className="mr-12">
            {categorySummary.category.title}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-zinc-500">
            {categorySummary.totalTransactions} itens
          </p>
        </div>
      </CardFooter>
      <UpdateCategoryDialog
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        onCreated={() => refetch()}
        category={categorySummary.category}
      />
    </Card>
  );
}
