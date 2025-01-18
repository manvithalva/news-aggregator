import { slide as Menu } from "react-burger-menu";
import "./header.css";
import { ArticleFilters } from "../Filters";

export function Header() {
  return (
    <header className="h-[75px] flex p-4 items-center bg-white">
      <Menu>
        <ArticleFilters />
      </Menu>
      <div className="mobile:ml-2 ml-8">
        <h1 className="text-2xl font-bold">News Aggregator</h1>
      </div>
    </header>
  );
}

export default Header;
