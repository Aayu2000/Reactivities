import { Button } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function NavbarLink({ children, to }: { children: ReactNode, to: string }) {
  return (
    <Button
      component={NavLink}
      to={to}
      sx={{
        fontSize: '1.1rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
        padding: '6px 16px',
        '&.active': {
          color: 'yellow',
        }
      }}
    >
      {children}
    </Button>
  );
}