/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleArrowUp } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  getCategoryStyle,
  type CategoryColor,
} from "../../../utils/category-styles-mapping";
import { formatDateSimple } from "../../../utils/formatDate";

interface DashRecentTransactionProps {
  description: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: {
    title: string;
    color: CategoryColor;
    icon: string;
  };
}

export function DashRecentTransaction({
  description,
  date,
  amount,
  type,
  category,
}: DashRecentTransactionProps) {
  const { badgeVariant, bgClass, Icon, textClass } = getCategoryStyle(
    category.color,
    category.icon,
  );

  return (
    <div className="w-full">
      <div className="w-[100%] px-6 flex flex-row items-center h-16">
        <div className="w-[100%] flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4">
            <div className={`${bgClass} p-2 rounded-md`}>
              <Icon className={textClass} />
            </div>

            <div className="flex flex-col">
              <Label className="text-md">{description}</Label>
              <p className="text-xs font-normal text-zinc-500">
                {formatDateSimple(date)}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="w-[200px] flex items-center justify-center">
              <Badge variant={badgeVariant as any} className="mr-12">
                {category.title}
              </Badge>
            </div>

            <Label className="w-[120px]">
              {type === "income" ? "+" : "-"} R$ {amount.toFixed(2)}
            </Label>

            <CircleArrowUp className="text-primary" size={14} />
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
}
