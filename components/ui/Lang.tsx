"use client";

import React from "react";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@customHooks/useTheme";

//Interface stays here.
interface NavbarProps extends RefineThemedLayoutV2HeaderProps {
  children?: React.ReactNode;
  locale?: string;
}

const Lang: React.FC<NavbarProps> = ({ locale }) => {
  
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1] || locale || "en";

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value;
    if (newLocale === currentLocale) return;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <Select
      value={currentLocale}
      onChange={handleLanguageChange}
      sx={{
        borderRadius: 1,
        fontSize: "0.9rem",
        color: theme.palette.primary.contrastText,
        border: `1px solid ${theme.palette.third.main}`,
        ".MuiSelect-icon": {
          color: theme.palette.primary.contrastText,
          fontSize: "1rem",
        },
        "&:hover": {
          borderColor: theme.palette.secondary.light,
        },
      }}
    >
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="fi">FI</MenuItem>
    </Select>
  );
};

export default Lang;
