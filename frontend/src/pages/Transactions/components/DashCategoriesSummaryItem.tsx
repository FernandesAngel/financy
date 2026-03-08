/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import {
  getCategoryStyle,
  type CategoryColor,
} from "../../../utils/category-styles-mapping";

interface DashCategoriesSummaryItemProps {
  fullAmount: number;
  itensCount: number;
  category: {
    name: string;
    color: CategoryColor;
    icon: string;
  };
}

export function DashCategoriesSummaryItem({
  fullAmount,
  itensCount,
  category,
}: DashCategoriesSummaryItemProps) {
  const { badgeVariant } = getCategoryStyle(category.color, category.icon);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-[20%]">
        <Badge variant={badgeVariant as any} className="mb-2">
          {category.name}
        </Badge>
      </div>
      <div className="w-[60%] flex flex-row items-center justify-end gap-2">
        <div className="w-[70px] flex items-center justify-end ">
          <p className="text-sm font-normal text-zinc-500 text-center">
            {itensCount} itens
          </p>
        </div>
        <Label className="w-[110px] flex items-center justify-end">
          R$ {fullAmount.toFixed(2)}
        </Label>
      </div>
    </div>
  );
}
