import { Box, Modal } from '@mui/material';
import React from 'react'

const ItemRemarkDialog = ({
    showRemark1,
    handleClose1,
    handleClose2,
    selectedItem,
    productRemark,
    open1,
    handleRemarkChange,
    handleSave,
    onRemarkChange,
    onSave,
    remark,
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
            open={showRemark1 || open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style2}>
                <div className="elv_product-remark">
                    <span className='elv_product-title-span'>Add The Item Remark..</span>
                    <textarea
                        className="elv_product-remarkTextArea"
                        rows="6"
                        style={{ borderRadius: '10px', marginBlock: '0.5rem', border: '', outline: 'none' }}
                        value={remark}
                        onChange={onRemarkChange}
                    ></textarea>
                </div>
                <div className="elv_projectRemarkBtn-group">
                    <button className="elv_remarksave-btn"  onClick={onSave}>
                        Save
                    </button>
                    <button className="elv_remarkcancel-btn" onClick={handleClose1 || handleClose2}>
                        Cancel
                    </button>
                </div>
            </Box>
        </Modal>
        </>
    )
}

export default ItemRemarkDialog