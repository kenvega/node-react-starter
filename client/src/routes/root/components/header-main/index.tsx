import { Link } from "react-router";

import logo from "@/assets/kudos-logo.svg";
import { Container, Separator } from "@/components/ui";

import HeaderActions from "../header-actions";
import MainNav from "../main-nav";

const navigation = [
  { to: "/", label: "User List" },
  { to: "about", label: "About" },
];

export default function HeaderMain() {
  return (
    <Container className="relative">
      <div className="flex h-12 items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Kudos inicio" width="128" height="32" />
        </Link>
        <HeaderActions />
      </div>
      <Separator className="block sm:hidden" />
      <MainNav items={navigation} />
    </Container>
  );
}
