import { Card, CardDescription, CardTitle } from "../../../components/ui/card";

interface DashCountCardsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export function DashCountCards({ title, value, icon }: DashCountCardsProps) {
  return (
    <Card className="w-[33%] p-4 ">
      <CardTitle className="text-xs font-thin mb-4 flex flex-row items-center gap-2">
        {icon}
        {title}
      </CardTitle>
      <CardDescription className="text-2xl font-bold text-zinc-800">
        {value}
      </CardDescription>
    </Card>
  );
}
