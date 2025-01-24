import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Switch, SwitchProps } from "@mui/material";

const AccentSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#1A1A1A",
    "&:hover": {
      backgroundColor: alpha("#1A1A1A", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#1A1A1A",
  },
}));

interface InputSwitchProps extends SwitchProps {
  description?: string;
  label: string;
}

const InputSwitch = ({ label, description, ...props }: InputSwitchProps) => {
  return (
    <div className="w-full p-4 rounded-lg border mt-2 flex justify-between items-center gap-x-4">
      <div>
        <h5 className="text-dashboard-dark font-semibold text-sm">{label}</h5>
        {description && <p className="text-sm text-gray-700">{description}</p>}
      </div>
      <AccentSwitch {...props} />
    </div>
  );
};

export default InputSwitch;
