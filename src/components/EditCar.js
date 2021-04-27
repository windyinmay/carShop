import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'

export default function EditCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = useState( {
      brand: '', model: '', color: '', fuel:'', year:'', price:''
  })

  const handleClickOpen = () => {
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      year: props.car.year,
      price: props.car.price,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setCar({...car, [e.target.name]: e.target.value})
  }

  const addCar = () => {
      props.saveCar(car);
      handleClose();
  }

  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required= {true}
            margin="dense"
            name="brand"
            value={car.brand}
            onChange= {e => handleInputChange(e)}
            label="Brand"
            fullWidth
          />
          <TextField
            required= {true}
            margin="dense"
            name="model"
            value={car.model}
            onChange= {e => handleInputChange(e)}
            label="Model"
            fullWidth
          />
          <TextField
            required= {true}
            margin="dense"
            name="color"
            value={car.color}
            onChange= {e => handleInputChange(e)}
            label="Color"
            fullWidth
          />
          <TextField
            required= {true}
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange= {e => handleInputChange(e)}
            label="Fuel"
            fullWidth
          />
          <TextField
            required= {true}
            margin="dense"
            name="year"
            value={car.year}
            onChange= {e => handleInputChange(e)}
            label="Year"
            fullWidth
          />
          <TextField
            required= {true}
            margin="dense"
            name="price"
            value={car.price}
            onChange= {e => handleInputChange(e)}
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} color="default">
            <CancelIcon/>
          </IconButton>
          <IconButton onClick={addCar} color="primary">
            <AddIcon/>
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
