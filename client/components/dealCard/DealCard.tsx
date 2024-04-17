import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { DealsQuerySchema } from "@/schemas/deal_schema";
import {
  CheckCircleIcon,
  HandshakeIcon,
  TrendingUpIcon,
  UsersIcon,
  ExternalLink,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CopyButton } from "../CopyButton/CopyButton";
import Link from "next/link";

export function DealCard({ deal }: { deal: z.infer<typeof DealsQuerySchema> }) {
  const link = `https://affisharp.com/${deal.CompanyID}/${deal.name.replace(/\s+/g, "-")}`;

  return (
    <Card className="w-full max-w-lg mx-auto bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white">
        <div className="flex justify-between">
          <CardTitle className="text-3xl">{deal.name}</CardTitle>
          <Link href={`/${deal.CompanyID}/${deal.name}`} target="_blank">
            <ExternalLink className="text-4xl" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center space-y-3">
        <Avatar className="mb-4">
          <AvatarImage src={deal.logo ?? ""} alt={deal.name} />
          <AvatarFallback>
            <HandshakeIcon className="text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center text-sm text-gray-600">
          Created: {new Date(deal.CreatedAt).toLocaleDateString()}{" "}
          {new Date(deal.CreatedAt).toLocaleTimeString()}
        </div>
        <div className="flex flex-col sm:flex-row justify-around w-full text-center gap-4 sm:text-left">
          <div className="flex items-center justify-center space-x-1 mb-2 sm:mb-0">
            <span>0 Subscribers</span>
            <UsersIcon className="text-gray-500" />
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2 sm:mb-0">
            <span>0 Traffic</span>
            <TrendingUpIcon className="text-gray-500" />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>0 Successes</span>
            <CheckCircleIcon className="text-gray-500" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between flex-col sm:flex-row">
        <div className="flex-1 mb-2 sm:mb-0 pr-2 w-full">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue={link}
            readOnly
            className="p-2 rounded border-gray-300 w-full"
          />
        </div>
        <CopyButton text={link} />
      </CardFooter>
    </Card>
  );
}
