import { Link } from "react-router";

import logo from "@/assets/kudos-logo.svg";
import { Container } from "@/components/ui";

import HeaderActions from "../header-actions";

export default function HeaderMain() {
  return (
    <Container className="max-w-none">
      <div className="flex h-12 items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Kudos inicio" width="128" height="32" />
        </Link>
        <HeaderActions />
      </div>
    </Container>
  );
}
