export const getActiveKey = (pathname: any, items: any) => {
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        if (pathname === child.href) {
          return child.key;
        }
      }
    }
  }
  return '';
};