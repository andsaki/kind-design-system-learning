import { css, cx } from "@/styled-system/css";

interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}

const navContainer = css({
  display: { base: "none", lg: "block" },
  position: "sticky",
  top: 4,
  p: 4,
  bg: "bg.primary",
  borderRadius: "lg",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "border.default",
  maxHeight: "calc(100vh - 32px)",
  overflowY: "auto",
});

const titleClass = css({
  m: 0,
  mb: 4,
  fontSize: "lg",
  fontWeight: "semibold",
  color: "contents.primary",
});

const listClass = css({
  listStyle: "none",
  m: 0,
  p: 0,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const linkBase = css({
  display: "block",
  px: 3,
  py: 2,
  fontSize: "sm",
  textDecoration: "none",
  borderRadius: "base",
  borderLeftWidth: "3px",
  borderLeftStyle: "solid",
  borderColor: "transparent",
  transition: "all 0.2s ease",
  cursor: "pointer",
});

const linkActive = css({
  color: "contents.link",
  bg: "bg.secondary",
  borderColor: "contents.link",
  fontWeight: "semibold",
});

const linkInactive = css({
  color: "contents.primary",
  borderColor: "contents.tertiary",
  _hover: { bg: "bg.hover" },
});

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onNavigate,
}) => {
  const handleNavigate = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.history.pushState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={navContainer} aria-label="目次">
      <h2 className={titleClass}>目次</h2>
      <ul className={listClass}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.id);
                }}
                className={cx(linkBase, isActive ? linkActive : linkInactive)}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
