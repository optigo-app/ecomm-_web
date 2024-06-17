// import React from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// const SelectedItemsModal = ({ open, onClose, selectedItems }) => {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ width: 1200, margin: 'auto', mt: 5, padding: 2, backgroundColor: 'white' }}>
//         <Typography variant="h6" component="h2">
//           Selected Items
//         </Typography>

//         {selectedItems.map(item => (
//           <Box key={item.id} sx={{ mt: 2 }}>
//             <Typography variant="h6">
//               {item.TitleLine}
//             </Typography>
//             <Typography variant="body2">
//               Price: ${item.ProductPrice}
//             </Typography>
//             <Typography variant="body2">
//               Quantity: {item.TotalQuantity}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Modal>
//   );
// };

// export default SelectedItemsModal;




import React from 'react';
import Modal from '@mui/material/Modal';
import { IconButton, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Divider, CardMedia, CardActionArea, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './cartPage.scss';

const DummyData = [
  { id: 1, title: 'Product 1', description: 'Description of Product 1' },
  { id: 2, title: 'Product 2', description: 'Description of Product 2' },
  { id: 3, title: 'Product 2', description: 'Description of Product 2' },
  { id: 4, title: 'Product 2', description: 'Description of Product 2' },
  { id: 5, title: 'Product 2', description: 'Description of Product 2' },
];
const demoFilters = {
  collections: ["Collection 1", "Collection 2", "Collection 3"],
  categories: ["Category 1", "Category 2", "Category 3"],
  subcategories: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
  genders: ["Male", "Female", "Other"]
};

const FilterAccordion = ({ title, items }) => {
  return (
    <Accordion className='smr_cart-Accordion' style={{ boxShadow: 'none', border: 'none' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0' }}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '0' }}>
        <Typography>{items.join(', ')}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const generateFilterAccordions = (filters) => {
  return Object.entries(filters).map(([category, items]) => (
    <FilterAccordion key={category} title={category} items={items} />
  ));
};


const MyModal = ({ open, onClose, selectedItems }) => {
  return (
    <Modal
      className="smr_modal"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"

    >
      <div className="smr_paper">
        <div className='smr_Modal_Title'>
          <Typography variant="h5" id="modal-title" gutterBottom>
            Modal Title
          </Typography>
          <IconButton className="smr_closeIcon" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div className='smr_cartmodal_body'>
          <div>
            <div className="smr_ShortCutCombo-section">
              <div>
                <FormControl className="form-control">
                  <InputLabel id="demo-simple-select-label">Diamond</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Diamond"
                  >
                    <MenuItem value="">Diamond</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                    <MenuItem value="3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl className="form-control">
                  <InputLabel>Metal</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Metal</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                    <MenuItem value="3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl className="form-control">
                  <InputLabel>Colorstone</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Colorstone</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                    <MenuItem value="3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl className="form-control">
                  <InputLabel>Borderless</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Borderless</MenuItem>
                    <MenuItem value="1">Option 1</MenuItem>
                    <MenuItem value="2">Option 2</MenuItem>
                    <MenuItem value="3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className='smr_cartModal-Divider'>
            <Divider />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              {generateFilterAccordions(demoFilters)}
            </Grid>
            <Grid item xs={6} md={9}>
              <div className='smr_Modal-cardList'>
                <Grid container spacing={2}>
                  {selectedItems.map(product => (
                    <Grid item key={product.id} xs={12} sm={4} md={4}>
                      <Card className='smr_cartListCard' sx={{ maxWidth: 250, position: 'relative' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={"https://cdnfs.optigoapps.com/content-global3/astoreCNARMLXHPFKS6TIY1/Design_Image/boKJ1XRq3zMDAwMzg4Mw==/Red_Thumb/0003883_08052024153602887.png"}
                            alt={product?.TitleLine}
                            className='smr_cartListImage'
                          />
                          <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                <Typography variant="body2" color="text.secondary">
                                  NWT: {product?.netwt}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  DWT: {product?.dwt}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="body2" color="text.secondary">
                                  CWT: {product?.cwt}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  GWT: {product?.gwt}
                                </Typography>
                              </div>
                            </div>
                            <div className='designNocartList'>
                              <p>{product?.designno}</p>
                            </div>
                            <div className='closeCartIconDiv'>
                              <CloseIcon className='closeCartIcon' />
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
