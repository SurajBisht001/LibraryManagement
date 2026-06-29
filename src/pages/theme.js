import { createTheme, alpha } from "@mui/material/styles";

const getDesignTokens = (mode) => {
  const isLight = mode === "light";

  return {
    palette: {
      mode,
      primary: {
        main: isLight ? "#4338CA" : "#818CF8",
        light: isLight ? "#6366F1" : "#A5B4FC",
        dark: isLight ? "#3730A3" : "#6366F1",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: isLight ? "#0D9488" : "#2DD4BF",
        contrastText: "#FFFFFF",
      },
      success: {
        main: isLight ? "#059669" : "#34D399",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: isLight ? "#D97706" : "#FBBF24",
        contrastText: isLight ? "#FFFFFF" : "#0F172A",
      },
      error: {
        main: isLight ? "#DC2626" : "#F87171",
        contrastText: "#FFFFFF",
      },
      background: {
        default: isLight ? "#F1F5F9" : "#0F172A",
        paper: isLight ? "#FFFFFF" : "#1E293B",
      },
      text: {
        primary: isLight ? "#0F172A" : "#F1F5F9",
        secondary: isLight ? "#64748B" : "#94A3B8",
      },
      divider: isLight ? "#E2E8F0" : "#334155",
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: "none" },
    },
    shape: {
      borderRadius: 10,
    },
  };
};

const getTheme = (mode) => {
  const tokens = getDesignTokens(mode);
  const isLight = mode === "light";

  return createTheme({
    ...tokens,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            colorScheme: mode,
          },
          body: {
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isLight
              ? "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)"
              : "0 1px 3px rgba(0, 0, 0, 0.35)",
            border: `1px solid ${tokens.palette.divider}`,
            backgroundImage: "none",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 24,
            "&:last-child": {
              paddingBottom: 24,
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          colorInherit: {
            backgroundColor: tokens.palette.background.paper,
            color: tokens.palette.text.primary,
            borderBottom: `1px solid ${tokens.palette.divider}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: tokens.palette.background.paper,
            borderRight: `1px solid ${tokens.palette.divider}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: isLight
                ? `0 4px 12px ${alpha(tokens.palette.primary.main, 0.25)}`
                : "none",
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            margin: "4px 12px",
            padding: "10px 16px",
            "&:hover": {
              backgroundColor: alpha(tokens.palette.primary.main, 0.08),
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            border: `1px solid ${tokens.palette.divider}`,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: "20px 24px 8px",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "16px 24px",
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "16px 24px",
            gap: 12,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: `1px solid ${tokens.palette.divider}`,
            borderRadius: 12,
            backgroundColor: tokens.palette.background.paper,
            color: tokens.palette.text.primary,
            "--DataGrid-containerBackground": tokens.palette.background.paper,
            "--DataGrid-rowHeight": "52px",
          },
          columnHeaders: {
            backgroundColor: isLight ? "#F8FAFC" : "#172033",
            borderBottom: `1px solid ${tokens.palette.divider}`,
            minHeight: "52px !important",
            maxHeight: "52px !important",
          },
          columnHeader: {
            padding: "0 16px",
          },
          cell: {
            borderColor: tokens.palette.divider,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
          },
          row: {
            minHeight: "52px !important",
            maxHeight: "52px !important",
          },
          footerContainer: {
            borderTop: `1px solid ${tokens.palette.divider}`,
            minHeight: "52px",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            marginTop: 4,
            marginBottom: 4,
          },
          primary: {
            marginBottom: 4,
          },
          secondary: {
            marginTop: 4,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          gutterBottom: {
            marginBottom: 12,
          },
        },
      },
    },
  });
};

export default getTheme;
