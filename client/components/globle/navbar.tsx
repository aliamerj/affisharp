import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Image from "next/image";
import { UserAvatar } from "../custom/avatar";

export const Navbar = async () => {
  return (
    <header className="sticky top-0 flex h-24 items-center justify-between md:gap-4 border-b bg-background px-4 md:px-6 shadow-md">
      <div className="flex flex-row-reverse items-center md:flex-row md:flex-1 md:justify-evenly gap-5">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            width={250}
            height={50}
            alt="AffiSharp"
          />
        </Link>

        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-lg lg:gap-6 pt-4">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  width={250}
                  height={50}
                  alt="AffiSharp"
                />
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="pt-4 px-5">
        <UserAvatar />
      </div>
    </header>
  );
};
