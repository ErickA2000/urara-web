import Swal from "sweetalert2";

const messageSuccess = ( title: string, body: string ) => {
    Swal.fire(
        title,
        body,
        'success'
    );
}

const messageError = ( title: string ) => {
    Swal.fire(
        {
            title,
            icon: "error",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }
    )
}

export default { messageSuccess, messageError };