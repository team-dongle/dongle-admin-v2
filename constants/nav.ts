interface NavItem {
  id: number;
  name: string;
  href: string;
}

export const adminNavList: NavItem[] = [
  { id: 1, name: "대시보드", href: "/" },
  { id: 2, name: "동아리 관리", href: "/clubs" },
  { id: 3, name: "회원 관리", href: "/users" },
  { id: 4, name: "공지사항 관리", href: "/notices" },
  { id: 5, name: "배너 관리", href: "/banners" },
];

export const clubNavList: NavItem[] = [
  { id: 1, name: "대시보드", href: "/" },
  { id: 2, name: "동아리 관리", href: "/clubs" },
  { id: 3, name: "활동보고서 관리", href: "/reports" },
];
