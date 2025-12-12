import clsx from "clsx";
import { Menu } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { navbarIcons } from "./constants";
import { MenuTabs } from "@/enums/tabTypes";
import Icon from "@/shared/components/Icon";

import styles from "./navbar.module.scss";

const { DASHBOARD } = MenuTabs;

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState<MenuTabs>(DASHBOARD);
  const [selectedKey, setSelectedKey] = useState<string>(DASHBOARD);

  const handleMenuClick = ({ key }: { key: string }) => {
    const parentMenu = navbarIcons.find((icon) => icon?.name === key);
    
    if (parentMenu?.children && parentMenu.children.length > 0) {
      navigate(parentMenu.children[0].path);
      setSelectedKey(parentMenu.children[0].name);
      return;
    }

    const foundChild = navbarIcons
      .flatMap((icon) => icon.children || [])
      .find((child) => child.name === key);

    if (foundChild) {
      navigate(foundChild.path);
      setSelectedKey(key);
      return;
    }

    const selectedIconPath = parentMenu?.path;
    if (selectedIconPath) {
      navigate(selectedIconPath);
      setSelectedKey(key);
    }
  };

  useEffect(() => {
    let matchedChild = null;
    let matchedParent = null;

    for (const icon of navbarIcons) {
      if (icon.children) {
        const child = icon.children.find((child) => pathname.includes(child.path));
        if (child) {
          matchedParent = icon;
          matchedChild = child;
          break;
        }
      } else if (pathname.includes(icon.path)) {
        matchedParent = icon;
        break;
      }
    }

    if (matchedParent) {
      setActiveMenu(matchedParent.name as MenuTabs);
      setOpenKeys(matchedParent.children ? [matchedParent.name] : []);
      
      if (matchedChild) {
        setSelectedKey(matchedChild.name);
      } else if (matchedParent.children && matchedParent.children.length > 0) {
        setSelectedKey(matchedParent.children[0].name);
      } else {
        setSelectedKey(matchedParent.name);
      }
    } else {
      // If no route matches, navigate to Dashboard (default)
      const dashboardItem = navbarIcons.find((icon) => icon.name === DASHBOARD);
      if (dashboardItem) {
        navigate(dashboardItem.path);
      }
    }
  }, [pathname, navigate]);

  return (
    <div className={styles.navbarWrapper}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          defaultSelectedKeys={[]}
          selectedKeys={[selectedKey]}
          className={clsx(styles.navbarMenuSuperAdmin, styles.navbarMenu)}
          onOpenChange={setOpenKeys}
          onClick={handleMenuClick}>
          {navbarIcons.map((item, index) => {
            const isActiveMenu = item.name === activeMenu;
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              return (
                <Menu.SubMenu
                  key={item.name}
                  title={
                    <div className={clsx(styles.iconWrapper, isActiveMenu && styles.iconActive)}>
                      <Icon
                        fill
                        isSymbol
                        name={item.icon}
                        className={clsx(styles.icon, isActiveMenu && styles.iconActive)}
                      />
                      <span className={styles.iconName}>{item.name}</span>
                    </div>
                  }
                >
                  {hasChildren && item.children.map((child) => (
                    <Menu.Item key={child.name} className={styles.navbarMenuItem}>
                        <div className={clsx(styles.iconWrapper)}>
                          <span className={styles.iconName}>{child.label}</span>
                          </div>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
                )
            }


             return (
               <Fragment key={index}>
                <Menu.Item className={styles.navbarMenuItem} key={item.name}>
                  <div>
                    <div className={clsx(styles.iconWrapper, isActiveMenu && styles.iconActive)}>
                      <Icon
                        fill
                        isSymbol
                        name={item.icon}
                        className={clsx(styles.icon, isActiveMenu && styles.iconActive)}
                      />
                      <span className={styles.iconName}>{item.name}</span>
                      </div>
                  </div>
                </Menu.Item>
              </Fragment> 
            );
          })}
        </Menu>
    </div>
  );
};

export default Navbar;
