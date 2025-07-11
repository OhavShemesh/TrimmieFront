import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create the context
const SnackContext = createContext();

// Define custom colors per severity level
const severityColors = {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
};

// Provider component
export function SnackProvider({ children }) {
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    // Function to show the snack
    const showSnack = useCallback((message, severity = "info") => {
        setSnack({ open: true, message, severity });
    }, []);

    // Close handler
    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnack((prev) => ({ ...prev, open: false }));
    };

    return (
        <SnackContext.Provider value={{ showSnack }}>
            {children}
            <Snackbar
                open={snack.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snack.severity}
                    sx={{
                        width: "100%",
                        backgroundColor: severityColors[snack.severity],
                        color: "#fff",
                    }}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </SnackContext.Provider>
    );
}

// Custom hook to use snack
export function useSnack() {
    const context = useContext(SnackContext);
    if (!context) {
        throw new Error("useSnack must be used within a SnackProvider");
    }
    return context.showSnack;
}
