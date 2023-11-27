import { Alert, Snackbar } from "@mui/material";
import { useState } from "react"

export function useAlert(alertText = "error: forgot alert text", autoCloseTimeout = 3000, alertType = "success") {

    const [showAlert, setShowAlert] = useState(false);
    
    const setAlertOn = () => {
        setShowAlert(true);
    }

    const alert = 
        <Snackbar 
            open={showAlert}
            autoHideDuration={autoCloseTimeout} 
            onClose={() => setShowAlert(false)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert severity={alertType}>{alertText}</Alert>
        </Snackbar>

    return [setAlertOn, alert]
}