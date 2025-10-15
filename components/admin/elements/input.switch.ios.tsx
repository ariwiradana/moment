import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

// Custom iOS-style switch
const InputSwitchIOS = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#65C466" : "#4cd964", // warna hijau iOS
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
    width: 22,
    height: 22,
    borderRadius: 11,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    boxSizing: "border-box",
  },
}));

export default InputSwitchIOS;
