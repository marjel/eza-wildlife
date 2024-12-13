export interface MenuLink {
  label: string;
  value: string;
  submenu?: Array<MenuLink>;
}
