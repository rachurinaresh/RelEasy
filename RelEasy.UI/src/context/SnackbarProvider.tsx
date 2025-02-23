import { SnackbarProvider, closeSnackbar } from "notistack";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";
import { ReactComponent as Close } from "../assets/svg/Close.svg";
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    border: "1px solid #13A39A",
    svg: {
      fill: "#13A39A !important",
    },
    div: {
      maxWidth: "300px",
    },
  },
  "&.notistack-MuiContent-error": {
    border: "1px solid #FF5F5F",
    svg: {
      fill: "#FF5F5F !important",
    },
  },
  "&.notistack-MuiContent-warning": {
    border: "1px solid #FFC456",
    svg: {
      fill: "#FFC456 !important",
    },
  },
}));
function SnackbarCloseButton({ snackbarKey }: any) {
  return (
    <div
      onClick={() => closeSnackbar(snackbarKey)}
      style={{ marginRight: "5px", cursor: "pointer" }}
    >
      <Close />
    </div>
  );
}

export default function SnackBarProvider(props: any) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      maxSnack={3}
      autoHideDuration={5000}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
      style={{
        fontSize: "1.4rem",
        backgroundColor: "white",
        color: "#4B4B4B",
      }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
    >
      {props?.children}
    </SnackbarProvider>
  );
}
