import { Box, Modal } from '@mui/material';
import React from 'react'

const RemarkDialog = ({
    open1,
    onClose1,
    remark1,
    onRemarkChange1,
    onSave1
}) => {
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 1,
        outline: 'none',
    };
    return (
        <>
        <Modal
            className='elev_modal'
            open={open1}
            onClose={onClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style2}>
                <div className="elv_product-remark">
                    <span className='elv_product-title-span'>Add The Order Remark..</span>
                    <textarea
                        className="elv_product-remarkTextArea"
                        rows="6"
                        style={{ borderRadius: '10px', marginBlock: '0.5rem', border: '', outline: 'none' }}
                        defaultValue={remark1}
                        value={remark1}
                        onChange={onRemarkChange1}
                    ></textarea>
                </div>
                <div className="elv_projectRemarkBtn-group">
                    <button className="elv_remarksave-btn" onClick={onSave1}>
                        Save
                    </button>
                    <button className="elv_remarkcancel-btn" onClick={onClose1}>
                        Cancel
                    </button>
                </div>
            </Box>
        </Modal>
        </>
    )
}

export default RemarkDialog