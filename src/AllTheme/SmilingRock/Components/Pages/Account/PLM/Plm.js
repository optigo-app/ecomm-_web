import React, { useState } from "react";
import { TextField,  Grid } from "@mui/material";
import "./Plm.scss";
import Dropzone from "react-dropzone";



const Plm = () => {

  const [formData, setFormData] = useState({
    labelName: "",
    logo: null,
    markUp: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="plm_container">
      <div className="w-100 text-center plm_title" style={{cursor:'pointer'}}>
        Private Label Setup
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="center_plm margin_plm"> 
              <TextField
                id="labelName"
                name="labelName"
                label="Label Name"
                variant="outlined"
                value={formData.labelName}
                onChange={handleChange}
                style={{ minWidth: "400px", maxWidth: "400px" }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={8} className="center_plm margin_plm">
              <Dropzone
                id="logo"
                name="logo"
                acceptedFiles={['image/*']} // Limit to image files only
                dropzoneText="Drag and drop an image here or click"
                onChange={handleFileChange}
                filesLimit={1} // Limit to one file
                style={{ minWidth: "400px", maxWidth: "400px" }}
              />
              {/* <TextField
                type="file"
                id="logo"
                name="logo"
                label="Upload Logo"
                onChange={handleFileChange}
                required
                style={{ minWidth: "400px", maxWidth: "400px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              /> */}
            </Grid>
            <Grid item xs={12} className="center_plm margin_plm">
              <TextField
                type="number"
                id="markUp"
                name="markUp"
                label="Mark Up (%)"
                variant="outlined"
                value={formData.markUp}
                onChange={handleChange}
                required
                style={{ minWidth: "400px", maxWidth: "400px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <button  className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Save</button>
            </Grid>
          </Grid>
        </form>
      </div>

    </div>
  );
};

export default Plm;

// import React, { useState } from 'react';
// import './Plm.scss';

// const Plm = () => {
//   const [formData, setFormData] = useState({
//     labelName: '',
//     logo: null,
//     markUp: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       logo: e.target.files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // You can handle form submission here, e.g., send data to the server
//   };

//   return (
//     <div className="plm-container">
//       <h2>Private Label Setup</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="labelName">Label Name</label>
//           <input
//             type="text"
//             id="labelName"
//             name="labelName"
//             value={formData.labelName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="logo">Upload Logo</label>
//           <input
//             type="file"
//             id="logo"
//             name="logo"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="markUp">Mark Up (%)</label>
//           <input
//             type="number"
//             id="markUp"
//             name="markUp"
//             value={formData.markUp}
//             onChange={handleChange}
//             required
//             min="0"
//             max="100"
//           />
//         </div>
//         <button type="submit" className="btn-submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Plm;
