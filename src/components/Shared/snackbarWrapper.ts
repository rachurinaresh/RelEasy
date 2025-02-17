import { enqueueSnackbar } from "notistack";

export function snackbarWrapper(message: string, variant: any = "default") {
  message && enqueueSnackbar(message, { variant: variant });
}
