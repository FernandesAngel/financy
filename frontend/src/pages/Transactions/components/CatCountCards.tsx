import { Card, CardDescription, CardTitle } from "../../../components/ui/card";

interface CatCountCardsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export function CatCountCards({ title, value, icon }: CatCountCardsProps) {
  return (
    <Card className="w-[33%] p-4 flex flex-row items-start gap-4">
      <div className="mt-1.5">{icon}</div>
      <div>
        <CardTitle className="text-3xl font-bold mb-2 flex flex-row items-center gap-2">
          {value}
        </CardTitle>
        <CardDescription className="text-xs font-thin text-zinc-800">
          {title}
        </CardDescription>
      </div>
    </Card>
  );
}
