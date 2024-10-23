import React from 'react'
import { Toast } from 'react-bootstrap';

export const MyToast = (props) => {
    const toastCss = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zindex: '1',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0,19)'
    };
    return (
        <div style={props.children.show ? toastCss : null} >
            <Toast
                className={`border text-white ${props.children.type === "success" ? "border-success bg-success" : "border-danger bg-danger"} `}
                show={props.children.show} delay={3000} autohide onClose={() => props.handleClose()}>
                <Toast.Header className={` text-white ${props.children.type === "success" ? "bg-success" : "bg-danger"}`} closeButton={false} >
                    <strong className='mr-auto'>Success</strong>
                </Toast.Header>
                <Toast.Body>{props.children.message}</Toast.Body>
            </Toast>
        </div>
    )
}
