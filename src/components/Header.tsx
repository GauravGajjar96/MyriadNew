import React, { useState } from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
}

function Header({
  title = "Headless by WP Engine",
  description,
}: Props): JSX.Element {
  const { menuItems } = client.useQuery();
  const links = menuItems({
    first:20,
    where: { location: MenuLocationEnum.PRIMARY },
  });

  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
  ) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
      const newItem = { ...item };
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
      childrenOf[id] = childrenOf[id] || [];
      newItem[childrenKey] = childrenOf[id];
      parentId
        ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
        : tree.push(newItem);
    });
    return tree;
  };
  const $hierarchicalList = flatListToHierarchical(links.nodes);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  return (
    <header>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles["title-wrap"]}>
            <p className={styles["site-title"]}>
              <Link href="/">
                <a>
                  <Image
                    src="https://myriadsolutionz.com/wp-content/uploads/2019/10/logo-1.svg"
                    alt="Landscape picture"
                    width={120}
                    height={38}
                  />
                </a>
              </Link>
            </p>
          </div>
          <div
            className={`${styles.menu} header-menu ${showMe ? "active" : ""}`}
          >
            <ul>
              {$hierarchicalList.map((link, index) => (
                <li key={`${link.label}$-menu`}>
                  <Link href={link.url ?? ""}>
                    <a
                      href={link.url}
                      className={`${link.cssClasses} ${
                        link.children.length ? "has-submenu" : ""
                      } ${link.url === router.pathname ? "active" : ""}`}
                    >
                      {link.label}
                      {link.children.length ? (
                        <span
                          aria-expanded={dropdown ? "true" : "false"}
                          onClick={() => setDropdown((prev) => !prev)}
                        ></span>
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                  {link &&
                    link.children &&
                    (link.children.length ? (
                      <ul
                        className={`sub-menu dropdown ${
                          dropdown ? "show" : ""
                        }`}
                      >
                        {link.children.map((link) => (
                          <li key={`${link.label}$-menu`}>
                            <Link href={link.url ?? ""}>
                              <a href={link.url}>{link.label}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
            onClick={toggle}
          >
            {" "}
            <span className="navbar-toggler-icon"></span>{" "}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
