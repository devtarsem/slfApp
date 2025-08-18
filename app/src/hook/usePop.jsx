import { useState } from "react";
import Swal from 'sweetalert2'

// custom hook
export function usePop() {
    const Pop = (title, description) => {
        Swal.fire({
            title: title,
            text: description,
            icon: 'error',
            confirmButtonText: "Close",
        });
    };
    return {Pop}
}