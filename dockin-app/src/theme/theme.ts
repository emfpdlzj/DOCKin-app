export const theme = {
  colors: {
    primary: "#278BEA",
    primaryDark: "#1F6FC6",
    accent: "#FF9800",
    accentSoft: "#FFF1D9",
    success: "#19C15F",
    danger: "#FF4D4F",
    warning: "#F4B400",
    background: "#F3F6FA",
    card: "#FFFFFF",
    surface: "#EAF3FF",
    text: "#25282D",
    subText: "#6F7680",
    border: "#E2E8F0",
    muted: "#F3F4F6",
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
    pill: 999,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  shadow: {
    card: {
      shadowColor: "#2F5A88",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 3,
    },
  },
} as const;

